import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

try {
  const raw = localStorage.getItem('quoteos-tradie-settings')
  if (raw) {
    const parsed = JSON.parse(raw) as { theme?: string; brandColour?: string }
    document.documentElement.dataset.quoteosTheme = parsed.theme ?? 'dark'
    if (parsed.brandColour) {
      document.documentElement.style.setProperty(
        '--qos-brand',
        parsed.brandColour,
      )
    }
  } else {
    document.documentElement.dataset.quoteosTheme = 'dark'
  }
} catch {
  document.documentElement.dataset.quoteosTheme = 'dark'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
