// Modified virtual-try-on.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WhatsAppOrderButton } from '@/components/whatsapp-order';
import { ProductWithDesign } from '@/lib/types';
import { DesignEditor } from '@/components/design-editor';

interface VirtualTryOnProps {
  product: ProductWithDesign;
  selectedColor?: string;
}

export function VirtualTryOn({ product, selectedColor }: VirtualTryOnProps) {
    const [userImage, setUserImage] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('edit'); // Changed default to 'edit'
    const [editedDesignImage, setEditedDesignImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const formattedPrice = `$${product.price.toFixed(2)}`;
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload an image smaller than 5MB"
        });
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setResultImage(null); // Reset result when new image is uploaded
      };
      reader.readAsDataURL(file);
    };
  
    const generateTryOn = async () => {
      if (!userImage) {
        toast.error("Upload required", {
          description: "Please upload your photo first"
        });
        return;
      }
  
      setIsLoading(true);
      
      try {
        // Create the loading toast
        const toastId = toast.loading("Processing your image...");
        
        // Prepare the request body
        const body = {
          modelImage: userImage,
          garmentImage: editedDesignImage || product.designImage, // Use edited design if available
          category: product.category,
          color: selectedColor || product.colors[0]
        };
        
        // Call our API endpoint
        const response = await fetch('/api/try-on', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate try-on image');
        }
        
        const data = await response.json();
        
        // Set the result image and update the UI
        setResultImage(data.resultImageUrl);
        setActiveTab('result');
        
        // Update the loading toast to a success toast
        toast.success("Success!", {
          id: toastId,
          description: "Try-on image generated successfully",
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error", {
          description: error instanceof Error ? error.message : 'Failed to generate try-on image',
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Card className="w-full shadow-md border-0">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.56 10.67l2.29 2.49L8.38 15h7.24l-.47-1.84 2.29-2.49c.42-.46.65-1.06.65-1.67A2.4 2.4 0 0 0 16.4 6h-.8a2.4 2.4 0 0 0-2.4 2.4v.48L12 10l-1.2-.42V8.4A2.4 2.4 0 0 0 8.4 6h-.8A2.4 2.4 0 0 0 5.2 8.4c0 .61.23 1.21.65 1.67z"></path>
              <path d="M12 10v8"></path>
              <path d="M8 18h8"></path>
            </svg>
            Virtual Try-On
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="edit">Edit Design</TabsTrigger>
              <TabsTrigger value="upload">Upload Photo</TabsTrigger>
              <TabsTrigger value="result" disabled={!resultImage}>View Result</TabsTrigger>
            </TabsList>
            
            {/* New Design Editor Tab */}
            <TabsContent value="edit">
              <DesignEditor 
                product={product} 
                onSave={(image) => {
                  setEditedDesignImage(image);
                  setActiveTab('upload');
                }} 
              />
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={() => setActiveTab('upload')}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Continue to Photo Upload
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="upload">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Product Design Image */}
                <div className="product-image">
                  <h3 className="text-sm font-semibold mb-2">Design: {product.designName}</h3>
                  <div className="aspect-[3/4] relative bg-gray-50 rounded-lg overflow-hidden">
                    <Image 
                      src={editedDesignImage || product.designImage} 
                      alt={product.designName}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-sm font-medium">{product.name}</p>
                      <p className="text-white/80 text-xs">{formattedPrice} • {selectedColor || product.colors[0]}</p>
                    </div>
                  </div>
                  {editedDesignImage && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={() => setActiveTab('edit')}
                    >
                      Edit Design Again
                    </Button>
                  )}
                </div>
                
                {/* User Image Upload */}
                <div className="user-image">
                  <h3 className="text-sm font-semibold mb-2">Your Photo</h3>
                  {userImage ? (
                    <div className="aspect-[3/4] relative bg-gray-50 rounded-lg overflow-hidden">
                      <Image 
                        src={userImage}
                        alt="Your photo"
                        fill
                        className="object-cover"
                      />
                      <Button 
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </Button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-[3/4] bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition border-2 border-dashed border-gray-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-3">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                        <circle cx="12" cy="13" r="3"></circle>
                      </svg>
                      <p className="text-sm font-medium text-gray-600">Upload your photo</p>
                      <p className="text-xs text-gray-500 mt-1 max-w-[200px] text-center">
                        For best results, use a well-lit, full-body photo with a neutral background
                      </p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden"
                    aria-label="Upload your photo"
                    title="Upload your photo"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="sr-only">Upload your photo</label>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <Button 
                  onClick={generateTryOn} 
                  disabled={isLoading || !userImage}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : 'Create Virtual Try-On'}
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  By using this feature, you acknowledge that we process your image only to generate the try-on visualization. 
                  Your image is not stored permanently and is automatically deleted after processing.
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="result">
              {resultImage && (
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Original Photo</h3>
                      <div className="aspect-[3/4] relative bg-gray-50 rounded-lg overflow-hidden">
                        <Image 
                          src={userImage!}
                          alt="Your photo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Try-On Result</h3>
                      <div className="aspect-[3/4] relative bg-gray-50 rounded-lg overflow-hidden">
                        <Image 
                          src={resultImage} 
                          alt="Try-on result" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <WhatsAppOrderButton 
                      product={{
                        name: `${product.designName} on ${product.name}`,
                        price: formattedPrice,
                        color: selectedColor || product.colors[0],
                        size: "Please specify size in chat"
                      }} 
                      tryOnImageUrl={resultImage} 
                    />
                    
                    <Button 
                      onClick={() => {
                        setUserImage(null);
                        setResultImage(null);
                        setActiveTab('upload');
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Try Again with a Different Photo
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }
