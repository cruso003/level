// app/faq/page.tsx
"use client";
import { FAQSection } from '@/components/faq-section';
import { CallToAction } from '@/components/call-to-action';

export default function FAQPage() {
  const allFAQs = [
    // General FAQs
    {
      question: "How can I order custom designed clothing?",
      answer: "You can browse our available designs and select the clothing item and design placement you prefer. For custom designs, contact us directly through WhatsApp or our contact form."
    },
    {
      question: "What types of design services do you offer?",
      answer: "We offer custom clothing designs, logo creation, branding assets, promotional materials like flyers and posters, and custom artwork for various applications."
    },
    {
      question: "How does the design process work?",
      answer: "Our process includes an initial consultation, concept development, refinement based on your feedback, and final production. For clothing, we print your approved design on high-quality apparel in your chosen placement."
    },
    {
      question: "How long does the design process take?",
      answer: "Timeframes vary based on project complexity. Simple clothing prints from existing designs can be completed in 3-5 days, while custom designs typically take 1-2 weeks from consultation to delivery."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide. International shipping times vary by location, typically taking 7-14 business days. Expedited shipping options are available upon request."
    },
    
    // Clothing & Printing FAQs
    {
      question: "What clothing items can I choose from?",
      answer: "We offer a range of premium apparel including t-shirts, hoodies, tank tops, long sleeve shirts, and more. All items are made from high-quality materials for comfort and durability."
    },
    {
      question: "What sizes are available?",
      answer: "Our clothing items are available in sizes ranging from XS to 3XL, with detailed size charts available on each product page to help you find the perfect fit."
    },
    {
      question: "How durable are the designs when printed?",
      answer: "We use high-quality printing techniques that ensure designs remain vibrant and don't crack or fade with proper care. Our prints are washable and designed to last."
    },
    {
      question: "Can I provide my own design to be printed?",
      answer: "Yes! We can print your own artwork or designs. Simply contact us via WhatsApp with your design files and requirements, and we'll guide you through the process."
    },
    
    // Logo & Branding FAQs
    {
      question: "What's included in your logo design service?",
      answer: "Our logo design service includes initial consultation, multiple concept options, revisions based on your feedback, and final delivery in various file formats suitable for both digital and print applications."
    },
    {
      question: "Do I own the copyright to my logo design?",
      answer: "Yes, once the design is completed and paid for, you retain full ownership rights to your logo design."
    },
    {
      question: "How many revisions do I get for my logo design?",
      answer: "Our standard package includes up to three rounds of revisions to ensure you're completely satisfied with your logo design. Additional revisions can be arranged if needed."
    },
    
    // Promotional Design FAQs
    {
      question: "What formats will I receive my promotional designs in?",
      answer: "Depending on your requirements, we provide designs in print-ready formats (PDF, CMYK) and/or web-optimized formats (JPG, PNG) suitable for social media and digital platforms."
    },
    {
      question: "Can you help with printing my promotional materials?",
      answer: "While our primary focus is on design, we can recommend trusted printing partners or provide guidance on printing specifications to ensure optimal results."
    },
    
    // Payment & Process FAQs
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including major credit cards, PayPal, and bank transfers. For international orders, we may request payment via secure international payment platforms."
    },
    {
      question: "Do you require a deposit before starting work?",
      answer: "Yes, for custom design work we typically require a 50% deposit to begin the project, with the remaining balance due upon approval of the final design before printing or delivery of files."
    },
    {
      question: "What happens if I'm not satisfied with the design?",
      answer: "Customer satisfaction is our priority. We work closely with you throughout the process with multiple revision opportunities. If you're still not satisfied, we'll discuss options to address your concerns."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
          <p className="text-center max-w-2xl mx-auto opacity-90">
            Find answers to common questions about our design services, process, and products.
          </p>
        </div>
      </section>
      
      <FAQSection 
        title="General Questions"
        description="Find answers to the most common questions about our services and process."
        faqs={allFAQs.slice(0, 5)}
        showAllLink={false}
      />
      
      <FAQSection 
        title="Clothing & Printing"
        description="Questions about our custom clothing options and printing process."
        faqs={allFAQs.slice(5, 9)}
        showAllLink={false}
      />
      
      <FAQSection 
        title="Logo & Branding"
        description="Information about our logo design and branding services."
        faqs={allFAQs.slice(9, 12)}
        showAllLink={false}
      />
      
      <FAQSection 
        title="Promotional Design"
        description="Details about our promotional design services and deliverables."
        faqs={allFAQs.slice(12, 14)}
        showAllLink={false}
      />
      
      <FAQSection 
        title="Payment & Process"
        description="Questions about payment methods and our design process."
        faqs={allFAQs.slice(14)}
        showAllLink={false}
      />
      
      <CallToAction 
        title="Still Have Questions?"
        description="Contact us directly via WhatsApp for personalized assistance with your design needs."
        whatsappProduct={{
          name: "FAQ Inquiry"
        }}
        buttonText="Contact Us via WhatsApp"
      />
    </div>
  );
}
