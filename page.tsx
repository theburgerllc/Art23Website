import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getExhibition, getExhibitions } from '@/lib/dal'
import MotionFade from '@/components/MotionFade'

export async function generateStaticParams() {
  const exhibitions = await getExhibitions()
  return exhibitions.map((exhibition) => ({
    slug: exhibition.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const exhibition = await getExhibition(params.slug)
  if (!exhibition) return {}
  
  return {
    title: exhibition.title,
    description: exhibition.description,
    openGraph: {
      title: exhibition.title,
      description: exhibition.description,
      images: [exhibition.image],
    }
  }
}

export default async function ExhibitionPage({ params }: { params: { slug: string } }) {
  const exhibition = await getExhibition(params.slug)
  
  if (!exhibition) {
    notFound()
  }
  
  return (
    <article className="container py-12">
      <MotionFade>
        <header className="max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl font-black mb-4">{exhibition.title}</h1>
          <p className="text-xl text-[var(--muted)]">
            {exhibition.startDate} — {exhibition.endDate}
          </p>
          {exhibition.artist && (
            <p className="text-lg mt-2">Curated by {exhibition.artist}</p>
          )}
        </header>
      </MotionFade>
      
      {exhibition.image && (
        <MotionFade delay={0.2}>
          <div className="relative aspect-video max-w-6xl mx-auto mb-12">
            <Image
              src={exhibition.image}
              alt={exhibition.title}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 1536px) 100vw, 1536px"
              priority
            />
            <div className="img-alt" data-alt={`Exhibition: ${exhibition.title}`} />
          </div>
        </MotionFade>
      )}
      
      <MotionFade delay={0.4}>
        <div className="prose prose-lg max-w-4xl mx-auto">
          <p className="lead text-2xl mb-8">{exhibition.description}</p>
          {exhibition.body && (
            <div dangerouslySetInnerHTML={{ __html: exhibition.body }} />
          )}
        </div>
      </MotionFade>
    </article>
  )
}