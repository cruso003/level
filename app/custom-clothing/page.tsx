// app/custom-clothing/page.tsx
"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppOrderButton } from "@/components/whatsapp-order";
import { CallToAction } from "@/components/call-to-action";

export default function CustomClothingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <Image
            src="/clothing-design-bg.jpg"
            alt="Clothing design background pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Custom Clothing Designs
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Transform your ideas into wearable art with our premium custom
              printed apparel. Front and back design options that make a
              statement.
            </p>
            <WhatsAppOrderButton
              product={{
                name: "Custom Clothing Design Inquiry",
                price: "",
                color: "",
                size: "",
              }}
            />
          </div>
        </div>
      </section>

      {/* Design Placement Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Design Placement Options
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Choose where your custom designs appear on your garments for maximum
            impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/front-placement.jpg"
                  alt="Front design placement"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Front Design</h3>
                <p className="text-gray-600">
                  Our most popular option. Make an instant impression with bold
                  front designs that showcase your artwork right where it's most
                  visible.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/back-placement.jpg"
                  alt="Back design placement"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Back Design</h3>
                <p className="text-gray-600">
                  Create impact coming and going. Back designs allow for larger,
                  more detailed artwork that makes a statement even as you walk
                  away.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/dual-placement.jpg"
                  alt="Dual design placement"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Dual Placement</h3>
                <p className="text-gray-600">
                  For maximum impact, choose complementary designs for both
                  front and back. Perfect for event merchandise or brand
                  statements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Available Products
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            We offer a range of high-quality garments for your custom designs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["T-Shirts", "Hoodies", "Tank Tops", "Long Sleeves"].map(
              (product, index) => (
                <Card
                  key={index}
                  className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={`/product-${index + 1}.jpg`}
                      alt={product}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">{product}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Premium quality, pre-shrunk fabric available in multiple
                      colors
                    </p>
                    <p className="text-indigo-600 font-medium">
                      Starting from $24.99
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Quality & Materials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                src="/fabric-quality.jpg"
                alt="Premium fabric quality"
                width={600}
                height={450}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Premium Quality Materials
              </h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  We use only the highest quality materials for our custom
                  printed clothing. Our t-shirts are made from 100% ring-spun
                  cotton for exceptional comfort and durability, while our
                  hoodies feature a premium cotton-polyester blend for warmth
                  and softness.
                </p>
                <ul className="mt-4 space-y-2">
                  <li>Pre-shrunk fabric to maintain size and shape</li>
                  <li>High-quality print process that won't fade or crack</li>
                  <li>Double-stitched seams for extra durability</li>
                  <li>Available in a wide range of sizes from XS to 3XL</li>
                  <li>Multiple color options to complement your design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Custom Clothing Process
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            From concept to creation, here's how we bring your custom clothing
            to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-600"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-center">
                1. Design Consultation
              </h3>
              <p className="text-gray-600 text-center">
                Share your vision with us through WhatsApp. We'll discuss your
                ideas, artwork requirements, and product specifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-600"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-center">
                2. Design Finalization
              </h3>
              <p className="text-gray-600 text-center">
                Our designer creates the artwork based on your specifications.
                We'll send mockups for your approval before proceeding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-600"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-center">
                3. Production & Delivery
              </h3>
              <p className="text-gray-600 text-center">
                Once approved, we'll print your design on your chosen garments
                with precision and care, then deliver to your specified address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to Bring Your Vision to Life?"
        description="Whether you're looking for custom clothing designs, branding assets, or promotional artwork, our designer is ready to create something uniquely yours."
        whatsappProduct={{
          name: "Custom Clothing Design Inquiry",
        }}
        buttonText="Contact Our Designer"
      />
    </div>
  );
}
