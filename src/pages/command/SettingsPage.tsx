import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import {
  builderInputClass,
  builderLabelClass,
  builderSelectClass,
  builderTextareaClass,
} from '../../components/app/builder-styles'
import { useTradieSettings } from '../../hooks/useTradieSettings'
import type { ThemeMode } from '../../hooks/useTradieSettings'

export function SettingsPage() {
  const { settings, updateSetting, resetSettings } = useTradieSettings()

  return (
    <CommandCentreLayout
      title="Settings"
      subtitle="Your business details — saved locally on this device"
    >
      <form
        className="mx-auto max-w-2xl space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className="glass-card space-y-4 rounded-xl p-5">
          <legend className="text-sm font-semibold text-cyan-300">
            Business profile
          </legend>
          <Field
            label="Business name"
            value={settings.businessName}
            onChange={(v) => updateSetting('businessName', v)}
          />
          <Field
            label="Logo URL"
            value={settings.logoUrl}
            onChange={(v) => updateSetting('logoUrl', v)}
            placeholder="https://yoursite.com.au/logo.png"
          />
          {settings.logoUrl ? (
            <div className="flex items-center gap-4 rounded-xl border border-blue-500/20 bg-white/[0.02] p-3">
              <img
                src={settings.logoUrl}
                alt=""
                className="h-12 max-w-[160px] object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <p className="text-xs text-slate-500">
                Preview — used on quotes and invoices when configured.
              </p>
            </div>
          ) : null}
          <Field
            label="Website URL"
            value={settings.websiteUrl}
            onChange={(v) => updateSetting('websiteUrl', v)}
          />
          <Field
            label="Business email"
            value={settings.businessEmail}
            onChange={(v) => updateSetting('businessEmail', v)}
          />
          <Field
            label="Phone"
            value={settings.phone}
            onChange={(v) => updateSetting('phone', v)}
          />
        </fieldset>

        <fieldset className="glass-card space-y-4 rounded-xl p-5">
          <legend className="text-sm font-semibold text-cyan-300">
            Payments
          </legend>
          <Field
            label="PayID"
            value={settings.payId}
            onChange={(v) => updateSetting('payId', v)}
          />
          <div>
            <label className={builderLabelClass}>Bank details</label>
            <textarea
              className={builderTextareaClass}
              rows={2}
              value={settings.bankDetails}
              onChange={(e) => updateSetting('bankDetails', e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="glass-card space-y-4 rounded-xl p-5">
          <legend className="text-sm font-semibold text-cyan-300">
            Brand & display
          </legend>
          <Field
            label="Brand colour"
            type="color"
            value={settings.brandColour}
            onChange={(v) => updateSetting('brandColour', v)}
          />
          <div>
            <label className={builderLabelClass} htmlFor="theme-select">
              Theme
            </label>
            <select
              id="theme-select"
              className={builderSelectClass}
              value={settings.theme}
              onChange={(e) =>
                updateSetting('theme', e.target.value as ThemeMode)
              }
            >
              <option value="dark">Dark (default)</option>
              <option value="light">Light (preview)</option>
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Light mode is a preview — more polish coming later.
            </p>
          </div>
          <Field
            label="Calendly link (optional)"
            value={settings.calendlyUrl}
            onChange={(v) => updateSetting('calendlyUrl', v)}
          />
          <Field
            label="Google Calendar link (optional)"
            value={settings.googleCalendarUrl}
            onChange={(v) => updateSetting('googleCalendarUrl', v)}
          />
        </fieldset>

        <fieldset className="glass-card space-y-4 rounded-xl p-5">
          <legend className="text-sm font-semibold text-cyan-300">
            Defaults
          </legend>
          <div>
            <label className={builderLabelClass}>Default quote terms</label>
            <textarea
              className={builderTextareaClass}
              rows={3}
              value={settings.defaultQuoteTerms}
              onChange={(e) =>
                updateSetting('defaultQuoteTerms', e.target.value)
              }
            />
          </div>
          <div>
            <label className={builderLabelClass}>Default invoice notes</label>
            <textarea
              className={builderTextareaClass}
              rows={2}
              value={settings.defaultInvoiceNotes}
              onChange={(e) =>
                updateSetting('defaultInvoiceNotes', e.target.value)
              }
            />
          </div>
        </fieldset>

        <button
          type="button"
          onClick={resetSettings}
          className="min-h-[44px] text-sm text-slate-500 underline-offset-2 hover:text-cyan-300 hover:underline"
        >
          Reset to demo defaults
        </button>
      </form>
    </CommandCentreLayout>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className={builderLabelClass}>{label}</label>
      <input
        type={type}
        className={builderInputClass}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
