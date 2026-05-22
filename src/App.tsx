import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { QuoteBuilderPage } from './pages/QuoteBuilderPage'
import { DashboardPage } from './pages/command/DashboardPage'
import { LeadsPage } from './pages/command/LeadsPage'
import { QuotesListPage } from './pages/command/QuotesListPage'
import { BookingsPage } from './pages/command/BookingsPage'
import { InvoicesPage } from './pages/command/InvoicesPage'
import { FollowUpsPage } from './pages/command/FollowUpsPage'
import { CustomersPage } from './pages/command/CustomersPage'
import { MicahPage } from './pages/command/MicahPage'
import { DosCalendarPage } from './pages/command/DosCalendarPage'
import { ToolsPage } from './pages/command/ToolsPage'
import { SettingsPage } from './pages/command/SettingsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/app/dashboard" element={<DashboardPage />} />
      <Route path="/app/leads" element={<LeadsPage />} />
      <Route path="/app/quotes" element={<QuotesListPage />} />
      <Route path="/app/builder" element={<QuoteBuilderPage />} />
      <Route path="/app/bookings" element={<BookingsPage />} />
      <Route path="/app/invoices" element={<InvoicesPage />} />
      <Route path="/app/follow-ups" element={<FollowUpsPage />} />
      <Route path="/app/customers" element={<CustomersPage />} />
      <Route path="/app/micah" element={<MicahPage />} />
      <Route path="/app/calendar" element={<DosCalendarPage />} />
      <Route path="/app/tools" element={<ToolsPage />} />
      <Route path="/app/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default App
