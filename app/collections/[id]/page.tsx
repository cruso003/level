import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCollectionById, getDesignsByCollectionId } from '@/lib/designer-data';
import { notFound } from 'next/navigation';

// Define the type for params as a Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

// Metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // Resolve the params Promise
  const collection = getCollectionById(resolvedParams.id);
  
  if (!collection) {
    return {
      title: 'Collection Not Found',
    };
  }
  
  return {
    title: `${collection.name} Collection`,
    description: collection.description,
  };
}

// Page component
export default async function CollectionPage({ params }: PageProps) {
  const resolvedParams = await params; // Resolve the params Promise
  const collection = getCollectionById(resolvedParams.id);
  
  if (!collection) {
    notFound();
  }
  
  const designs = getDesignsByCollectionId(collection.id);
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Collection Header */}
      <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-10">
        <Image 
          src={collection.coverImage} 
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{collection.name}</h1>
            <p className="text-white/90 max-w-2xl">{collection.description}</p>
          </div>
        </div>
      </div>
      
      {/* Designs Grid */}
      <h2 className="text-2xl font-bold mb-6">Designs in This Collection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {designs.map(design => (
          <Link key={design.id} href={`/designs/${design.id}`} className="group">
            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <Image 
                  src={design.imageUrl} 
                  alt={design.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-6 text-white">
                    <p className="font-medium">View Design</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{design.name}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{design.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button asChild variant="outline">
          <Link href="/collections">← Back to Collections</Link>
        </Button>
        
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/designs">Browse All Designs</Link>
        </Button>
      </div>
    </div>
  );
}
