'use client'

import ScrollAppearMedia from '@/components/ScrollAppearMedia'

/**
 * Usage examples for ScrollAppearMedia component
 *
 * This file demonstrates various ways to use the ScrollAppearMedia component
 * in different contexts throughout the gallery website.
 */

// Example 1: Hero Background Video
export function HeroBackgroundExample() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <ScrollAppearMedia
        showImage={false}
        videoSrc="/videos/gallery-hero.mp4"
        variant="hero"
        fadeInDuration={600}
        fadeOutDuration={800}
        className="hero-media"
        onScrollStateChange={(isScrolling, scrollDistance) => {
          console.log('Hero scroll state:', { isScrolling, scrollDistance })
        }}
      />

      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-light mb-4">gallerytwentythree</h1>
        <p className="text-xl opacity-80">Contemporary art exhibition space</p>
      </div>
    </section>
  )
}

// Example 2: Blog Featured Image
export function BlogFeaturedImageExample() {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <ScrollAppearMedia
          showImage={true}
          image={{
            src: '/images/blog/contemporary-art-feature.jpg',
            alt: 'Contemporary Art in the Digital Age',
            width: 1200,
            height: 600,
            priority: true
          }}
          variant="rounded-xl"
          fadeInDuration={400}
          fadeOutDuration={300}
          className="aspect-video"
        />
      </div>

      <div className="prose prose-lg">
        <h1>Contemporary Art in the Digital Age</h1>
        <p>Exploring how digital technology is reshaping the contemporary art landscape...</p>
      </div>
    </article>
  )
}

// Example 3: Product Showcase in Shop
export function ProductShowcaseExample() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <ScrollAppearMedia
          showImage={true}
          image={{
            src: '/images/products/abstract-composition-1.jpg',
            alt: 'Abstract Composition #1 by Marina Volkov',
            width: 600,
            height: 750
          }}
          variant="rounded"
          fadeInDuration={500}
          fadeOutDuration={400}
          blur={0}
          className="aspect-portrait"
          scrollConfig={{
            minScrollForFullOpacity: 150,
            scrollStopDelay: 250
          }}
        />
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-light text-[var(--foreground)] mb-2">
            Abstract Composition #1
          </h2>
          <p className="text-[var(--muted)]">by Marina Volkov</p>
        </div>

        <p className="text-[var(--muted)] leading-relaxed">
          Mixed media on canvas, exploring themes of urban decay and renewal.
          This piece represents the artist's ongoing investigation into...
        </p>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-medium text-[var(--foreground)]">$1,200</span>
          <span className="text-[var(--muted)] line-through">$1,500</span>
        </div>

        <button className="px-8 py-3 bg-[var(--accent)] text-[var(--background)] rounded-lg font-medium hover:bg-[var(--accent)]/90 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

// Example 4: Exhibition Gallery with Video
export function ExhibitionGalleryExample() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-[var(--foreground)] mb-4">
              Current Exhibition
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Experience our latest curated collection featuring emerging artists
              from around the world.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollAppearMedia
              showImage={false}
              videoSrc="/videos/exhibition-walkthrough.mp4"
              variant="rounded-xl"
              fadeInDuration={600}
              fadeOutDuration={500}
              className="aspect-video"
              respectMotionPreference={true}
            />

            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-2xl font-medium text-[var(--foreground)]">
                New Perspectives: A Digital Journey
              </h3>

              <p className="text-[var(--muted)] leading-relaxed">
                This immersive exhibition challenges conventional viewpoints and
                invites visitors to explore contemporary themes through innovative
                digital installations and interactive experiences.
              </p>

              <div className="space-y-2">
                <p className="text-sm text-[var(--muted)]">
                  <strong className="text-[var(--foreground)]">Opening:</strong> March 15, 2024
                </p>
                <p className="text-sm text-[var(--muted)]">
                  <strong className="text-[var(--foreground)]">Duration:</strong> 3 months
                </p>
                <p className="text-sm text-[var(--muted)]">
                  <strong className="text-[var(--foreground)]">Artists:</strong> 12 featured artists
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Example 5: Artist Portrait with Reduced Motion Support
export function ArtistPortraitExample() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/3">
        <ScrollAppearMedia
          showImage={true}
          image={{
            src: '/images/artists/marina-volkov-portrait.jpg',
            alt: 'Marina Volkov, Contemporary Artist',
            width: 400,
            height: 500
          }}
          variant="rounded"
          fadeInDuration={300}
          fadeOutDuration={200}
          className="aspect-portrait"
          respectMotionPreference={true}
          scrollConfig={{
            minScrollForFullOpacity: 100,
            scrollStopDelay: 200
          }}
        />
      </div>

      <div className="md:w-2/3 space-y-4">
        <h3 className="text-3xl font-light text-[var(--foreground)]">
          Marina Volkov
        </h3>
        <p className="text-[var(--accent)] font-medium">Contemporary Artist</p>
        <p className="text-[var(--muted)] leading-relaxed">
          Marina Volkov's work explores the intersection of urban environments
          and human emotion through mixed media compositions that blur the
          boundaries between abstract and representational art.
        </p>
      </div>
    </div>
  )
}

// Example 6: Custom Configuration with Performance Monitoring
export function AdvancedConfigurationExample() {
  const handleScrollStateChange = (isScrolling: boolean, scrollDistance: number) => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Scroll Performance:', {
        isScrolling,
        scrollDistance,
        timestamp: performance.now()
      })
    }
  }

  return (
    <div className="h-96 relative">
      <ScrollAppearMedia
        showImage={true}
        image={{
          src: '/images/gallery/installation-view.jpg',
          alt: 'Gallery Installation View',
          width: 800,
          height: 400
        }}
        variant="default"
        fadeInDuration={800}
        fadeOutDuration={600}
        blur={2}
        className="rounded-2xl"
        scrollConfig={{
          fadeInDuration: 800,
          fadeOutDuration: 600,
          scrollStopDelay: 400,
          minScrollForFullOpacity: 300,
          maxScrollTracking: 1500
        }}
        onScrollStateChange={handleScrollStateChange}
        respectMotionPreference={true}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h4 className="text-2xl font-light mb-2">Gallery Installation</h4>
          <p className="opacity-80">Interactive exhibition space</p>
        </div>
      </div>
    </div>
  )
}

// Complete demo page combining all examples
export default function ScrollAppearMediaDemo() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="space-y-32 py-20">
        <section>
          <div className="container">
            <h2 className="text-3xl font-light text-center mb-16 text-[var(--foreground)]">
              ScrollAppearMedia Component Examples
            </h2>
          </div>

          <div className="space-y-24">
            <div className="container">
              <h3 className="text-xl font-medium mb-8 text-[var(--foreground)]">Hero Background Video</h3>
              <HeroBackgroundExample />
            </div>

            <div className="container">
              <h3 className="text-xl font-medium mb-8 text-[var(--foreground)]">Blog Featured Image</h3>
              <BlogFeaturedImageExample />
            </div>

            <div className="container">
              <h3 className="text-xl font-medium mb-8 text-[var(--foreground)]">Product Showcase</h3>
              <ProductShowcaseExample />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-8 text-center text-[var(--foreground)]">Exhibition Gallery</h3>
              <ExhibitionGalleryExample />
            </div>

            <div className="container">
              <h3 className="text-xl font-medium mb-8 text-[var(--foreground)]">Artist Portrait</h3>
              <ArtistPortraitExample />
            </div>

            <div className="container">
              <h3 className="text-xl font-medium mb-8 text-[var(--foreground)]">Advanced Configuration</h3>
              <AdvancedConfigurationExample />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}