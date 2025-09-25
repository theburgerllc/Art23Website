import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visit — gallerytwentythree',
  description: 'Plan your visit: hours, directions, accessibility, and group tours.',
  openGraph: {
    title: 'Visit — gallerytwentythree',
    description: 'Plan your visit: hours, directions, accessibility, and group tours.',
    type: 'website',
  },
}

export default function VisitPage() {
  // JSON-LD structured data for LocalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    name: 'gallerytwentythree',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Street]',
      addressLocality: '[City]',
      addressRegion: '[State]',
      postalCode: '[ZIP]',
      addressCountry: 'US'
    },
    telephone: '203.822.1787',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '18:00'
      }
    ],
    url: 'https://gallerytwentythree.com',
    priceRange: 'Free',
    image: '/og-image.jpg'
  }

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-g23-accent text-g23-black px-4 py-2 rounded-md font-medium z-50"
      >
        Skip to main content
      </a>

      <div id="main-content" className="min-h-screen">
        {/* Main container with generous white space */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          
          {/* H1 and Introduction with Text Mode classes */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 [data-textmode='on']:tracking-wider [data-textmode='on']:leading-relaxed">
            Visit us
          </h1>
          
          <p className="text-lg sm:text-xl text-g23-gray dark:text-gray-300 mb-12 sm:mb-16 [data-textmode='on']:leading-loose [data-textmode='on']:tracking-wide">
            gallerytwentythree is an artist-first exhibition space presenting contemporary work across all media. Online always, in-person by appointment.
          </p>

          {/* Hours & Admission Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Hours & Admission
            </h2>
            
            <div className="space-y-4 text-base sm:text-lg">
              <p className="[data-textmode='on']:leading-loose">
                <strong className="font-semibold">Hours:</strong> [Wed–Sun, 12–6 PM]
              </p>
              <p className="[data-textmode='on']:leading-loose">
                <strong className="font-semibold">Admission:</strong> [Free / Suggested donation $X]
              </p>
            </div>
          </section>

          {/* Address & Map Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Address & Map
            </h2>
            
            <div className="space-y-6">
              <p className="text-base sm:text-lg [data-textmode='on']:leading-loose">
                <strong className="font-semibold">Address:</strong> [Street, City, State ZIP]
              </p>
              
              {/* Map embed container - hidden in text mode */}
              <div className="relative w-full h-64 sm:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden [data-textmode='on']:hidden">
                <iframe
                  title="Map to gallerytwentythree"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3M8KwNTknMTQuNCJX!5e0!3m2!1sen!2sus!4v1635959042228!5m2!1sen!2sus"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-base sm:text-lg text-g23-accent hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-g23-accent focus:ring-offset-2 [data-textmode='on']:leading-loose"
              >
                Get directions →
              </a>
            </div>
          </section>

          {/* Getting Here Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Getting Here
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-3 [data-textmode='on']:tracking-wide">
                  Transit
                </h3>
                <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
                  [Nearest lines/stops]
                </p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-3 [data-textmode='on']:tracking-wide">
                  Parking
                </h3>
                <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
                  [Street / lot / accessible parking info]
                </p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-3 [data-textmode='on']:tracking-wide">
                  Bike access
                </h3>
                <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
                  [Racks / no racks]
                </p>
              </div>
            </div>
          </section>

          {/* Accessibility Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Accessibility
            </h2>
            
            <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
              Galleries and restrooms are [wheelchair accessible]. For accommodations, contact [access@domain]. Service animals welcome.
            </p>
          </section>

          {/* Groups & Tours Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Groups & Tours
            </h2>
            
            <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
              Guided visits for schools, nonprofits, and private groups by appointment. Email [visits@domain].
            </p>
          </section>

          {/* Visitor Guidelines Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Visitor Guidelines
            </h2>
            
            <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
              Be mindful of artworks and other visitors. No touching works. Non-flash photography unless posted otherwise. Large bags may be checked at staff discretion.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 [data-textmode='on']:tracking-wide [data-textmode='on']:leading-relaxed">
              Contact
            </h2>
            
            <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 [data-textmode='on']:leading-loose">
              <strong className="font-semibold">General:</strong> [info@domain] • Phone: [203.822.1787]
            </p>
            <p className="text-base sm:text-lg text-g23-gray dark:text-gray-300 mt-4 [data-textmode='on']:leading-loose">
              For loans/consignments, see <a href="/loan-consignment" className="text-g23-accent hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-g23-accent focus:ring-offset-2">Loan & Consignment</a>.
            </p>
          </section>

        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}