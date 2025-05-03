// app/logo-design/page.tsx
"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppOrderButton } from "@/components/whatsapp-order";
import { CallToAction } from "@/components/call-to-action";

export default function LogoDesignPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <Image
            src="/logo-design-bg.jpg"
            alt="Logo design background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Logo & Brand Design
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Distinctive visual identities crafted to capture your brand's
              essence and connect with your audience.
            </p>
            <WhatsAppOrderButton
              product={{
                name: "Logo & Brand Design Inquiry",
                price: "",
                color: "",
                size: "",
              }}
              buttonText="Discuss Your Brand Vision"
            />
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Design Approach</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  We believe that a powerful logo is more than just a pretty
                  symbol—it's the visual cornerstone of your brand's identity.
                  Our approach combines artistic vision with strategic thinking
                  to create designs that are both visually striking and
                  meaningful.
                </p>
                <p className="mt-4">
                  Each logo design process begins with understanding your
                  brand's story, values, and audience. We explore visual
                  directions that align with your vision while ensuring your
                  logo stands out in your competitive landscape.
                </p>
                <ul className="mt-4 space-y-2">
                  <li>Strategic brand analysis</li>
                  <li>Unique, custom-crafted designs</li>
                  <li>Multiple concept options</li>
                  <li>Comprehensive revisions</li>
                  <li>Delivery in all required formats</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/logo-process.jpg"
                alt="Logo design process"
                width={600}
                height={450}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Branding Services
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Comprehensive branding solutions to establish a cohesive visual
            identity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-square relative overflow-hidden bg-indigo-50">
                <Image
                  src="/logo-design-service.jpg"
                  alt="Logo Design"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Logo Design</h3>
                <p className="text-gray-600 mb-4">
                  Custom-crafted logos that capture your brand's essence and
                  create instant recognition. Includes multiple concepts and
                  formats for all applications.
                </p>
                <p className="text-indigo-600 font-medium">
                  Starting from $299
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-square relative overflow-hidden bg-indigo-50">
                <Image
                  src="/brand-identity-service.jpg"
                  alt="Brand Identity"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  Brand Identity Package
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete visual identity including logo, color palette,
                  typography, and brand guidelines to ensure consistent
                  application across all touchpoints.
                </p>
                <p className="text-indigo-600 font-medium">
                  Starting from $699
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-square relative overflow-hidden bg-indigo-50">
                <Image
                  src="/brand-collateral-service.jpg"
                  alt="Brand Collateral"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Brand Collateral</h3>
                <p className="text-gray-600 mb-4">
                  Design for business cards, letterheads, social media assets,
                  and other essential materials that extend your brand presence
                  consistently.
                </p>
                <p className="text-indigo-600 font-medium">
                  Custom pricing based on needs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Logo Design Portfolio
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            A selection of our recent logo and brand identity projects.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="aspect-square relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <Image
                  src={`/logo-portfolio-${item}.jpg`}
                  alt={`Logo design example ${item}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-medium">
                      Client Project {item}
                    </h3>
                    <p className="text-sm opacity-80">Brand Identity Design</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Logo Design Process
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            A collaborative approach to creating a logo that perfectly
            represents your brand.
          </p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2"></div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-3 text-indigo-600">
                      1. Discovery
                    </h3>
                    <p className="text-gray-600">
                      We begin with a detailed conversation about your brand,
                      values, audience, and goals. This foundation ensures your
                      logo will authentically represent your business.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-indigo-600 border-4 border-indigo-100 transform -translate-x-1/2"></div>
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1 hidden md:block"></div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-indigo-600 border-4 border-indigo-100 transform -translate-x-1/2"></div>
                <div className="md:w-1/2 md:pl-12 order-2 md:order-2">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-3 text-indigo-600">
                      2. Research & Concepts
                    </h3>
                    <p className="text-gray-600">
                      We conduct market research and develop multiple unique
                      concept directions based on your brand's positioning and
                      visual preferences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-3 text-indigo-600">
                      3. Refinement
                    </h3>
                    <p className="text-gray-600">
                      Based on your feedback, we refine the chosen concept,
                      perfecting every detail until the logo precisely captures
                      your vision.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-indigo-600 border-4 border-indigo-100 transform -translate-x-1/2"></div>
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0"></div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1 hidden md:block"></div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-indigo-600 border-4 border-indigo-100 transform -translate-x-1/2"></div>
                <div className="md:w-1/2 md:pl-12 order-2 md:order-2">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-3 text-indigo-600">
                      4. Finalization & Delivery
                    </h3>
                    <p className="text-gray-600">
                      We deliver your finalized logo in all necessary formats
                      for both digital and print applications, along with brand
                      guidelines for consistent implementation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Client Testimonials
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            What our clients say about our logo and brand design services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  "The logo design process was exceptional. The designer truly
                  understood our brand vision and created a logo that perfectly
                  captures our company's essence. We've received countless
                  compliments on our new visual identity."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/testimonial-logo-1.jpg"
                      alt="Testimonial author"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">
                      CEO, Elevation Startups
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
                </svg>
                <div>
                  <p className="font-medium">David Rodriguez</p>
                  <p className="text-sm text-gray-500">
                    Marketing Director, Fusion Foods
                  </p>
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
          name: "Logo Design Inquiry",
        }}
        buttonText="Contact Our Designer"
      />
    </div>
  );
}
