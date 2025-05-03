'use client';

import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ProductWithDesign } from '@/lib/types';
import { RotateCcw, ZoomIn, ZoomOut, Move, Save, Undo, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface DesignPlacementSelectorProps {
  product: ProductWithDesign;
  selectedColor: string;
  selectedPlacement: string;
  onClose: () => void;
}

export function DesignPlacementSelector({
  product,
  selectedColor,
  selectedPlacement,
  onClose
}: DesignPlacementSelectorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState(selectedPlacement.toLowerCase().replace(' ', '-'));
  const [history, setHistory] = useState<Array<{
    scale: number;
    rotation: number;
    position: { x: number, y: number }
  }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Add to history
  const addToHistory = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    let designImage: fabric.Object | undefined;
    
    canvas.getObjects().forEach(obj => {
      if (obj.selectable) {
        designImage = obj;
      }
    });
    
    if (!designImage) return;
    
    const newHistory = historyIndex >= 0 
      ? history.slice(0, historyIndex + 1) 
      : [];
    
    newHistory.push({
      scale: designImage.scaleX || 1,
      rotation: designImage.angle || 0,
      position: { 
        x: designImage.left || 0, 
        y: designImage.top || 0 
      }
    });
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo last action
  const handleUndo = () => {
    if (historyIndex <= 0 || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    let designImage: fabric.Object | undefined;
    
    canvas.getObjects().forEach(obj => {
      if (obj.selectable) {
        designImage = obj;
      }
    });
    
    if (!designImage) return;
    
    const prevState = history[historyIndex - 1];
    
    designImage.set({
      scaleX: prevState.scale,
      scaleY: prevState.scale,
      angle: prevState.rotation,
      left: prevState.position.x,
      top: prevState.position.y
    });
    
    canvas.renderAll();
    setScale(prevState.scale);
    setRotation(prevState.rotation);
    setHistoryIndex(historyIndex - 1);
  };

  // Initialize canvas and load images
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const container = canvasRef.current.parentElement;
    const containerWidth = container?.clientWidth || 500;
    const containerHeight = container?.clientHeight || 600;
    
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: containerWidth,
      height: containerHeight,
      backgroundColor: '#f9fafb',
      preserveObjectStacking: true
    });
    
    fabricCanvasRef.current = canvas;

    // Define printable area
    const printableWidth = Math.min(containerWidth * 0.7, 300);
    const printableHeight = Math.min(containerHeight * 0.7, 400);
    
    const printableArea = new fabric.Rect({
      width: printableWidth,
      height: printableHeight,
      left: containerWidth / 2 - printableWidth / 2,
      top: containerHeight / 2 - printableHeight / 2,
      fill: 'rgba(173, 216, 230, 0.2)',
      stroke: 'rgba(0, 0, 255, 0.5)',
      strokeDashArray: [5, 5],
      selectable: false,
      strokeWidth: 2
    });
    canvas.add(printableArea);

    // Add center guidelines
    const horizontalLine = new fabric.Line([
      0, containerHeight / 2, 
      containerWidth, containerHeight / 2
    ], {
      stroke: 'rgba(0, 0, 255, 0.2)',
      selectable: false
    });
    
    const verticalLine = new fabric.Line([
      containerWidth / 2, 0, 
      containerWidth / 2, containerHeight
    ], {
      stroke: 'rgba(0, 0, 255, 0.2)',
      selectable: false
    });
    
    canvas.add(horizontalLine, verticalLine);

    // Get the right product image based on tab
    const productImageSrc = activeTab === 'front' 
      ? product.images[0] 
      : (activeTab === 'back' 
          ? (product.images[1] || product.images[0]) 
          : product.images[0]);

    // Log the URLs for debugging
    console.log('Product Image URL:', productImageSrc);
    console.log('Design Image URL:', product.designImage);

    // Load product image with error handling
    fabric.FabricImage.fromURL(
      productImageSrc,
      { crossOrigin: 'anonymous' }
    ).then((img: fabric.FabricImage) => {
        // Apply color tint if needed
        if (selectedColor && selectedColor.toLowerCase() !== 'white') {
          if (!img.filters) {
            img.filters = [];
          }
          
          img.filters.push(new fabric.filters.BlendColor({
            color: getColorHex(selectedColor),
            mode: 'tint',
            alpha: 0.2
          }));
          
          img.applyFilters();
        }
        
        // Size product image to fit canvas
        const scaleFactor = Math.min(
          containerWidth / (img.width || 1), 
          containerHeight / (img.height || 1)
        ) * 0.9;
        
        img.scale(scaleFactor);
        img.set({
          left: containerWidth / 2,
          top: containerHeight / 2,
          originX: 'center',
          originY: 'center',
          selectable: false
        });
        
        canvas.add(img);
        
        // Send to back
        canvas.sendObjectToBack(img);
        
        // Load design image with error handling
        fabric.FabricImage.fromURL(
          product.designImage,
          {
            crossOrigin: 'anonymous'
          }
        ).then((designImg: fabric.FabricImage) => {
          // Set up design image for manipulation
          designImg.set({
            left: containerWidth / 2,
            top: containerHeight / 2,
            originX: 'center',
            originY: 'center',
            cornerColor: '#4F46E5',
            cornerSize: 12,
            transparentCorners: false,
            borderColor: '#4F46E5',
            cornerStyle: 'circle',
            centeredScaling: true,
            lockUniScaling: true // Keep aspect ratio
          });
          
          // Scale design to fit printable area
          const designScale = Math.min(
            (printableWidth * 0.6) / (designImg.width || 1),
            (printableHeight * 0.6) / (designImg.height || 1)
          );
          
          designImg.scale(designScale);
          
          // Store initial scale for reference
          setScale(designScale);
          
          // Add design to canvas
          canvas.add(designImg);
          canvas.setActiveObject(designImg);
          canvas.renderAll();
          
          // Loading complete
          setIsLoading(false);
          
          // Add initial state to history
          setTimeout(() => {
            addToHistory();
          }, 0);
          
          setIsLoading(false);
        }).catch((err: Error) => {
          console.error('Error loading design image:', err);
          toast.error('Failed to load design image. Please try again.');
          setIsLoading(false);
        });
    }).catch((err: Error) => {
      console.error('Error loading product image:', err);
      toast.error('Failed to load product image. Please try again.');
      setIsLoading(false);
    });
    
    // Set up event listeners for object modifications
    canvas.on('object:modified', function() {
      let activeObject = canvas.getActiveObject();
      if (activeObject) {
        setScale(activeObject.scaleX || 1);
        setRotation(activeObject.angle || 0);
        addToHistory();
      }
    });
    
    // Update scale/rotation display during interactions
    canvas.on('object:scaling', function() {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        setScale(activeObject.scaleX || 1);
      }
    });
    
    canvas.on('object:rotating', function() {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        setRotation(activeObject.angle || 0);
      }
    });

    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      canvas.setWidth(newWidth);
      canvas.setHeight(newHeight);
      
      // Recenter objects
      const objects = canvas.getObjects();
      const centerX = newWidth / 2;
      const centerY = newHeight / 2;
      
      objects.forEach(obj => {
        if (!obj.selectable) {
          // For non-selectable objects (background, guides), recalculate position
          if (obj instanceof fabric.Rect && obj.stroke === 'rgba(0, 0, 255, 0.5)') {
            // Printable area
            const newPrintableWidth = Math.min(newWidth * 0.7, 300);
            const newPrintableHeight = Math.min(newHeight * 0.7, 400);
            
            obj.set({
              width: newPrintableWidth,
              height: newPrintableHeight,
              left: centerX - newPrintableWidth / 2,
              top: centerY - newPrintableHeight / 2
            });
          } else if (obj instanceof fabric.Line) {
            // Guidelines
            if (obj.x1 === obj.x2) {
              // Vertical line
              obj.set({
                x1: centerX,
                x2: centerX,
                y1: 0,
                y2: newHeight
              });
            } else {
              // Horizontal line
              obj.set({
                x1: 0,
                x2: newWidth,
                y1: centerY,
                y2: centerY
              });
            }
          } else if (obj instanceof fabric.FabricImage) {
            // Product image - center it
            obj.set({
              left: centerX,
              top: centerY
            });
          }
        }
      });
      
      canvas.renderAll();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, [product, activeTab, selectedColor]);

  // Handle tab change
  useEffect(() => {
    const newTab = selectedPlacement.toLowerCase().replace(' ', '-');
    if (activeTab !== newTab) {
      setActiveTab(newTab);
      
      // Reset canvas with new product image when tab changes
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        setIsLoading(true);
      }
    }
  }, [selectedPlacement, activeTab]);

  // Scale handling
  const handleScaleChange = (newScale: number) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();
    
    if (!activeObject) return;
    
    activeObject.scale(newScale);
    canvas.renderAll();
    setScale(newScale);
  };

  // Rotation handling
  const handleRotationChange = (newRotation: number) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();
    
    if (!activeObject) return;
    
    activeObject.set({ angle: newRotation });
    canvas.renderAll();
    setRotation(newRotation);
  };

  // Reset design position and scale
  const handleReset = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();
    
    if (!activeObject) return;
    
    // Get canvas dimensions
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    
    // Reset to center with default scale
    activeObject.set({
      left: width / 2,
      top: height / 2,
      originX: 'center',
      originY: 'center',
      scaleX: 1,
      scaleY: 1,
      angle: 0
    });
    
    canvas.renderAll();
    setScale(1);
    setRotation(0);
    addToHistory();
  };

  // Center design
  const handleCenterDesign = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();
    
    if (!activeObject) return;
    
    // Get canvas dimensions
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    
    // Center the design
    activeObject.set({
      left: width / 2,
      top: height / 2,
      originX: 'center',
      originY: 'center'
    });
    
    canvas.renderAll();
    addToHistory();
  };

  // Adjust scale with buttons
  const handleZoomIn = () => {
    const newScale = Math.min(scale + 0.1, 2);
    handleScaleChange(newScale);
  };
  
  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.1, 0.5);
    handleScaleChange(newScale);
  };

  // Rotate with buttons
  const handleRotateLeft = () => {
    const newRotation = (rotation - 15 + 360) % 360;
    handleRotationChange(newRotation);
  };
  
  const handleRotateRight = () => {
    const newRotation = (rotation + 15) % 360;
    handleRotationChange(newRotation);
  };

  // Save changes
  const handleSave = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();
    
    if (!activeObject) return;
    
    const placementData = {
      placement: activeTab,
      scale: activeObject.scaleX || 1,
      rotation: activeObject.angle || 0,
      position: {
        x: activeObject.left || 0,
        y: activeObject.top || 0
      }
    };
    
    console.log('Placement data:', placementData);
    
    toast.success(`Design placement saved for ${activeTab} side!`);
    onClose();
  };

  // Get color hex code from color name
  function getColorHex(colorName: string): string {
    const colorMap: {[key: string]: string} = {
      'white': '#ffffff',
      'black': '#000000',
      'navy': '#001f3f',
      'gray': '#808080',
      'maroon': '#800000',
      'forest green': '#228b22',
      'vintage blue': '#6699cc',
      'faded red': '#e74c3c'
    };
    
    return colorMap[colorName.toLowerCase()] || '#dddddd';
  }

  return (
    <Card className="w-full shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white flex justify-between items-center">
        <CardTitle className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20v-6M6 20V10M18 20V4"></path>
          </svg>
          Customize Design Placement
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="front">Front</TabsTrigger>
            <TabsTrigger value="back">Back</TabsTrigger>
            <TabsTrigger value="both-sides">Both Sides</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            {/* Canvas Container */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden w-full" style={{ minHeight: "400px" }}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              )}
              
              <div className="w-full h-full" style={{ minHeight: '400px' }}>
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
            </div>
            
            {/* Controls and Preview */}
            <div className="flex flex-col">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold mb-2">Preview: {product.designName} on {product.name}</h3>
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <Image 
                    src={activeTab === 'front' ? product.images[0] : (
                      activeTab === 'back' ? (product.images[1] || product.images[0]) : product.images[0]
                    )}
                    alt={`${product.name} ${activeTab} view`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Selected Color: <span className="font-medium">{selectedColor}</span></p>
                  <p>Selected Placement: <span className="font-medium">{selectedPlacement}</span></p>
                </div>
              </div>
              
              {/* Scale and Rotation Controls */}
              <div className="space-y-4 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <ZoomIn className="h-4 w-4 mr-1" /> Zoom: {scale.toFixed(2)}x
                    </label>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={handleZoomOut}
                        title="Zoom out"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={handleZoomIn}
                        title="Zoom in"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.01"
                    value={scale}
                    onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                    className="w-full"
                    aria-label="Adjust design scale"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <RotateCcw className="h-4 w-4 mr-1" /> Rotation: {Math.round(rotation)}°
                    </label>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={handleRotateLeft}
                        title="Rotate left"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 2V8H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 8C7.5 3.5 14.5 3.5 19 8C23.5 12.5 23.5 19.5 19 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={handleRotateRight}
                        title="Rotate right"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 2V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 8C16.5 3.5 9.5 3.5 5 8C0.5 12.5 0.5 19.5 5 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={rotation}
                    onChange={(e) => handleRotationChange(parseFloat(e.target.value))}
                    className="w-full"
                    aria-label="Adjust design rotation"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-1"
                  title="Reset all changes"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCenterDesign}
                  className="flex items-center gap-1"
                  title="Center the design"
                >
                  <Move className="h-4 w-4" /> Center
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="flex items-center gap-1"
                  title="Undo last change"
                >
                  <Undo className="h-4 w-4" /> Undo
                </Button>
              </div>
              
              <Button
                onClick={handleSave}
                className="w-full bg-indigo-600 hover:bg-indigo-700 mt-auto"
                size="lg"
              >
                <Save className="h-4 w-4 mr-2" /> Save Placement
              </Button>
            </div>
          </div>
          
          {/* Quick Tips */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-2 font-medium">Quick Tips:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-500">
              <div className="flex items-start">
                <span className="inline-flex w-5 h-5 bg-gray-100 rounded-full items-center justify-center mr-2 flex-shrink-0">
                  <span className="transform scale-75">↔</span>
                </span>
                <span>Drag to position</span>
              </div>
              <div className="flex items-start">
                <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="transform scale-75">⟲</span>
                </span>
                <span>Rotate from corners</span>
              </div>
              <div className="flex items-start">
                <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="transform scale-75">↕</span>
                </span>
                <span>Resize from corners</span>
              </div>
              <div className="flex items-start">
                <span className="inline-flex w-5 h-5 bg-gray-100 rounded-full items-center justify-center mr-2 flex-shrink-0">
                  <span className="transform scale-75">⟻</span>
                </span>
                <span>Undo changes</span>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
