// app/products/page.tsx
'use client';

import { useState } from 'react';
import { getProductsWithDesignByCategory } from '@/lib/products-with-designs';
import { ProductCard } from '@/components/product-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CallToAction } from '@/components/call-to-action';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  
  const allProducts = getProductsWithDesignByCategory(activeCategory);
  
  // Filter products by search query and price range
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.designName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Artistic Designs on Premium Apparel</h1>
            <p className="text-lg opacity-90 mb-6">
              Browse our collection of unique designs ready to be printed on high-quality clothing.
              Choose your design placement for a personalized touch.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters and Search */}
      <div className="bg-white border-b sticky top-0 z-10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full md:w-auto">
              <TabsList className="w-full md:w-auto justify-start rounded-lg bg-gray-100">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
                <TabsTrigger value="hoodies">Hoodies</TabsTrigger>
                <TabsTrigger value="pants">Pants</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search designs..."
                  className="pl-9 pr-4 py-2 rounded-lg border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Toggle filters"
                className={showFilters ? "border-indigo-600 text-indigo-600" : ""}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range: ${priceRange.min} - ${priceRange.max}
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span>to</span>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Style</label>
                <div className="flex flex-wrap gap-2">
                  {['African', 'Abstract', 'Cultural', 'Minimalist', 'Urban'].map(style => (
                    <Button key={style} variant="outline" size="sm" className="bg-white">
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select title="Sort By" className="w-full rounded-md border border-gray-300 p-2 bg-white">
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Products Grid */}
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </h2>
            {searchQuery && (
              <p className="text-gray-600">
                Search results for: <span className="font-medium">"{searchQuery}"</span>
              </p>
            )}
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-white p-8 rounded-lg shadow-sm max-w-md">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any products matching your current filters.
                  Try adjusting your search or browse our collections.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setPriceRange({ min: 0, max: 100 });
                }}>
                  Reset All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Custom Design CTA */}
      <CallToAction 
        title="Looking for a Custom Design?"
        description="Let our artist create a unique design specifically for you. From concept to final product, we'll bring your vision to life."
        whatsappProduct={{
          name: "Custom Design Inquiry"
        }}
        buttonText="Request Custom Design"
      />
    </div>
  );
}
