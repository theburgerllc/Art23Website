// Shopify Storefront API integration
// This file handles communication with Shopify's Storefront API

interface ShopifyConfig {
  storeDomain: string
  storefrontAccessToken: string
  apiVersion: string
}

// Configuration - these should be set in environment variables
const shopifyConfig: ShopifyConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01'
}

// GraphQL queries for Shopify Storefront API
const PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          description
          vendor
          productType
          tags
          availableForSale
          createdAt
          updatedAt
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
              }
            }
          }
        }
      }
    }
  }
`

const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      vendor
      productType
      tags
      availableForSale
      createdAt
      updatedAt
      seo {
        title
        description
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

// Shopify API client function
async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const endpoint = `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.apiVersion}/graphql.json`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
    }

    return data.data
  } catch (error) {
    console.error('Shopify API Error:', error)
    throw error
  }
}

// Product-related functions
export async function getProducts(first: number = 20, after?: string) {
  try {
    return await shopifyFetch(PRODUCTS_QUERY, { first, after })
  } catch (error) {
    console.error('Error fetching products:', error)
    return null
  }
}

export async function getProductByHandle(handle: string) {
  try {
    return await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle })
  } catch (error) {
    console.error('Error fetching product by handle:', error)
    return null
  }
}

// Cart-related functions
export async function createCart(lines: Array<{ merchandiseId: string; quantity: number }>) {
  try {
    const cartInput = {
      lines: lines.map(line => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      }))
    }

    return await shopifyFetch(CART_CREATE_MUTATION, { input: cartInput })
  } catch (error) {
    console.error('Error creating cart:', error)
    return null
  }
}

// Helper functions
export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function getProductImageUrl(product: any, size: string = 'medium'): string {
  if (!product.images?.edges?.length) {
    return '/api/placeholder/400/500' // Fallback image
  }

  const imageUrl = product.images.edges[0].node.url

  // Shopify image transformation parameters
  const sizeParams = {
    small: '400x500',
    medium: '600x750',
    large: '800x1000',
  }

  return `${imageUrl}?width=${sizeParams[size as keyof typeof sizeParams] || sizeParams.medium}`
}

// Type definitions
export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  vendor: string
  productType: string
  tags: string[]
  availableForSale: boolean
  images: {
    edges: Array<{
      node: {
        id: string
        url: string
        altText: string
        width: number
        height: number
      }
    }>
  }
  variants: {
    edges: Array<{
      node: {
        id: string
        title: string
        price: {
          amount: string
          currencyCode: string
        }
        compareAtPrice?: {
          amount: string
          currencyCode: string
        }
        availableForSale: boolean
        quantityAvailable: number
      }
    }>
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    edges: Array<{
      node: {
        id: string
        quantity: number
        merchandise: {
          id: string
          title: string
          price: {
            amount: string
            currencyCode: string
          }
          product: {
            title: string
            handle: string
          }
        }
      }
    }>
  }
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalTaxAmount?: {
      amount: string
      currencyCode: string
    }
  }
}

// Configuration check function
export function isShopifyConfigured(): boolean {
  return !!(
    shopifyConfig.storeDomain &&
    shopifyConfig.storefrontAccessToken &&
    shopifyConfig.storeDomain !== 'your-store.myshopify.com'
  )
}

export { shopifyConfig }