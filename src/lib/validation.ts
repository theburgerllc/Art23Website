import { z } from 'zod'

// Input validation schemas using Zod
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  honeypot: z.string().max(0) // Anti-spam field
})

export const newsletterSchema = z.object({
  email: z.string().email()
})

export const searchSchema = z.object({
  query: z.string().min(1).max(100)
})

// Sanitize user input for display
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Validate environment variables
export function validateEnv() {
  const schema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
  })
  
  try {
    return schema.parse(process.env)
  } catch (error) {
    console.error('Invalid environment variables:', error)
    throw new Error('Invalid environment configuration')
  }
}