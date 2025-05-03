import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDesignById } from '@/lib/designer-data';
import { getProductsWithDesignByDesignId } from '@/lib/products-with-designs';
import { notFound } from 'next/navigation';

// Define the type for params as a Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

// Metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // Resolve the params Promise
  const design = getDesignById(resolvedParams.id);
  
  if (!design) {
    return {
      title: 'Design Not Found',
    };
  }
  
  return {
    title: design.name,
    description: design.description,
  };
}

// Page component
export default async function DesignPage({ params }: PageProps) {
  const resolvedParams = await params; // Resolve the params Promise
  const design = getDesignById(resolvedParams.id);
  
  if (!design) {
    notFound();
  }
  
  const productsWithDesign = getProductsWithDesignByDesignId(design.id);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Design Image */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <div className="aspect-square relative">
            <Image 
              src={design.imageUrl} 
              alt={design.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Design Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{design.name}</h1>
          <p className="text-gray-600 mb-6">{design.description}</p>
          
          <div className="mb-6 flex flex-wrap gap-2">
            {design.tags.map(tag => (
              <Badge key={tag} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h2 className="text-xl font-bold mb-4">Available On</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {productsWithDesign.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="overflow-hidden border hover:border-indigo-300 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded bg-gray-100">
                      <Image 
                        src={product.images[0]} 
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href={`/products/${productsWithDesign[0]?.id}`}>Try On T-Shirt</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/products/${productsWithDesign[1]?.id}`}>Try On Hoodie</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">More From This Collection</h2>
        
        {/* More designs from same collection would be displayed here */}
      </div>
    </div>
  );
}
