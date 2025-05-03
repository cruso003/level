// lib/data.ts
import { Product } from './types';

export const products: Product[] = [
  {
    id: 'classic-cotton-tee',
    name: 'Classic Cotton Tee',
    description: 'Our premium cotton t-shirt features a relaxed fit and soft fabric for all-day comfort. Perfect for custom printing with your unique designs.',
    price: 29.99,
    category: 'tshirts',
    images: ['/products/tshirt-1.webp', '/products/tshirt-1-back.webp'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    inStock: true,
  },
  {
    id: 'premium-hoodie',
    name: 'Premium Pullover Hoodie',
    description: 'Stay cozy with our premium pullover hoodie. Features a soft inner lining, adjustable hood, and front pocket. Ideal for custom designs.',
    price: 59.99,
    category: 'hoodies',
    images: ['/products/hoodie-1.jpg', '/products/hoodie-1-back.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Maroon'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'athletic-track-pants',
    name: 'Athletic Track Pants',
    description: 'Comfortable athletic track pants made with moisture-wicking fabric. Features side pockets and elastic waistband with drawstring.',
    price: 45.99,
    category: 'pants',
    images: ['/products/pants-1.jpg', '/products/pants-1-side.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy'],
    inStock: true,
  },
  {
    id: 'vintage-graphic-tee',
    name: 'Vintage Graphic Tee',
    description: 'A soft, pre-shrunk cotton tee with a vintage feel. Great for custom graphics and designs that need that lived-in look.',
    price: 34.99,
    category: 'tshirts',
    images: ['/products/tshirt-2.jpg', '/products/tshirt-2-back.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Vintage Blue', 'Faded Red'],
    inStock: true,
  },
  {
    id: 'zip-up-hoodie',
    name: 'Full-Zip Hoodie',
    description: 'A versatile full-zip hoodie made from premium cotton blend. Features two front pockets and ribbed cuffs for added comfort.',
    price: 64.99,
    category: 'hoodies',
    images: ['/products/hoodie-2.jpg', '/products/hoodie-2-back.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Forest Green'],
    inStock: true,
    isNew: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

