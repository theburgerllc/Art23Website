'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LoanAndConsignmentPage() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollY = window.scrollY + 100

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId || '')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky nav
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const offsetPosition = elementRect - bodyRect - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { id: 'insurance', label: 'Insurance & Valuation' },
    { id: 'delivery', label: 'Delivery, Care & Returns' },
    { id: 'sales', label: 'Sales' },
    { id: 'photography', label: 'Photography & Credits' },
    { id: 'start', label: 'Start a Loan/Consignment' },
  ]

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-g23-accent text-g23-black px-4 py-2 rounded-md font-medium z-50"
      >
        Skip to main content
      </a>

      <div id="main-content" className="min-h-screen">
        {/* Back to Visit link */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
          <Link 
            href="/visit" 
            className="inline-flex items-center text-sm text-g23-gray dark:text-gray-400 hover:text-g23-accent transition-colors [data-textmode='on']:underline"
          >
            ← Back to Visit
          </Link>
        </div>

        {/* Main container */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
          
          {/* H1 and Introduction */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 [data-textmode='on']:tracking-wider [data-textmode='on']:leading-relaxed">
            Loan & Consignment
          </h1>
          
          <p className="text-lg sm:text-xl text-g23-gray dark:text-gray-300 mb-12 sm:mb-16 [data-textmode='on']:leading-loose [data-textmode='on']:tracking-wide">
            We collaborate with artists, estates, and lenders to exhibit work. Below is a plain-language summary of our practices; final terms appear in the signed agreement.
          </p>

          {/* Sticky Navigation */}
          <nav className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12 mb-12 z-40 [data-textmode='on']:hidden">
            <ul className="flex flex-wrap gap-2 py-4 overflow-x-auto">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      activeSection === item.id
                        ? 'bg-g23-accent text-g23-black font-medium'
                        : 'text-g23-gray hover:bg-gray-100 dark:hover:bg-gray-900'
                    }`}
                    aria-current={activeSection === item.id ? 'true' : 'false'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Insurance & Valuation Section */}
          <section id="insurance" className="mb-12 sm:mb-16 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Insurance & Valuation
            </h2>
            
            <div className="space-y-4 text-base sm:text-lg text-g23-gray dark:text-gray-300">
              <p className="[data-textmode='on']:leading-loose">
                We insure loaned works on site and in transit via a major carrier or gallery staff during the loan period.
              </p>
              
              <p className="[data-textmode='on']:leading-loose">
                Insurance value is typically 70% of Fair Market Value (FMV). For emerging artists without sales history, we may request a reputable appraisal; otherwise liability may be limited to repair or material costs.
              </p>
              
              <p className="[data-textmode='on']:leading-loose">
                <strong className="font-semibold">Outdoor installations:</strong> reasonable precautions, but not covered by our fine-arts insurance.
              </p>
              
              <p className="[data-textmode='on']:leading-loose">
                Lenders may self-insure; provide a Certificate of Insurance by the delivery date.
              </p>
            </div>
          </section>

          {/* Delivery, Care & Returns Section */}
          <section id="delivery" className="mb-12 sm:mb-16 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Delivery, Care & Returns
            </h2>
            
            <div className="space-y-4 text-base sm:text-lg text-g23-gray dark:text-gray-300">
              <p className="[data-textmode='on']:leading-loose">
                Works arrive ready to exhibit (framed/installation hardware). We provide conservation-minded care and return in the condition received (except outdoor works).
              </p>
              
              <p className="[data-textmode='on']:leading-loose">
                Works not claimed within one (1) year after the loan end date may be considered an unconditional gift to the gallery (not automatic accession).
              </p>
            </div>
          </section>

          {/* Sales Section */}
          <section id="sales" className="mb-12 sm:mb-16 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Sales (if applicable)
            </h2>
            
            <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
              Standard split [X% artist / Y% gallery]. Proceeds remitted within [X] days of cleared funds.
            </p>
          </section>

          {/* Photography & Credits Section */}
          <section id="photography" className="mb-12 sm:mb-16 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Photography & Credits
            </h2>
            
            <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
              We may photograph and promote exhibitions; lenders are credited as specified.
            </p>
          </section>

          {/* Start a Loan/Consignment Section */}
          <section id="start" className="mb-12 sm:mb-16 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Start a Loan/Consignment
            </h2>
            
            <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 mb-8 [data-textmode='on']:leading-loose">
              Email [registrar@domain] with artist/lender, title, year, medium, dimensions, valuation, availability dates, installation notes.
            </p>

            {/* CTA Button */}
            <a
              href="mailto:[registrar@domain]?subject=Loan/Consignment Request"
              className="inline-flex items-center px-6 py-3 bg-g23-accent text-g23-black font-medium rounded-lg hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-g23-accent focus:ring-offset-2 [data-textmode='on']:underline [data-textmode='on']:bg-transparent [data-textmode='on']:text-g23-accent"
            >
              Start Loan/Consignment Request →
            </a>
          </section>

          {/* PDF Download Link (placeholder for when available) */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-g23-gray dark:text-gray-400 [data-textmode='on']:leading-loose">
              {/* Uncomment when PDF is available:
              <a href="/loan-consignment-agreement.pdf" download className="text-g23-accent hover:underline">
                Download full agreement (PDF)
              </a>
              */}
              Full PDF agreement coming soon.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}