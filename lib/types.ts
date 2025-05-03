// lib/types.ts
export interface DesignerCollection {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    featured?: boolean;
  }
  
  export interface DesignerDesign {
    id: string;
    name: string;
    description: string;
    collectionId: string;
    imageUrl: string;
    featured?: boolean;
    tags: string[];
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'tshirts' | 'hoodies' | 'pants' | 'accessories';
    images: string[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
    isNew?: boolean;
  }
  
  export interface ProductWithDesign extends Product {
    designId: string;
    designImage: string;
    designName: string;
  }
  
  export interface TryOnResult {
    id: string;
    resultImageUrl: string;
    productWithDesignId: string;
    userImageUrl: string;
    createdAt: Date;
  }
