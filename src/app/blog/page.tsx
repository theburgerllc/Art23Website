'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
    content: 'Full blog post content would go here...',
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
    content: 'Full blog post content would go here...',
    author: 'Michael Rodriguez',
    date: '2024-03-10',
    readTime: '3 min read',
    category: 'Exhibitions',
    slug: 'gallery-opening-new-perspectives'
  },
  {
    id: '3',
    title: 'The Art of Collecting: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of art collecting, from understanding value to building your first collection.',
    content: 'Full blog post content would go here...',
    author: 'Elena Kowalski',
    date: '2024-03-05',
    readTime: '8 min read',
    category: 'Collecting',
    slug: 'art-collecting-beginners-guide'
  },
  {
    id: '4',
    title: 'Artist Spotlight: Emerging Talents',
    excerpt: 'Featuring three emerging artists who are pushing boundaries and redefining contemporary art.',
    content: 'Full blog post content would go here...',
    author: 'David Park',
    date: '2024-02-28',
    readTime: '6 min read',
    category: 'Artist Spotlight',
    slug: 'artist-spotlight-emerging-talents'
  }
]

const categories = ['All', 'Digital Art', 'Exhibitions', 'Collecting', 'Artist Spotlight']

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-20 border-b border-[var(--border)]/20">
        <div className="container">
          <MotionFade>
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-5xl md:text-7xl font-light tracking-tight text-[var(--foreground)] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Blog
              </motion.h1>
              <motion.p
                className="text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Insights, stories, and perspectives from the contemporary art world.
                Explore our latest thoughts on exhibitions, artists, and cultural movements.
              </motion.p>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b border-[var(--border)]/10">
        <div className="container">
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  index === 0
                    ? 'bg-[var(--accent)] text-[var(--background)] shadow-lg'
                    : 'bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--accent)]/10 border border-[var(--border)]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent)]/5 hover:border-[var(--accent)]/30">
                    {/* Image placeholder - replace with actual images */}
                    <div className="aspect-[16/10] bg-gradient-to-br from-[var(--accent)]/20 to-[var(--muted)]/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-[var(--background)]/90 backdrop-blur-sm text-xs font-medium text-[var(--foreground)] rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-4">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-2xl font-medium text-[var(--foreground)] mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                        {post.title}
                      </h2>

                      <p className="text-[var(--muted)] leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="mt-6 flex items-center text-[var(--accent)] font-medium">
                        <span className="group-hover:mr-2 transition-all duration-300">Read more</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button className="px-8 py-4 bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-full font-medium hover:bg-[var(--accent)] hover:text-[var(--background)] hover:border-[var(--accent)] transition-all duration-300">
              Load More Posts
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 border-t border-[var(--border)]/20">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl font-medium text-[var(--foreground)] mb-4">
              Stay Updated
            </h3>
            <p className="text-[var(--muted)] mb-8">
              Subscribe to our newsletter for the latest art insights, exhibition updates, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              />
              <button className="px-6 py-3 bg-[var(--accent)] text-[var(--background)] rounded-lg font-medium hover:bg-[var(--accent)]/90 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}