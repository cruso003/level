// app/designs/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { designerDesigns } from '@/lib/designer-data';

export const metadata: Metadata = {
  title: 'Designer Designs',
  description: 'Browse our unique designer designs available on various apparel items.',
};

export default function DesignsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Designer Designs</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Browse our exclusive designs created by our talented in-house designer.
        Each design is available on various apparel items like t-shirts, hoodies, and more.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {designerDesigns.map(design => (
          <Link key={design.id} href={`/designs/${design.id}`} className="group">
            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <Image 
                  src={design.imageUrl} 
                  alt={design.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg">{design.name}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{design.description}</p>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {design.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="bg-gray-100 hover:bg-gray-200">
                      {tag}
                    </Badge>
                  ))}
                  {design.tags.length > 3 && (
                    <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200">
                      +{design.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
