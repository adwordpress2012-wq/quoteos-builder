"""One-off: transparent QOS logos + favicon sizes from supplied PNG artwork."""
from __future__ import annotations

import struct
import zlib
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = (
    Path.home()
    / ".cursor"
    / "projects"
    / "c-Users-JAYSON-DOS-PROJECTS-quoteos-builder"
    / "assets"
)
PUBLIC = ROOT / "public"

DOWNLOADS = Path.home() / "Downloads"
FULL_SRC = DOWNLOADS / "QOS OFFICIAL LOGO-FINAL.png"
ICON_SRC = DOWNLOADS / "QOS LOGO-FINAL.png"
if not FULL_SRC.exists():
    FULL_SRC = next(ASSETS.glob("*QOS_OFFICIAL*"), FULL_SRC)
if not ICON_SRC.exists():
    ICON_SRC = next(ASSETS.glob("*QOS_LOGO-FINAL*"), ICON_SRC)


def remove_black_bg(img: Image.Image, threshold: int = 28) -> Image.Image:
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r <= threshold and g <= threshold and b <= threshold:
                px[x, y] = (r, g, b, 0)
    return rgba


def trim_transparent(img: Image.Image, pad: int = 8) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(img.width, right + pad)
    bottom = min(img.height, bottom + pad)
    return img.crop((left, top, right, bottom))


def square_icon(img: Image.Image, size: int) -> Image.Image:
    """Center icon on transparent square canvas for favicons."""
    img = trim_transparent(img, pad=4)
    w, h = img.size
    side = max(w, h)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(img, ((side - w) // 2, (side - h) // 2), img)
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def write_ico(path: Path, sizes: list[int], source: Image.Image) -> None:
    """Minimal multi-size ICO writer (PNG-compressed entries)."""
    entries: list[tuple[int, bytes]] = []
    for size in sizes:
        icon = square_icon(source, size)
        from io import BytesIO

        buf = BytesIO()
        icon.save(buf, format="PNG")
        entries.append((size, buf.getvalue()))

    # ICO header + directory
    count = len(entries)
    header = struct.pack("<HHH", 0, 1, count)
    offset = 6 + 16 * count
    directory = bytearray()
    images_data = bytearray()
    for size, png_bytes in entries:
        directory.extend(
            struct.pack(
                "<BBBBHHII",
                size if size < 256 else 0,
                size if size < 256 else 0,
                0,
                0,
                1,
                32,
                len(png_bytes),
                offset,
            )
        )
        images_data.extend(png_bytes)
        offset += len(png_bytes)
    path.write_bytes(header + directory + images_data)


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    if not FULL_SRC.exists() or not ICON_SRC.exists():
        raise SystemExit(f"Missing source assets:\n  {FULL_SRC}\n  {ICON_SRC}")

    full = trim_transparent(remove_black_bg(Image.open(FULL_SRC)))
    icon = trim_transparent(remove_black_bg(Image.open(ICON_SRC)))

    web_full = full.copy()
    max_w = 560
    if web_full.width > max_w:
        ratio = max_w / web_full.width
        web_full = web_full.resize(
            (max_w, int(web_full.height * ratio)),
            Image.Resampling.LANCZOS,
        )
    web_full.save(PUBLIC / "qos-logo-full.png", optimize=True)
    web_icon = icon.copy()
    max_icon = 256
    if max(web_icon.width, web_icon.height) > max_icon:
        web_icon.thumbnail((max_icon, max_icon), Image.Resampling.LANCZOS)
    web_icon.save(PUBLIC / "qos-logo-icon.png", optimize=True)

    square_icon(icon, 32).save(PUBLIC / "favicon-32x32.png", optimize=True)
    square_icon(icon, 180).save(PUBLIC / "apple-touch-icon.png", optimize=True)
    square_icon(icon, 192).save(PUBLIC / "icon-192.png", optimize=True)
    square_icon(icon, 512).save(PUBLIC / "icon-512.png", optimize=True)
    write_ico(PUBLIC / "favicon.ico", [16, 32, 48], icon)

    # SVG favicon: embed trimmed icon as reference (browsers prefer PNG links in HTML)
    fav32 = square_icon(icon, 32)
    print("Wrote:", PUBLIC / "qos-logo-full.png", full.size)
    print("Wrote:", PUBLIC / "qos-logo-icon.png", icon.size)
    print("Favicon assets ready in", PUBLIC)


if __name__ == "__main__":
    main()
