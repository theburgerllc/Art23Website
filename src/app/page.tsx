import Image from 'next/image'
import Link from 'next/link'
import MotionFade from '@/components/MotionFade'
import Card from '@/components/Card'
import { getLatestExhibitions } from '@/lib/dal'

export default async function HomePage() {
  const exhibitions = await getLatestExhibitions(3)
  
  return (
    <div className="container py-12 space-y-20">
      {/* Hero Section */}
      <MotionFade>
        <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          <div className="space-y-6">
            <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.9] tracking-tighter">
              feel your<br/>art beat<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-xl">
              gallerytwentythree is an artist-first exhibition space presenting 
              contemporary work across all media. Online always, in-person by appointment.
            </p>
            <div className="flex gap-4 pt-4">
              <Link 
                href="/exhibitions" 
                className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-semibold hover:opacity-90 transition"
              >
                View Exhibitions
              </Link>
              <Link 
                href="/visit" 
                className="px-6 py-3 border border-current rounded-lg font-semibold hover:bg-[var(--accent)] hover:text-black transition"
              >
                Visit Us
              </Link>
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-20 rounded-3xl" />
            <Image
              src="/images/hero-gradient.svg"
              alt="Abstract gradient artwork"
              width={800}
              height={800}
              priority
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="img-alt" data-alt="Abstract gradient artwork in aqua and black" />
          </div>
        </section>
      </MotionFade>
      
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
  )
}