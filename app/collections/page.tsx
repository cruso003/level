// app/collections/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { designerCollections } from '@/lib/designer-data';

export const metadata: Metadata = {
  title: 'Designer Collections',
  description: 'Explore our exclusive designer collections featuring unique designs for various themes and occasions.',
};

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Designer Collections</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Browse our exclusive collections created by our talented in-house designer.
        Each collection features unique designs for various themes and occasions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designerCollections.map(collection => (
          <Link key={collection.id} href={`/collections/${collection.id}`}>
            <Card className="overflow-hidden h-full shadow-sm hover:shadow-md transition-all duration-300 border-0 group">
              <div className="aspect-[4/3] relative">
                <Image 
                  src={collection.coverImage} 
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">{collection.name}</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600">{collection.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
