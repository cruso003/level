// components/product-card.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductWithDesign } from '@/lib/types';

interface ProductCardProps {
  product: ProductWithDesign;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
            <Image 
              src={product.designImage} 
              alt={product.designName}
              fill
              className="object-contain scale-90 transition-transform duration-500 group-hover:scale-95"
            />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 z-20">
            <div className="relative w-full h-full">
              <Image 
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-4">
                <Badge className="bg-white text-indigo-700 hover:bg-gray-100">
                  Preview on {product.name}
                </Badge>
              </div>
            </div>
          </div>
          
          {product.isNew && (
            <Badge className="absolute top-3 left-3 z-30 bg-indigo-600">
              New
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1 truncate">{product.designName}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.name}</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</p>
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div 
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300" 
                  style={{ 
                    backgroundColor: 
                      color.toLowerCase() === 'white' ? '#ffffff' :
                      color.toLowerCase() === 'black' ? '#000000' :
                      color.toLowerCase() === 'navy' ? '#001f3f' :
                      color.toLowerCase() === 'gray' ? '#808080' : 
                      '#dddddd'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-600">
                  +{product.colors.length - 3}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
