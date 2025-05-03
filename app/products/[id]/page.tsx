// app/products/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { getProductWithDesignById } from "@/lib/products-with-designs";
import { getCollectionById, getDesignById } from "@/lib/designer-data";
import { WhatsAppOrderButton } from "@/components/whatsapp-order";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { DesignPlacementSelector } from "@/components/design-placement-selector";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [collection, setCollection] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState("Front");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [designImage, setDesignImage] = useState("");
  const [showPlacementEditor, setShowPlacementEditor] = useState(false);

  useEffect(() => {
    if (params.id) {
      const productData = getProductWithDesignById(params.id as string);
      if (productData) {
        setProduct(productData);
        setSelectedSize(productData.sizes[0]);
        setSelectedColor(productData.colors[0]);
        // Set the design image
        setDesignImage(productData.designImage);

        // Get collection info if available
        const design = getDesignById(productData.designId);
        if (design) {
          const collectionData = getCollectionById(design.collectionId);
          setCollection(collectionData);
        }
      }
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <h2 className="text-xl font-medium text-gray-800">
            Loading product details...
          </h2>
        </div>
      </div>
    );
  }

  const formattedPrice = `$${product.price.toFixed(2)}`;

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    toast.success(`Size ${size} selected`);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    toast.success(`Color ${color} selected`);
  };

  const handlePlacementChange = (placement: string) => {
    setSelectedPlacement(placement);
    toast.success(`${placement} placement selected`);
  };

  // Combine product images with design image
  const displayImages = [designImage, ...product.images];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/products" className="hover:text-indigo-600">
            Products
          </Link>
          <span className="mx-2">/</span>
          {collection && (
            <>
              <Link
                href={`/collections/${collection.id}`}
                className="hover:text-indigo-600"
              >
                {collection.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-gray-900">{product.designName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div className="product-images">
          <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden mb-4">
            <Image
              src={displayImages[activeImageIndex]}
              alt={activeImageIndex === 0 ? product.designName : product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {displayImages.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                title={
                  index === 0
                    ? `View ${product.designName} design`
                    : `View ${product.name} image ${index}`
                }
                aria-label={
                  index === 0
                    ? `View ${product.designName} design`
                    : `View ${product.name} image ${index}`
                }
                className={`w-20 h-20 relative rounded-md overflow-hidden border-2 transition-all ${
                  index === activeImageIndex
                    ? "border-indigo-600 shadow-sm"
                    : "border-transparent hover:border-indigo-300"
                }`}
              >
                <Image
                  src={image}
                  alt={
                    index === 0
                      ? `${product.designName} design`
                      : `${product.name} view ${index}`
                  }
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <Badge className="mb-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </Badge>

          <h1 className="text-3xl font-bold mb-2">{product.designName}</h1>
          <h2 className="text-xl text-gray-700 mb-2">{product.name}</h2>
          <p className="text-2xl font-bold text-indigo-600 mb-4">
            {formattedPrice}
          </p>

          <div className="prose prose-sm max-w-none mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Design Placement Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Design Placement</h3>
            <div className="flex flex-wrap gap-2">
              {["Front", "Back", "Both Sides"].map((placement) => (
                <Button
                  key={placement}
                  onClick={() => handlePlacementChange(placement)}
                  variant={
                    selectedPlacement === placement ? "default" : "outline"
                  }
                  className={
                    selectedPlacement === placement
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : ""
                  }
                  size="sm"
                >
                  {placement}
                </Button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size: string) => (
                <Button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={
                    selectedSize === size
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : ""
                  }
                  size="sm"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color: string) => (
                <Button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  variant={selectedColor === color ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    selectedColor === color
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : ""
                  }`}
                  size="sm"
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "white"
                          ? "#ffffff"
                          : color.toLowerCase() === "black"
                          ? "#000000"
                          : color.toLowerCase() === "navy"
                          ? "#001f3f"
                          : color.toLowerCase() === "gray"
                          ? "#808080"
                          : color.toLowerCase() === "maroon"
                          ? "#800000"
                          : color.toLowerCase() === "forest green"
                          ? "#228b22"
                          : color.toLowerCase() === "vintage blue"
                          ? "#6699cc"
                          : color.toLowerCase() === "faded red"
                          ? "#e74c3c"
                          : "#dddddd",
                    }}
                  />
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              onClick={() => setShowPlacementEditor(!showPlacementEditor)}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              {showPlacementEditor
                ? "Hide Placement Editor"
                : "Customize Design Placement"}
            </Button>

            <WhatsAppOrderButton
              product={{
                name: `${product.designName} ${product.name}`,
                price: formattedPrice,
                color: selectedColor,
                size: selectedSize,
                placement: selectedPlacement,
              }}
            />
          </div>
        </div>
        {showPlacementEditor && (
          <div className="mb-12">
            <DesignPlacementSelector
              product={product}
              selectedColor={selectedColor}
              selectedPlacement={selectedPlacement}
              onClose={() => setShowPlacementEditor(false)}
            />
          </div>
        )}
      </div>

      {/* Additional Product Information */}
      <div className="mt-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-6 py-3"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-6 py-3"
            >
              Shipping & Returns
            </TabsTrigger>
            <TabsTrigger
              value="size"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-6 py-3"
            >
              Size Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Materials & Care</h3>
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">
                      100% premium cotton (t-shirts)
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">
                      80% cotton, 20% polyester (hoodies)
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">Machine washable</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">Tumble dry low</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Do not iron directly on printed design
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">Pre-shrunk fabric</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">
                      High-quality print that won't fade
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Reinforced seams for durability
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Ethically sourced materials
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="pt-6">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold mb-4">
                Shipping Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                <p className="text-gray-700 mb-2">
                  Orders are typically processed within 2-3 business days.
                  Delivery times depend on your location:
                </p>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  </div>
                  <p className="ml-3 text-gray-700">
                    Major cities: 3-5 business days
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  </div>
                  <p className="ml-3 text-gray-700">
                    Other areas: 5-7 business days
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  </div>
                  <p className="ml-3 text-gray-700">
                    International: 7-14 business days
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4 mt-6">Return Policy</h3>
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-gray-700">
                  We accept returns within 30 days of delivery for unused items
                  in their original packaging. Custom designed items cannot be
                  returned unless there is a manufacturing defect.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="size" className="pt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                      Chest (inches)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                      Length (inches)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                      Sleeve (inches)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      XS
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      32-34
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      25-26
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      15-16
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      S
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      34-36
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      26-27
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      16-17
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      M
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      38-40
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      27-28
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      17-18
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      42-44
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      28-29
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      18-19
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      XL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      46-48
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      29-30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      19-20
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      XXL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      50-52
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      30-31
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      20-21
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Add related products here */}
        </div>
      </div>
    </div>
  );
}
