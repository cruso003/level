// app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our designer, our process, and our commitment to quality custom printed clothing.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About DesignerPrints</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            DesignerPrints was founded in 2023 by a passionate designer with a vision to create unique, 
            high-quality clothing that celebrates cultural heritage and contemporary design trends.
          </p>
          <p className="text-gray-600 mb-4">
            What began as a small project creating designs for local sports teams and events quickly 
            grew into a full-fledged brand, known for its distinctive style and exceptional quality.
          </p>
          <p className="text-gray-600 mb-4">
            Today, we continue to create exclusive designs across various collections, from seasonal themes 
            to cultural heritage celebrations, all available on premium apparel that our customers love.
          </p>
          
          <Button asChild className="mt-4 bg-indigo-600 hover:bg-indigo-700">
            <Link href="/collections">Explore Our Collections</Link>
          </Button>
        </div>
        
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
          <Image 
            src="/about/studio.jpg" 
            alt="Our design studio" 
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Designer</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
            <Image 
              src="/about/designer.jpg" 
              alt="Designer portrait" 
              width={192}
              height={192}
              className="object-cover"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">John Doe</h3>
            <p className="text-gray-600 italic mb-4">Lead Designer & Founder</p>
            <p className="text-gray-600">
              With over 15 years of experience in graphic design and fashion, John brings a unique 
              perspective to each collection. Inspired by global cultures, contemporary art, and 
              street style, his designs combine bold aesthetics with meaningful storytelling.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Design</h3>
            <p className="text-gray-600">
              Each design begins as a concept inspired by culture, events, or creative themes. 
              Our designer develops these ideas into unique graphics using both traditional techniques and digital tools.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Print</h3>
            <p className="text-gray-600">
              We use advanced printing techniques that ensure designs remain vibrant and durable through 
              multiple washes. All printing is done locally, maintaining high quality standards.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Deliver</h3>
            <p className="text-gray-600">
              Once your order is placed, we carefully package your custom garments and ship them to you. 
              Most orders are processed within 2-3 business days and delivered promptly.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Our Commitment to Quality</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-center">
          We believe in creating products that last. That's why we use only premium quality materials 
          and ethical manufacturing practices. Every item is checked for quality before it leaves our facility, 
          ensuring that you receive only the best. Our garments are pre-shrunk, durable, and designed for comfort.
        </p>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Start Your Custom Experience Today</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Browse our collections, try on designs virtually, and find the perfect custom clothing for your style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/collections">Explore Collections</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/designs">Browse Designs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
