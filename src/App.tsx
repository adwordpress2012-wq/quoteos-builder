import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { AppDashboardPage } from './pages/AppDashboardPage'
import { QuoteBuilderPage } from './pages/QuoteBuilderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppDashboardPage />} />
      <Route path="/app/dashboard" element={<AppDashboardPage />} />
      <Route path="/app/builder" element={<QuoteBuilderPage />} />
    </Routes>
  )
}

export default App
