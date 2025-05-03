// components/call-to-action.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WhatsAppOrderButton } from '@/components/whatsapp-order';

interface CallToActionProps {
  title: string;
  description: string;
  whatsappProduct: {
    name: string;
    price?: string;
    color?: string;
    size?: string;
  };
  buttonText: string;
}

export function CallToAction({ title, description, whatsappProduct, buttonText }: CallToActionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="max-w-2xl mx-auto mb-8 opacity-90">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <WhatsAppOrderButton 
            product={whatsappProduct}
            buttonText={buttonText}
            className="bg-white text-indigo-700 hover:bg-gray-100"
          />
          <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
            <Link href="/products">Browse Designs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
