'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MotionFade from '@/components/MotionFade'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image?: string
  slug: string
}

// Sample blog posts - replace with actual data source
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Contemporary Art in the Digital Age',
    excerpt: 'Exploring how digital technology is reshaping the contemporary art landscape and creating new forms of artistic expression.',
    content: `
      <p>The intersection of technology and art has never been more pronounced than it is today. As we navigate the digital age, artists are increasingly turning to technology not just as a tool, but as a medium for creative expression.</p>

      <h2>The Evolution of Digital Art</h2>
      <p>Digital art has evolved from simple computer graphics to complex interactive installations that respond to viewer presence and input. Artists like Rafael Lozano-Hemmer and Casey Reas have pushed the boundaries of what's possible when code meets creativity.</p>

      <h2>NFTs and the Art Market</h2>
      <p>The emergence of NFTs (Non-Fungible Tokens) has revolutionized how we think about digital art ownership and provenance. While controversial, NFTs have opened new revenue streams for digital artists and challenged traditional gallery models.</p>

      <h2>Virtual and Augmented Reality</h2>
      <p>VR and AR technologies are creating immersive art experiences that transport viewers into entirely new worlds. Artists are no longer constrained by physical space, opening up infinite possibilities for creative expression.</p>

      <h2>The Future of Art</h2>
      <p>As AI continues to advance, we're seeing the emergence of AI-generated art and collaborative human-AI creative processes. The question isn't whether technology will continue to influence art, but how we'll adapt to these rapid changes while preserving the human essence of creative expression.</p>
    `,
    author: 'Sarah Chen',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Digital Art',
    slug: 'contemporary-art-digital-age'
  },
  {
    id: '2',
    title: 'Gallery Opening: New Perspectives',
    excerpt: 'Join us for the opening of our latest exhibition featuring emerging artists from around the world.',
    content: `
      <p>We're thrilled to announce our upcoming exhibition "New Perspectives," featuring groundbreaking work from emerging artists across the globe. This exhibition challenges conventional viewpoints and invites viewers to see the world through fresh eyes.</p>

      <h2>Featured Artists</h2>
      <p>The exhibition showcases work from twelve artists, each bringing their unique cultural perspective and artistic vision to contemporary themes of identity, technology, and human connection.</p>

      <h2>Opening Reception</h2>
      <p>Join us on March 20th for the opening reception. The evening will feature artist talks, live music, and an opportunity to meet the featured artists in person.</p>

      <h2>About the Curator</h2>
      <p>Curated by Dr. Maria Santos, this exhibition represents three years of research into emerging global art movements and their impact on contemporary discourse.</p>
    `,
    author: 'Michael Rodriguez',
    date: '2024-03-10',
    readTime: '3 min read',
    category: 'Exhibitions',
    slug: 'gallery-opening-new-perspectives'
  }
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Article Header */}
      <article className="py-20">
        <div className="container max-w-4xl">
          <MotionFade>
            {/* Breadcrumb */}
            <motion.nav
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </motion.nav>

            {/* Category Badge */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm font-medium">
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-6xl font-light tracking-tight text-[var(--foreground)] mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {post.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              className="flex flex-wrap items-center gap-6 text-[var(--muted)] mb-12 pb-8 border-b border-[var(--border)]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-full flex items-center justify-center">
                  <span className="text-[var(--accent)] font-medium text-sm">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </motion.div>

            {/* Featured Image Placeholder */}
            <motion.div
              className="aspect-[16/9] bg-gradient-to-br from-[var(--accent)]/20 to-[var(--muted)]/20 rounded-2xl mb-12 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[var(--muted)] text-lg">Featured Image</span>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                '--tw-prose-body': 'var(--foreground)',
                '--tw-prose-headings': 'var(--foreground)',
                '--tw-prose-links': 'var(--accent)',
                '--tw-prose-bold': 'var(--foreground)',
                '--tw-prose-counters': 'var(--muted)',
                '--tw-prose-bullets': 'var(--muted)',
                '--tw-prose-hr': 'var(--border)',
                '--tw-prose-quotes': 'var(--foreground)',
                '--tw-prose-quote-borders': 'var(--accent)',
                '--tw-prose-captions': 'var(--muted)',
                '--tw-prose-code': 'var(--foreground)',
                '--tw-prose-pre-code': 'var(--foreground)',
                '--tw-prose-pre-bg': 'var(--card)',
                '--tw-prose-th-borders': 'var(--border)',
                '--tw-prose-td-borders': 'var(--border)',
              } as React.CSSProperties}
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>

            {/* Share Section */}
            <motion.div
              className="mt-16 pt-8 border-t border-[var(--border)]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">Share this article</h3>
              <div className="flex gap-4">
                <button className="w-12 h-12 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Related Articles */}
            <motion.div
              className="mt-20 pt-12 border-t border-[var(--border)]/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className="text-2xl font-medium text-[var(--foreground)] mb-8">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="group bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]/20 hover:border-[var(--accent)]/30 transition-all duration-300">
                      <span className="text-sm text-[var(--accent)] font-medium">{relatedPost.category}</span>
                      <h4 className="text-lg font-medium text-[var(--foreground)] mt-2 mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                        {relatedPost.title}
                      </h4>
                      <p className="text-[var(--muted)] text-sm line-clamp-2 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-[var(--muted)]">
                        <span>{relatedPost.author}</span>
                        <span className="mx-2">•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </MotionFade>
        </div>
      </article>
    </div>
  )
}