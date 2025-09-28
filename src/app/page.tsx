import Link from 'next/link'
import MotionFade from '@/components/MotionFade'
import Card from '@/components/Card'
import AmbiLight from '@/components/AmbiLight'
import { getLatestExhibitions } from '@/lib/dal'

export default async function HomePage() {
  const exhibitions = await getLatestExhibitions(3)
  
  return (
    <>
      {/* Immersive Hero Section with AmbiLight */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* AmbiLight Background Video */}
        <AmbiLight
          videoSrc="/videos/gallery-hero.mp4"
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

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 container text-center text-white">
          <MotionFade>
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-[clamp(3rem,8vw,7rem)] font-light leading-[0.9] tracking-tight">
                feel your<br/>
                <span className="font-normal">art beat</span>
                <span className="text-[var(--accent)]">.</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                gallerytwentythree is an artist-first exhibition space presenting
                contemporary work across all media. Online always, in-person by appointment.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center">
                <Link
                  href="/exhibitions"
                  className="px-8 py-4 bg-[var(--accent)] text-[var(--background)] rounded-lg font-semibold hover:bg-[var(--accent)]/90 transition-all duration-300 hover:scale-105"
                >
                  View Exhibitions
                </Link>
                <Link
                  href="/visit"
                  className="px-8 py-4 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  Visit Us
                </Link>
              </div>
            </div>
          </MotionFade>
        </div>

        {/* Scroll Indicator */}
        <MotionFade delay={1}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center space-y-2 text-white/70">
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </MotionFade>
      </section>

      <div className="container py-20 space-y-20">
      
      {/* Latest Exhibitions */}
      {exhibitions.length > 0 && (
        <MotionFade delay={0.2}>
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-bold">Current Exhibitions</h2>
              <Link href="/exhibitions" className="text-[var(--accent)] hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {exhibitions.map((exhibition) => (
                <Card
                  key={exhibition.slug}
                  href={`/exhibitions/${exhibition.slug}`}
                  title={exhibition.title}
                  subtitle={exhibition.dates}
                  image={exhibition.image}
                />
              ))}
            </div>
          </section>
        </MotionFade>
      )}
      
      {/* Features Grid */}
      <MotionFade delay={0.4}>
        <section className="grid md:grid-cols-3 gap-8">
          <Link 
            href="/exhibitions"
            className="group p-8 border border-[var(--muted)] rounded-xl hover:border-[var(--accent)] transition-colors"
          >
            <h3 className="text-2xl font-bold mb-3">Exhibitions</h3>
            <p className="text-[var(--muted)]">
              Curated shows featuring emerging and established artists
            </p>
          </Link>
          
          <Link 
            href="/artists"
            className="group p-8 border border-[var(--muted)] rounded-xl hover:border-[var(--accent)] transition-colors"
          >
            <h3 className="text-2xl font-bold mb-3">Artists</h3>
            <p className="text-[var(--muted)]">
              Discover our roster of contemporary creators
            </p>
          </Link>
          
          <Link 
            href="/about"
            className="group p-8 border border-[var(--muted)] rounded-xl hover:border-[var(--accent)] transition-colors"
          >
            <h3 className="text-2xl font-bold mb-3">About</h3>
            <p className="text-[var(--muted)]">
              Our mission, vision, and commitment to artists
            </p>
          </Link>
        </section>
      </MotionFade>
      </div>
    </>
  )
}