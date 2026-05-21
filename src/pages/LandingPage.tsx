import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Hero } from '../components/sections/Hero'
import { TrustStrip } from '../components/sections/TrustStrip'
import { HowItWorks } from '../components/sections/HowItWorks'
import { MicahScw } from '../components/sections/MicahScw'
import { SqbaBackend } from '../components/sections/SqbaBackend'
import { Pricing } from '../components/sections/Pricing'
import { PaymentInvoice } from '../components/sections/PaymentInvoice'
import { FinalCta } from '../components/sections/FinalCta'

export function LandingPage() {
  return (
    <div className="min-h-svh bg-white text-[#334155] antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <MicahScw />
        <SqbaBackend />
        <Pricing />
        <PaymentInvoice />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
