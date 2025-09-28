import { Suspense } from 'react'
import { getExhibitions } from '@/lib/dal'
import Card from '@/components/Card'
import MotionFade from '@/components/MotionFade'

export const metadata = {
  title: 'Exhibitions',
  description: 'Current, upcoming, and past exhibitions at gallerytwentythree'
}

async function ExhibitionsList() {
  const exhibitions = await getExhibitions()
  
  const now = new Date()
  const current = exhibitions.filter(e => {
    const start = new Date(e.startDate)
    const end = new Date(e.endDate)
    return start <= now && end >= now
  })
  
  const upcoming = exhibitions.filter(e => {
    const start = new Date(e.startDate)
    return start > now
  })
  
  const past = exhibitions.filter(e => {
    const end = new Date(e.endDate)
    return end < now
  }).slice(0, 6)
  
  return (
    <div className="space-y-16">
      {current.length > 0 && (
        <MotionFade>
          <section>
            <h2 className="text-3xl font-bold mb-8">Current Exhibitions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {current.map(exhibition => (
                <Card
                  key={exhibition.slug}
                  href={`/exhibitions/${exhibition.slug}`}
                  title={exhibition.title}
                  subtitle={`${exhibition.startDate} — ${exhibition.endDate}`}
                  image={exhibition.image}
                />
              ))}
            </div>
          </section>
        </MotionFade>
      )}
      
      {upcoming.length > 0 && (
        <MotionFade delay={0.2}>
          <section>
            <h2 className="text-3xl font-bold mb-8">Upcoming</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map(exhibition => (
                <Card
                  key={exhibition.slug}
                  href={`/exhibitions/${exhibition.slug}`}
                  title={exhibition.title}
                  subtitle={`Opens ${exhibition.startDate}`}
                  image={exhibition.image}
                />
              ))}
            </div>
          </section>
        </MotionFade>
      )}
      
      {past.length > 0 && (
        <MotionFade delay={0.4}>
          <section>
            <h2 className="text-3xl font-bold mb-8">Past Exhibitions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75">
              {past.map(exhibition => (
                <Card
                  key={exhibition.slug}
                  href={`/exhibitions/${exhibition.slug}`}
                  title={exhibition.title}
                  subtitle={`${exhibition.startDate} — ${exhibition.endDate}`}
                  image={exhibition.image}
                />
              ))}
            </div>
          </section>
        </MotionFade>
      )}
    </div>
  )
}

export default function ExhibitionsPage() {
  return (
    <div className="container py-12">
      <MotionFade>
        <h1 className="text-5xl font-black mb-4">Exhibitions</h1>
        <p className="text-xl text-[var(--muted)] mb-12 max-w-3xl">
          Explore our curated exhibitions featuring contemporary artists working 
          across diverse media and perspectives.
        </p>
      </MotionFade>
      
      <Suspense fallback={<div>Loading exhibitions...</div>}>
        <ExhibitionsList />
      </Suspense>
    </div>
  )
}