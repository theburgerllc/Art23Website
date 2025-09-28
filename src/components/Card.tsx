import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  href: string
  title: string
  subtitle?: string
  image?: string
  description?: string
}

export default function Card({ href, title, subtitle, image, description }: CardProps) {
  return (
    <Link href={href} className="group block">
      {image && (
        <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="img-alt" data-alt={title} />
        </div>
      )}
      <h3 className="font-bold text-xl mb-1 group-hover:text-[var(--accent)] transition-colors">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-[var(--muted)]">{subtitle}</p>
      )}
      {description && (
        <p className="text-[var(--muted)] mt-2 line-clamp-2">{description}</p>
      )}
    </Link>
  )
}