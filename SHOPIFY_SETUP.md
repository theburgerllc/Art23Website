# Shopify Integration Setup

This guide will help you integrate your Shopify store with the gallery website.

## Prerequisites

1. A Shopify store (you can create a development store for free)
2. Shopify Admin access to create private apps

## Shopify Store Setup

### 1. Create a Private App

1. Log into your Shopify Admin
2. Go to **Settings** → **Apps and sales channels**
3. Click **Develop apps** → **Create an app**
4. Name your app (e.g., "Gallery Website Integration")
5. Click **Create app**

### 2. Configure API Permissions

1. Click **Configure** in the Admin API access card
2. Enable the following **Admin API access scopes**:
   - `read_products`
   - `read_product_listings`
   - `read_inventory`
   - `read_price_rules`
   - `read_discounts`

3. Click **Configure** in the Storefront API access card
4. Enable the following **Storefront API access scopes**:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_products`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`

### 3. Generate API Credentials

1. Click **Install app** to generate your credentials
2. Copy the **Storefront access token** (this will be used in your environment variables)
3. Your store domain will be in the format: `your-store-name.myshopify.com`

## Environment Configuration

1. Copy the example environment file:
   ```bash
   cp env.local.example .env.local
   ```

2. Update the Shopify configuration in `.env.local`:
   ```env
   # Shopify Configuration
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
   NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
   ```

## Product Setup in Shopify

### 1. Product Organization

For the best integration with the gallery website, organize your products using:

- **Product Types**: Use consistent types like "Painting", "Sculpture", "Photography", "Digital Art"
- **Tags**: Use tags for additional categorization like "featured", "limited-edition", "contemporary"
- **Vendor**: Set the vendor field to the artist's name

### 2. Product Information

Ensure each product has:
- High-quality images (minimum 800x1000px recommended)
- Detailed descriptions
- Proper pricing
- Inventory tracking enabled
- SEO-friendly handles (URLs)

### 3. Collections (Optional)

Create collections to group related artworks:
- Featured Works
- New Arrivals
- By Artist
- By Medium
- By Price Range

## Features Included

### Current Implementation

✅ **Product Display**
- Grid layout with filtering by category
- Product cards with images, titles, artists, and pricing
- Sort by featured, price, and artist name
- Responsive design matching the gallery theme

✅ **Shopify Integration Foundation**
- Storefront API client setup
- GraphQL queries for products and collections
- Cart creation functionality
- Price formatting utilities
- Image URL optimization

### Ready for Development

🔧 **Cart Functionality**
- Add to cart from product grid
- Cart sidebar/page
- Quantity management
- Checkout redirect to Shopify

🔧 **Product Detail Pages**
- Individual product pages
- Image galleries
- Variant selection
- Artist information
- Add to cart functionality

🔧 **Advanced Features**
- Search functionality
- Product recommendations
- Wishlist/favorites
- Customer accounts (if needed)

## Testing the Integration

1. Ensure your environment variables are set correctly
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `/shop` to see the product grid
4. Check the browser console for any API errors

## Troubleshooting

### Common Issues

1. **Products not loading**
   - Verify your Storefront API token is correct
   - Check that your store domain is properly formatted
   - Ensure products are published to the "Online Store" sales channel

2. **Images not displaying**
   - Confirm products have images uploaded in Shopify
   - Check image URLs in the browser network tab

3. **API Errors**
   - Verify API permissions are correctly set
   - Check the Shopify API version compatibility

### Development vs Production

- For development, you can use a Shopify development store
- For production, ensure you're using your live store credentials
- Always test thoroughly before going live

## Next Steps

1. Set up your Shopify store and products
2. Configure the environment variables
3. Test the shop page functionality
4. Customize the product display to match your brand
5. Implement cart and checkout functionality as needed

## Support

- [Shopify Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [Shopify Partner Dashboard](https://partners.shopify.com/)
- [Shopify Help Center](https://help.shopify.com/)