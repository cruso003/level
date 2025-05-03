// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-lg mb-8">
        The page you're looking for doesn't seem to exist. It might have been moved,
        deleted, or perhaps the URL was mistyped.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/products">Shop Products</Link>
        </Button>
      </div>
    </div>
  );
}
