'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import MotionFade from '@/components/MotionFade'

interface Product {
  id: string
  title: string
  artist: string
  price: number
  originalPrice?: number
  description: string
  category: string
  image: string
  available: boolean
  featured: boolean
  shopifyId?: string
}

// Sample products - replace with actual Shopify data
const products: Product[] = [
  {
    id: '1',
    title: 'Abstract Composition #1',
    artist: 'Marina Volkov',
    price: 1200,
    originalPrice: 1500,
    description: 'Mixed media on canvas, exploring themes of urban decay and renewal.',
    category: 'Paintings',
    image: '/api/placeholder/400/500',
    available: true,
    featured: true
  },
  {
    id: '2',
    title: 'Digital Dreams',
    artist: 'Alex Chen',
    price: 800,
    description: 'Limited edition digital print exploring the intersection of technology and humanity.',
    category: 'Digital Art',
    image: '/api/placeholder/400/500',
    available: true,
    featured: false
  },
  {
    id: '3',
    title: 'Ceramic Vessel Series',
    artist: 'Rosa Martinez',
    price: 350,
    description: 'Handcrafted ceramic piece inspired by ancient pottery traditions.',
    category: 'Sculpture',
    image: '/api/placeholder/400/500',
    available: true,
    featured: true
  },
  {
    id: '4',
    title: 'Urban Landscapes',
    artist: 'David Kim',
    price: 950,
    description: 'Photography series capturing the essence of modern city life.',
    category: 'Photography',
    image: '/api/placeholder/400/500',
    available: false,
    featured: false
  },
  {
    id: '5',
    title: 'Flowing Forms',
    artist: 'Elena Rossi',
    price: 2200,
    description: 'Bronze sculpture celebrating organic movement and natural forms.',
    category: 'Sculpture',
    image: '/api/placeholder/400/500',
    available: true,
    featured: true
  },
  {
    id: '6',
    title: 'Color Studies',
    artist: 'James Wilson',
    price: 650,
    description: 'Oil on canvas exploring the emotional impact of color relationships.',
    category: 'Paintings',
    image: '/api/placeholder/400/500',
    available: true,
    featured: false
  }
]

const categories = ['All', 'Paintings', 'Sculpture', 'Photography', 'Digital Art']

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = products.filter(product =>
    selectedCategory === 'All' || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'artist':
        return a.artist.localeCompare(b.artist)
      case 'featured':
      default:
        return b.featured ? 1 : -1
    }
  })

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
                Shop
              </motion.h1>
              <motion.p
                className="text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover and collect contemporary artworks from emerging and established artists.
                Each piece is carefully curated to bring exceptional art to your space.
              </motion.p>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-12 border-b border-[var(--border)]/10">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[var(--accent)] text-[var(--background)] shadow-lg'
                      : 'bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--accent)]/10 border border-[var(--border)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Sort Options */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-[var(--muted)] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="artist">Artist</option>
              </select>
            </motion.div>
          </div>

          {/* Results Count */}
          <motion.p
            className="text-[var(--muted)] mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Showing {sortedProducts.length} artwork{sortedProducts.length !== 1 ? 's' : ''}
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/shop/product/${product.id}`}>
                  <div className="bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent)]/5 hover:border-[var(--accent)]/30">
                    {/* Product Image */}
                    <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-[var(--muted)]/10 to-[var(--accent)]/5">
                      {product.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-block px-3 py-1 bg-[var(--accent)] text-[var(--background)] text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      )}

                      {!product.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                          <span className="px-4 py-2 bg-white/90 text-black font-medium rounded-lg">
                            Sold Out
                          </span>
                        </div>
                      )}

                      {/* Placeholder for product image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--muted)]/20 group-hover:scale-105 transition-transform duration-500" />

                      {/* Add to Cart Quick Action */}
                      {product.available && (
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="w-12 h-12 bg-[var(--background)]/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m15 0v0a2 2 0 01-2 2H9m12-2a2 2 0 00-2-2H5.4" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                          {product.title}
                        </h3>
                      </div>

                      <p className="text-[var(--muted)] text-sm mb-3">
                        by {product.artist}
                      </p>

                      <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-medium text-[var(--foreground)]">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-[var(--muted)] line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded-full border border-[var(--border)]">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
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
              Load More Products
            </button>
          </motion.div>
        </div>
      </section>

      {/* Shopify Integration Info */}
      <section className="py-20 border-t border-[var(--border)]/20">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl font-medium text-[var(--foreground)] mb-6">
              Secure Shopping Experience
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Secure Payment</h4>
                <p className="text-[var(--muted)] text-sm">SSL encrypted checkout powered by Shopify</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Careful Packaging</h4>
                <p className="text-[var(--muted)] text-sm">Professional art shipping and handling</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Authenticity Guarantee</h4>
                <p className="text-[var(--muted)] text-sm">Certificate of authenticity included</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}