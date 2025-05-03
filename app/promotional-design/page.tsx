// app/promotional-design/page.tsx
"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppOrderButton } from "@/components/whatsapp-order";
import { CallToAction } from "@/components/call-to-action";

export default function PromotionalDesignPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <Image
            src="/promo-design-bg.jpg"
            alt="Promotional design background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Flyers & Promotional Art
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Eye-catching promotional materials designed with artistic flair to
              make your events and campaigns stand out.
            </p>
            <WhatsAppOrderButton
              product={{
                name: "Promotional Design Inquiry",
                price: "",
                color: "",
                size: "",
              }}
              buttonText="Discuss Your Project"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Promotional Design Services
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            We create compelling visual materials to promote your brand, events,
            and marketing campaigns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/flyer-design.jpg"
                  alt="Flyer Design"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Event Flyers</h3>
                <p className="text-gray-600 mb-4">
                  Attention-grabbing flyers that effectively communicate your
                  event details with artistic styling that matches the mood and
                  theme of your occasion.
                </p>
                <p className="text-indigo-600 font-medium">Starting from $99</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/poster-design.jpg"
                  alt="Poster Design"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Posters & Banners</h3>
                <p className="text-gray-600 mb-4">
                  Bold, visually striking posters and banners designed to
                  capture attention in physical spaces and create lasting
                  impressions.
                </p>
                <p className="text-indigo-600 font-medium">
                  Starting from $149
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/social-media-design.jpg"
                  alt="Social Media Design"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  Social Media Graphics
                </h3>
                <p className="text-gray-600 mb-4">
                  Engaging social media assets optimized for each platform,
                  designed to increase engagement and strengthen your online
                  presence.
                </p>
                <p className="text-indigo-600 font-medium">Starting from $79</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/brochure-design.jpg"
                  alt="Brochure Design"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  Brochures & Pamphlets
                </h3>
                <p className="text-gray-600 mb-4">
                  Informative and visually appealing multi-page designs that
                  effectively communicate your message and showcase your
                  products or services.
                </p>
                <p className="text-indigo-600 font-medium">
                  Starting from $199
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/menu-design.jpg"
                  alt="Menu Design"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  Menu & Catalog Design
                </h3>
                <p className="text-gray-600 mb-4">
                  Beautifully organized menus and catalogs that showcase your
                  offerings with style and enhance the customer experience.
                </p>
                <p className="text-indigo-600 font-medium">
                  Starting from $179
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/package-design.jpg"
                  alt="Package Design"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Packaging Design</h3>
                <p className="text-gray-600 mb-4">
                  Eye-catching product packaging that stands out on shelves and
                  creates a memorable unboxing experience for your customers.
                </p>
                <p className="text-indigo-600 font-medium">
                  Starting from $249
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                src="/design-approach.jpg"
                alt="Our design approach"
                width={600}
                height={450}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Design Philosophy</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  We believe that effective promotional materials need to do
                  more than just look good—they need to communicate your message
                  clearly while creating an emotional connection with your
                  audience.
                </p>
                <p className="mt-4">
                  Our artist combines strategic thinking with artistic vision,
                  balancing aesthetic appeal with functional design to create
                  materials that not only catch the eye but also drive action.
                </p>
                <ul className="mt-4 space-y-2">
                  <li>
                    Purpose-driven design that achieves your marketing goals
                  </li>
                  <li>Distinctive visuals that reflect your brand identity</li>
                  <li>Clear communication of key information</li>
                  <li>Consistent styling across all promotional materials</li>
                  <li>Optimized for both digital and print applications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Browse through some of our recent promotional design work.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="relative overflow-hidden rounded-lg shadow-sm group"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={`/promo-portfolio-${item}.jpg`}
                    alt={`Promotional design example ${item}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-medium">
                        Project Title {item}
                      </h3>
                      <p className="text-sm opacity-80">
                        Event Promotional Materials
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <WhatsAppOrderButton
              product={{
                name: "Portfolio Request",
                price: "",
                color: "",
                size: "",
              }}
              buttonText="Request Full Portfolio"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Design Process
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            How we create promotional materials that achieve your marketing
            objectives.
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-center">
                1. Brief & Strategy
              </h3>
              <p className="text-gray-600 text-center">
                We start by understanding your objectives, target audience, key
                messages, and any specific requirements for your promotional
                materials.
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
                2. Design & Revision
              </h3>
              <p className="text-gray-600 text-center">
                Our artist creates initial designs based on your brief. We then
                refine the work through a collaborative feedback process until
                you're completely satisfied.
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-center">
                3. Finalization & Delivery
              </h3>
              <p className="text-gray-600 text-center">
                Once approved, we finalize all files and deliver them in formats
                optimized for your intended use, whether digital, print, or
                both.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Client Success Stories
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Hear what our clients say about our promotional design services.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl relative">
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
                  "The promotional materials designed for our cultural festival
                  attracted unprecedented attention. The attention to detail and
                  artistic elements were simply outstanding."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/testimonial-promo-1.jpg"
                      alt="Testimonial author"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Michael Lawson</p>
                    <p className="text-sm text-gray-500">
                      Event Organizer, Cultural Fest
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl relative">
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
                  "The social media campaign materials were consistently
                  on-brand while still being creative and engaging. Our
                  engagement metrics increased significantly after the
                  redesign."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/testimonial-promo-2.jpg"
                      alt="Testimonial author"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Emma Rodriguez</p>
                    <p className="text-sm text-gray-500">
                      Marketing Manager, Blend Cafe
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl relative">
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
                  "The new product packaging design has transformed our shelf
                  presence. Customers now pick up our products simply because
                  they look so distinctive compared to competitors."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/testimonial-promo-3.jpg"
                      alt="Testimonial author"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Daniel Chen</p>
                    <p className="text-sm text-gray-500">
                      Founder, Natural Essentials
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
          name: "Flyer & Promotional Design Inquiry",
        }}
        buttonText="Contact Our Designer"
      />
    </div>
  );
}
