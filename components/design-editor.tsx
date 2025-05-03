// components/design-editor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ProductWithDesign } from '@/lib/types';

interface DesignEditorProps {
  product: ProductWithDesign;
  onSave: (editedDesignImage: string) => void;
}

export function DesignEditor({ product, onSave }: DesignEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Initialize canvas and load images
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: '#f9fafb'
    });
    fabricCanvasRef.current = canvas;

    // Define printable area
    const printableArea = new fabric.Rect({
      width: 300,
      height: 400,
      left: 100,
      top: 100,
      fill: 'rgba(173, 216, 230, 0.2)',
      stroke: 'rgba(0, 0, 255, 0.5)',
      strokeDashArray: [5, 5],
      selectable: false,
      strokeWidth: 2
    });
    canvas.add(printableArea);

    // Load product image
    fabric.util.loadImage(product.images[0], { crossOrigin: 'anonymous' })
      .then((img: HTMLImageElement) => {
        if (!img) {
          console.error('Failed to load product image');
          return;
        }
        
        // Create fabric image
        const fabricImage = new fabric.Image(img, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false
        });
        
        fabricImage.scaleToWidth(500);
        canvas.add(fabricImage);
        
        // Set to back layer
        canvas.sendObjectToBack(fabricImage);
        canvas.renderAll();
        
        // Load design image after product image
        return fabric.util.loadImage(product.designImage, { crossOrigin: 'anonymous' });
      })
      .then((designImg: HTMLImageElement | undefined) => {
        if (!designImg) {
          console.error('Failed to load design image');
          setIsLoading(false);
          return;
        }
        
        // Create fabric design image
        const fabricDesignImage = new fabric.Image(designImg, {
          originX: 'center',
          originY: 'center',
          cornerColor: '#2563eb',
          cornerSize: 12,
          transparentCorners: false,
          borderColor: '#2563eb',
          centeredScaling: true
        });
        
        // Scale to fit within printable area
        const printableWidth = printableArea.width!;
        const printableHeight = printableArea.height!;
        const designWidth = fabricDesignImage.width!;
        const designHeight = fabricDesignImage.height!;
        const scaleFactor = Math.min(
          printableWidth / designWidth,
          printableHeight / designHeight
        ) * 0.8;
        
        fabricDesignImage.scale(scaleFactor);
        fabricDesignImage.set({
          left: printableArea.left! + printableWidth / 2,
          top: printableArea.top! + printableHeight / 2,
        });
        
        canvas.add(fabricDesignImage);
        canvas.setActiveObject(fabricDesignImage);
        
        // Store the design image reference for later use
        (canvas as any).designImage = fabricDesignImage;
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
        setIsLoading(false);
      });

    // Clean up on unmount
    return () => {
      canvas.dispose();
    };
  }, [product]);

  // Handle design scaling
  const handleScaleChange = (newScale: number) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const designImage = (canvas as any).designImage as fabric.Image;
    if (!designImage) return;

    setScale(newScale);
    designImage.scale(newScale);
    canvas.renderAll();
  };

  // Handle design rotation
  const handleRotationChange = (newRotation: number) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const designImage = (canvas as any).designImage as fabric.Image;
    if (!designImage) return;

    setRotation(newRotation);
    designImage.rotate(newRotation);
    canvas.renderAll();
  };

  // Save the edited design
  const handleSave = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    
    // Hide guides temporarily for clean output
    const printableAreaObjects = canvas.getObjects().filter(
      (obj: fabric.Object) => obj.stroke === 'rgba(0, 0, 255, 0.5)'
    );
    printableAreaObjects.forEach((obj: fabric.Object) => obj.set({ visible: false }));
    canvas.renderAll();

    // Get canvas as image (with correct type for toDataURL options)
    const editedDesignImage = canvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 1
    });

    // Show guides again
    printableAreaObjects.forEach((obj: fabric.Object) => obj.set({ visible: true }));
    canvas.renderAll();

    // Pass the edited image back
    onSave(editedDesignImage);
    toast.success("Design saved successfully");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium mb-4">Adjust Your Design</h3>
      
      <div className="relative mb-6 border rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}
        <canvas ref={canvasRef} />
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scale: {scale.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
            className="w-full"
            aria-label="Adjust design scale"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rotation: {rotation}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="5"
            value={rotation}
            onChange={(e) => handleRotationChange(parseFloat(e.target.value))}
            className="w-full"
            aria-label="Adjust design rotation"
          />
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button
          onClick={() => {
            if (!fabricCanvasRef.current) return;
            
            const canvas = fabricCanvasRef.current;
            const designImage = (canvas as any).designImage as fabric.Image;
            if (!designImage) return;
            
            designImage.set({
              left: canvas.getWidth() / 2,
              top: canvas.getHeight() / 2,
              originX: 'center',
              originY: 'center'
            });
            canvas.renderAll();
          }}
          variant="outline"
        >
          Center Design
        </Button>
        
        <Button 
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Save Design
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Drag, resize, and rotate your design within the blue printable area.
        The design will be printed exactly as positioned here.
      </p>
    </div>
  );
}
