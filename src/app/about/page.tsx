export const metadata = {
  title: 'About',
  description: 'About gallerytwentythree'
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-5xl font-black mb-4">About</h1>
      <p className="text-xl text-[var(--muted)] mb-8 max-w-3xl">
        gallerytwentythree is an artist-first exhibition space committed to contemporary practices across media.
      </p>
    </div>
  )
}