'use client'

import AmbiLight from '@/components/AmbiLight'

/**
 * Usage examples for AmbiLight component
 *
 * This file demonstrates various ways to use the AmbiLight component
 * throughout the gallery website for different purposes.
 */

// Example 1: Hero Section Background
export function HeroAmbiLightExample() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <AmbiLight
        videoSrc="/videos/gallery-ambient.mp4"
        sourceType="file"
        autoplay={true}
        muted={true}
        loop={true}
        controls={false}
        blur={30}
        spread={40}
        intensity={0.7}
        radius={0}
        shadow={0.4}
        saturation={1.3}
        brightness={1.2}
        className="hero-ambi"
      />

      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-light mb-4">gallerytwentythree</h1>
        <p className="text-xl opacity-90">Contemporary art exhibition space</p>
      </div>
    </section>
  )
}

// Example 2: YouTube Video Integration
export function YouTubeAmbiLightExample() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-medium text-[var(--foreground)] mb-6">
        Exhibition Walkthrough
      </h2>

      <AmbiLight
        videoSrc="" // Not used for YouTube but required by component
        youtubeId="dQw4w9WgXcQ" // Replace with actual exhibition video
        sourceType="youtube"
        autoplay={false}
        muted={false}
        controls={true}
        blur={25}
        spread={30}
        intensity={0.5}
        radius={16}
        shadow={0.3}
        className="aspect-video rounded-xl"
      />

      <p className="text-[var(--muted)] mt-4 text-center">
        Take a virtual tour of our latest exhibition featuring emerging artists.
      </p>
    </div>
  )
}

// Example 3: Artist Portfolio Video
export function ArtistPortfolioExample() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <AmbiLight
          videoSrc="/videos/artist-portfolio.mp4"
          sourceType="file"
          autoplay={true}
          muted={true}
          loop={true}
          controls={false}
          blur={20}
          spread={25}
          intensity={0.6}
          radius={12}
          saturation={1.1}
          brightness={1.05}
          className="aspect-square rounded-xl"
        />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-light text-[var(--foreground)] mb-2">
            Marina Volkov
          </h3>
          <p className="text-[var(--accent)] font-medium">Contemporary Artist</p>
        </div>

        <p className="text-[var(--muted)] leading-relaxed">
          Marina's work explores the intersection of digital and physical realms,
          creating immersive experiences that challenge our perception of reality.
        </p>

        <button className="px-6 py-3 bg-[var(--accent)] text-[var(--background)] rounded-lg font-medium hover:bg-[var(--accent)]/90 transition-colors">
          View Portfolio
        </button>
      </div>
    </div>
  )
}

// Example 4: Exhibition Showcase
export function ExhibitionShowcaseExample() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-[var(--foreground)] mb-4">
            Current Exhibition
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Experience our immersive digital installation exploring themes of
            connection and isolation in the modern world.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <AmbiLight
            videoSrc="/videos/exhibition-installation.mp4"
            sourceType="file"
            autoplay={true}
            muted={true}
            loop={true}
            controls={false}
            blur={35}
            spread={50}
            intensity={0.8}
            radius={20}
            shadow={0.5}
            saturation={1.4}
            brightness={1.3}
            className="aspect-cinema rounded-2xl intense-glow"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <h4 className="font-semibold text-[var(--foreground)] mb-2">Interactive Elements</h4>
            <p className="text-[var(--muted)] text-sm">Motion-responsive installations</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-[var(--foreground)] mb-2">Digital Art</h4>
            <p className="text-[var(--muted)] text-sm">Generative and algorithmic works</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-[var(--foreground)] mb-2">Immersive Experience</h4>
            <p className="text-[var(--muted)] text-sm">360-degree environmental design</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Example 5: Product Demo in Shop
export function ShopProductDemoExample() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[var(--card)] rounded-2xl p-8 border border-[var(--border)]">
        <h3 className="text-2xl font-medium text-[var(--foreground)] mb-6">
          Digital Art Collection
        </h3>

        <AmbiLight
          videoSrc="/videos/digital-art-preview.mp4"
          sourceType="file"
          autoplay={false}
          muted={true}
          loop={true}
          controls={true}
          blur={15}
          spread={20}
          intensity={0.4}
          radius={8}
          shadow={0.2}
          className="aspect-video rounded subtle-glow mb-6"
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-[var(--foreground)]">
              "Digital Consciousness #3"
            </span>
            <span className="text-xl font-semibold text-[var(--accent)]">
              $850
            </span>
          </div>

          <p className="text-[var(--muted)] text-sm">
            Limited edition digital artwork with interactive elements.
            Includes certificate of authenticity and display instructions.
          </p>

          <button className="w-full px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

// Example 6: Advanced Configuration with Performance Monitoring
export function AdvancedAmbiLightExample() {
  const handleVideoLoad = () => {
    console.log('AmbiLight video loaded successfully')
  }

  const handleVideoError = (error: Error) => {
    console.error('AmbiLight video error:', error)
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-medium text-[var(--foreground)]">
        Advanced Configuration
      </h3>

      <AmbiLight
        videoSrc="/videos/abstract-visuals.mp4"
        sourceType="file"
        autoplay={true}
        muted={true}
        loop={true}
        controls={false}
        blur={40}
        spread={60}
        intensity={0.9}
        radius={24}
        shadow={0.6}
        saturation={1.5}
        brightness={1.4}
        startTime={10}
        className="aspect-video rounded-2xl"
        onVideoLoad={handleVideoLoad}
        onVideoError={handleVideoError}
        style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}
      />

      <div className="text-center">
        <p className="text-[var(--muted)] text-sm">
          High-intensity ambient lighting with custom configuration
        </p>
      </div>
    </div>
  )
}

// Complete demo page
export default function AmbiLightDemo() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="space-y-32 py-20">
        <section>
          <div className="container">
            <h1 className="text-4xl font-light text-center mb-16 text-[var(--foreground)]">
              AmbiLight Component Examples
            </h1>
          </div>

          <div className="space-y-24">
            <div>
              <h2 className="text-2xl font-medium mb-8 text-center text-[var(--foreground)]">
                Hero Background
              </h2>
              <HeroAmbiLightExample />
            </div>

            <div className="container">
              <h2 className="text-2xl font-medium mb-8 text-[var(--foreground)]">
                YouTube Integration
              </h2>
              <YouTubeAmbiLightExample />
            </div>

            <div className="container">
              <h2 className="text-2xl font-medium mb-8 text-[var(--foreground)]">
                Artist Portfolio
              </h2>
              <ArtistPortfolioExample />
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-8 text-center text-[var(--foreground)]">
                Exhibition Showcase
              </h2>
              <ExhibitionShowcaseExample />
            </div>

            <div className="container">
              <h2 className="text-2xl font-medium mb-8 text-[var(--foreground)]">
                Shop Product Demo
              </h2>
              <ShopProductDemoExample />
            </div>

            <div className="container">
              <h2 className="text-2xl font-medium mb-8 text-[var(--foreground)]">
                Advanced Configuration
              </h2>
              <AdvancedAmbiLightExample />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}