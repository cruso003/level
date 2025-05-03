// app/page.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getFeaturedCollections,
  getFeaturedDesigns,
} from "@/lib/designer-data";
import { getFeaturedProductsWithDesign } from "@/lib/products-with-designs";
import { CallToAction } from "@/components/call-to-action";
import { FAQSection } from "@/components/faq-section";

export default function HomePage() {
  const featuredCollections = getFeaturedCollections();
  const featuredDesigns = getFeaturedDesigns();
  const featuredProducts = getFeaturedProductsWithDesign().slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <Image
            src="/designer-pattern-bg.jpg"
            alt="Artistic pattern background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block">Artistry Meets</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-rose-300">
                  Fashion & Design
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Discover exclusive artistic collections crafted by our visionary
                designer. From custom clothing prints to bespoke artwork for
                your brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-gray-100"
                >
                  <Link href="/collections">Explore Collections</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white/10"
                >
                  <Link href="/custom-design">Request Custom Design</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[550px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-designer-image.jpg"
                alt="Designer artwork showcase"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-sm uppercase tracking-wider opacity-75">
                  Featured Collection
                </p>
                <h3 className="text-xl font-bold">Covid 21</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-indigo-100">
                <Image
                  src="/designer-portrait.jpg"
                  alt="Designer portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 mt-8 md:mt-0">
              <h2 className="text-3xl font-bold mb-6">
                The Artist Behind the Designs
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700">
                  With over a decade of experience in visual arts and fashion
                  design, our lead artist creates unique pieces that blend
                  cultural heritage with contemporary aesthetics.
                </p>
                <p className="text-gray-700 mt-4">
                  Each design tells a story, whether it's celebrating cultural
                  identity, highlighting social causes, or simply creating
                  beauty through artistic expression.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-6 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                <Link href="/about">Read Full Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Featured Collections
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Explore our newest and most popular design collections, each with
            its own unique artistic vision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`}>
                <Card className="overflow-hidden h-full shadow-sm hover:shadow-lg transition-all duration-300 border-0 group">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={collection.coverImage}
                      alt={collection.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">
                          {collection.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-gray-600 line-clamp-2">
                      {collection.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="/collections">View All Collections</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Design Services
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            From custom clothing prints to branding assets, our artist creates
            unique designs for all your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-center">
                Custom Clothing Designs
              </h3>
              <p className="text-gray-600 text-center">
                Get our exclusive designs printed on quality apparel. Choose
                from various placement options for front and back designs.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="text-indigo-600 border-indigo-200 hover:border-indigo-600"
                >
                  <Link href="/custom-clothing">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-center">
                Logo & Brand Design
              </h3>
              <p className="text-gray-600 text-center">
                Commission our artist to create distinctive logos and visual
                branding elements that capture your brand essence.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="text-indigo-600 border-indigo-200 hover:border-indigo-600"
                >
                  <Link href="/logo-design">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
                Flyers & Promotional Art
              </h3>
              <p className="text-gray-600 text-center">
                Get eye-catching promotional materials designed with artistic
                flair for your events and marketing campaigns.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="text-indigo-600 border-indigo-200 hover:border-indigo-600"
                >
                  <Link href="/promotional-design">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Placement Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Design Placement Options
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Choose exactly where your design appears on your custom printed
            clothing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/front-design-placement.jpg"
                  alt="Front design placement"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white text-center">
                    Front Design
                  </h3>
                  <p className="text-white/80 text-center mt-2">
                    Our most popular placement option
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-md">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/back-design-placement.jpg"
                  alt="Back design placement"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white text-center">
                    Back Design
                  </h3>
                  <p className="text-white/80 text-center mt-2">
                    Make a statement coming and going
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="/design-options">Explore All Placement Options</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Featured Designs
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Explore our most popular artistic creations ready to be printed on
            quality apparel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <Image
                      src={product.designImage}
                      alt={product.designName}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-indigo-600 text-white text-xs py-1 px-2 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1">
                      {product.designName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">{product.name}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-indigo-600">
                        ${product.price.toFixed(2)}
                      </p>
                      <span className="text-sm text-indigo-600 font-medium hover:underline">
                        View Details
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="/designs">View All Designs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Design Process
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            From conceptualization to the final product, here's how we bring
            designs to life.
          </p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {/* Step 1 */}
              <div className="md:text-right relative">
                <div className="hidden md:block absolute right-0 top-8 w-8 h-8 rounded-full bg-indigo-600 border-4 border-indigo-100 transform translate-x-1/2"></div>
                <div className="bg-white p-6 rounded-lg shadow-sm md:mr-8">
                  <h3 className="text-xl font-bold mb-3 text-indigo-600">
                    1. Consultation
                  </h3>
                  <p className="text-gray-600">
                    We begin with understanding your vision, preferences, and
                    requirements for the design.
                  </p>
                </div>
              </div>

              {/* Empty for timeline alignment */}
              <div className="hidden md:block"></div>

              {/* Step 2 */}
              <div className="hidden md:block"></div>
              <div className="relative">
                <div className="hidden md:block absolute left-0 top-8 w-8 h-8 rounded-full bg-indigo-600 border-4 border-indigo-100 transform -translate-x-1/2"></div>
                <div className="bg-white p-6 rounded-lg shadow-sm md:ml-8">
                  <h3 className="text-xl font-bold mb-3 text-indigo-600">
                    2. Concept Development
                  </h3>
                  <p className="text-gray-600">
                    Our artist creates initial sketches and concepts based on
                    your brief and artistic direction.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="md:text-right relative">
                <div className="hidden md:block absolute right-0 top-8 w-8 h-8 rounded-full bg-indigo-600 border-4 border-indigo-100 transform translate-x-1/2"></div>
                <div className="bg-white p-6 rounded-lg shadow-sm md:mr-8">
                  <h3 className="text-xl font-bold mb-3 text-indigo-600">
                    3. Design Refinement
                  </h3>
                  <p className="text-gray-600">
                    Based on your feedback, we refine the design until it
                    perfectly captures your vision.
                  </p>
                </div>
              </div>

              {/* Empty for timeline alignment */}
              <div className="hidden md:block"></div>

              {/* Step 4 */}
              <div className="hidden md:block"></div>
              <div className="relative">
                <div className="hidden md:block absolute left-0 top-8 w-8 h-8 rounded-full bg-indigo-600 border-4 border-indigo-100 transform -translate-x-1/2"></div>
                <div className="bg-white p-6 rounded-lg shadow-sm md:ml-8">
                  <h3 className="text-xl font-bold mb-3 text-indigo-600">
                    4. Production & Delivery
                  </h3>
                  <p className="text-gray-600">
                    Once approved, we print your design on high-quality apparel
                    and deliver it straight to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Our Clients Say
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Don't just take our word for it. Here's what our clients think about
            our artistic designs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 left-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 23.75C13.875 23.75 16 21.625 16 19C16 16.375 13.875 14.25 11.25 14.25C8.625 14.25 6.5 16.375 6.5 19C6.5 19.125 6.5 19.25 6.5 19.375L6.375 19.25C6.375 24.375 10.5 28.5 15.625 28.5V26C12.25 26 9.5 23.25 9.5 19.875L9.625 20C10.125 22.125 12 23.75 14.25 23.75H11.25Z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M24.25 23.75C26.875 23.75 29 21.625 29 19C29 16.375 26.875 14.25 24.25 14.25C21.625 14.25 19.5 16.375 19.5 19C19.5 19.125 19.5 19.25 19.5 19.375L19.375 19.25C19.375 24.375 23.5 28.5 28.625 28.5V26C25.25 26 22.5 23.25 22.5 19.875L22.625 20C23.125 22.125 25 23.75 27.25 23.75H24.25Z"
                    fill="#4F46E5"
                  />
                </svg>
              </div>

              <div className="pt-5">
                <p className="text-gray-600 mb-4">
                  "The cultural heritage designs are absolutely stunning. The
                  artist perfectly captured the essence of my background in a
                  modern, wearable piece of art."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/testimonial-1.jpg"
                      alt="Testimonial author"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">James K.</p>
                    <p className="text-sm text-gray-500">Custom Print Client</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 left-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 23.75C13.875 23.75 16 21.625 16 19C16 16.375 13.875 14.25 11.25 14.25C8.625 14.25 6.5 16.375 6.5 19C6.5 19.125 6.5 19.25 6.5 19.375L6.375 19.25C6.375 24.375 10.5 28.5 15.625 28.5V26C12.25 26 9.5 23.25 9.5 19.875L9.625 20C10.125 22.125 12 23.75 14.25 23.75H11.25Z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M24.25 23.75C26.875 23.75 29 21.625 29 19C29 16.375 26.875 14.25 24.25 14.25C21.625 14.25 19.5 16.375 19.5 19C19.5 19.125 19.5 19.25 19.5 19.375L19.375 19.25C19.375 24.375 23.5 28.5 28.625 28.5V26C25.25 26 22.5 23.25 22.5 19.875L22.625 20C23.125 22.125 25 23.75 27.25 23.75H24.25Z"
                    fill="#4F46E5"
                  />
                </svg>
              </div>

              <div className="pt-5">
                <p className="text-gray-600 mb-4">
                  "The logo design for my startup exceeded all expectations. It
                  perfectly encapsulates our brand vision while standing out
                  with artistic flair."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/testimonial-2.jpg"
                      alt="Testimonial author"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Sarah M.</p>
                    <p className="text-sm text-gray-500">Logo Design Client</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 left-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 23.75C13.875 23.75 16 21.625 16 19C16 16.375 13.875 14.25 11.25 14.25C8.625 14.25 6.5 16.375 6.5 19C6.5 19.125 6.5 19.25 6.5 19.375L6.375 19.25C6.375 24.375 10.5 28.5 15.625 28.5V26C12.25 26 9.5 23.25 9.5 19.875L9.625 20C10.125 22.125 12 23.75 14.25 23.75H11.25Z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M24.25 23.75C26.875 23.75 29 21.625 29 19C29 16.375 26.875 14.25 24.25 14.25C21.625 14.25 19.5 16.375 19.5 19C19.5 19.125 19.5 19.25 19.5 19.375L19.375 19.25C19.375 24.375 23.5 28.5 28.625 28.5V26C25.25 26 22.5 23.25 22.5 19.875L22.625 20C23.125 22.125 25 23.75 27.25 23.75H24.25Z"
                    fill="#4F46E5"
                  />
                </svg>
              </div>

              <div className="pt-5">
                <p className="text-gray-600 mb-4">
                  "The event flyers designed for our cultural festival attracted
                  so much attention. The colors, composition, and artistic
                  elements were simply phenomenal."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/testimonial-3.jpg"
                      alt="Testimonial author"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Michael L.</p>
                    <p className="text-sm text-gray-500">
                      Promotional Design Client
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to Bring Your Vision to Life?"
        description="Whether you're looking for custom clothing designs, branding assets, or promotional artwork, our designer is ready to create something uniquely yours."
        whatsappProduct={{
          name: "General Design Inquiry",
        }}
        buttonText="Contact Our Designer"
      />

      {/* FAQ Section */}
      <FAQSection
        faqs={[
          {
            question: "How can I order custom designed clothing?",
            answer:
              "You can browse our available designs and select the clothing item and design placement you prefer. For custom designs, contact us directly through WhatsApp or our contact form.",
          },
          {
            question: "What types of design services do you offer?",
            answer:
              "We offer custom clothing designs, logo creation, branding assets, promotional materials like flyers and posters, and custom artwork for various applications.",
          },
          {
            question: "How does the design process work?",
            answer:
              "Our process includes an initial consultation, concept development, refinement based on your feedback, and final production. For clothing, we print your approved design on high-quality apparel in your chosen placement.",
          },
          {
            question: "How long does the design process take?",
            answer:
              "Timeframes vary based on project complexity. Simple clothing prints from existing designs can be completed in 3-5 days, while custom designs typically take 1-2 weeks from consultation to delivery.",
          },
          {
            question: "Do you ship internationally?",
            answer:
              "Yes, we ship worldwide. International shipping times vary by location, typically taking 7-14 business days. Expedited shipping options are available upon request.",
          },
        ]}
      />
    </div>
  );
}
