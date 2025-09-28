import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--muted)]/20 mt-20">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-2xl mb-4">gallerytwentythree</h3>
            <p className="text-[var(--muted)] mb-4">
              Contemporary art exhibition space.<br/>
              Feel your art beat.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/exhibitions" className="text-[var(--muted)] hover:text-[var(--accent)]">Exhibitions</Link></li>
              <li><Link href="/artists" className="text-[var(--muted)] hover:text-[var(--accent)]">Artists</Link></li>
              <li><Link href="/visit" className="text-[var(--muted)] hover:text-[var(--accent)]">Visit</Link></li>
              <li><Link href="/about" className="text-[var(--muted)] hover:text-[var(--accent)]">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-[var(--muted)] hover:text-[var(--accent)]">Contact</Link></li>
              <li><a href="mailto:hello@gallerytwentythree.art" className="text-[var(--muted)] hover:text-[var(--accent)]">Email</a></li>
              <li><a href="tel:+12038221787" className="text-[var(--muted)] hover:text-[var(--accent)]">203.822.1787</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[var(--muted)]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--muted)]">
            © 2025 gallerytwentythree. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-[var(--muted)] hover:text-[var(--accent)]">Privacy</Link>
            <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--accent)]">Terms</Link>
            <Link href="/sitemap.xml" className="text-[var(--muted)] hover:text-[var(--accent)]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}