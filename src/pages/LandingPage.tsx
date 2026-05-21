import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Hero } from '../components/sections/Hero'
import { Benefits } from '../components/sections/Benefits'
import { Features } from '../components/sections/Features'
import { Industries } from '../components/sections/Industries'
import { CtaBanner } from '../components/sections/CtaBanner'
import { SectionDivider } from '../components/SectionDivider'

export function LandingPage() {
  return (
    <div className="min-h-svh bg-quoteos-page text-slate-300 antialiased">
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Benefits />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <Industries />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
