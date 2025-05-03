// components/faq-section.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  showAllLink?: boolean;
}

export function FAQSection({ 
  title = "Frequently Asked Questions", 
  description = "Get answers to the most common questions about our design services.",
  faqs,
  showAllLink = true
}: FAQSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          {description}
        </p>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        {showAllLink && (
          <div className="mt-10 text-center">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
