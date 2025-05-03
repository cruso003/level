// lib/products-with-designs.ts
import { products } from './data';
import { designerDesigns } from './designer-data';
import { ProductWithDesign } from './types';

// Create combinations of products with designs
export const productsWithDesigns: ProductWithDesign[] = [];

// For each design, create product combinations (t-shirts, hoodies, etc.)
designerDesigns.forEach(design => {
  // Create a t-shirt with this design
  productsWithDesigns.push({
    ...products.find(p => p.id === 'classic-cotton-tee')!,
    id: `tshirt-${design.id}`,
    designId: design.id,
    designImage: design.imageUrl,
    designName: design.name,
  });
  
  // Create a hoodie with this design
  productsWithDesigns.push({
    ...products.find(p => p.id === 'premium-hoodie')!,
    id: `hoodie-${design.id}`,
    designId: design.id,
    designImage: design.imageUrl,
    designName: design.name,
  });
});

// Helper functions
export const getProductWithDesignById = (id: string): ProductWithDesign | undefined => {
  return productsWithDesigns.find(product => product.id === id);
};

export const getProductsWithDesignByDesignId = (designId: string): ProductWithDesign[] => {
  return productsWithDesigns.filter(product => product.designId === designId);
};

export const getProductsWithDesignByCategory = (category: string): ProductWithDesign[] => {
  if (category === 'all') return productsWithDesigns;
  return productsWithDesigns.filter(product => product.category === category);
};

export const getFeaturedProductsWithDesign = (): ProductWithDesign[] => {
  return productsWithDesigns.filter(product => {
    const design = designerDesigns.find(d => d.id === product.designId);
    return design?.featured;
  });
};

