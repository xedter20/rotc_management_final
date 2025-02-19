'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/mock-data';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';

import { Card } from '@/components/ui/card';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Save,
  DollarSign
} from 'lucide-react';
import { productService } from '@/services/api';
import { fabric } from 'fabric'; // Ensure you're using Fabric.js v6

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const products = useStore(state => state.products);
  const currentUser = useStore(state => state.currentUser);
  const addToCart = useStore(state => state.addToCart);
  const addToWishlist = useStore(state => state.addToWishlist);
  const addReview = useStore(state => state.addReview);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modifiedImageUrl, setModifiedImageUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const originalImageRef = useRef<HTMLImageElement | null>(null);

  const thumbnails = product?.images || []; // Assuming product has an images array

  const canvasRef = useRef(null); // Reference to the Fabric.js canvas
  const [canvas, setCanvas] = useState(null); // State to store the Fabric.js canvas instance
  const [basket, setBasket] = useState(null); // State to store the basket image object

  const [tshirt, setTshirt] = useState(null); // Store the T-shirt image object

  const [mainImage, setMainImage] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getProduct(params.id);

        // Mock values for demonstration
        const mockCategories = [
          { id: '1', name: 'Living Room' },
          { id: '2', name: 'Bedroom' },
          { id: '3', name: 'Office' }
        ];

        const mockWoodTypes = [
          { id: '1', label: 'Oak' },
          { id: '2', label: 'Pine' },
          { id: '3', label: 'Walnut' }
        ];

        const mockDimensions = [100, 200]; // Width and Height
        const mockColors = [
          { id: '1', value: '#D1D1D1' }, // Light Gray
          { id: '2', value: '#F4D3D3' }, // Light Pink
          { id: '3', value: '#FF6F61' }, // Coral
          { id: '4', value: '#C19A6B' }, // Tan
          { id: '5', value: '#4B4B4B' } // Dark Gray
        ];

        const mockThumbnails = [
          '/images/thumb1.jpg',
          '/images/thumb2.jpg',
          '/images/thumb3.jpg'
        ];

        // Set product with mock values if fetchedProduct is not available
        setProduct({
          ...fetchedProduct,
          categories: mockCategories,
          woodTypes: mockWoodTypes,
          dimensions: mockDimensions,
          colors: mockColors,
          images: mockThumbnails,

          id: params.id,
          price: 299.99, // Example price
          category: mockCategories[0].id,
          woodType: mockWoodTypes[0].id
        });

        if (fetchedProduct) {
          setSelectedColor(
            fetchedProduct.colors?.length > 0
              ? fetchedProduct.colors[0]?.id
              : ''
          ); // Set default color
          setWidth(
            fetchedProduct.dimensions?.length > 0
              ? fetchedProduct.dimensions[0]
              : 0
          ); // Set default width
          setHeight(
            fetchedProduct.dimensions?.length > 0
              ? fetchedProduct.dimensions[0]
              : 0
          ); // Set default height
        }

        console.log({ fetchedProduct });

        setCurrentImageIndex(fetchedProduct.image);
        setModifiedImageUrl(fetchedProduct.image);
        setMainImage(fetchedProduct.image);
        setIsLoaded(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Initialize Fabric.js Canvas
  useEffect(() => {
    // Wait for the canvas element to exist in the DOM
    if (typeof document !== 'undefined') {
      // Function to resize the canvas to match the container size
      const fabricCanvas = new fabric.Canvas('tshirtCanvas');
      setCanvas(fabricCanvas);
      const resizeCanvas = () => {
        const container = canvasRef.current;

        if (!container) return;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Set the dimensions of the Fabric.js canvas
        fabricCanvas.setDimensions({
          width: containerWidth,
          height: containerHeight
        });

        // Log the current canvas width and height
        console.log(
          `Canvas Width: ${containerWidth}, Canvas Height: ${containerHeight}`
        );
      };

      // Initial resize on load
      resizeCanvas();
      // Resize the canvas when the window size changes
      window.addEventListener('resize', resizeCanvas);

      fabric.Image.fromURL(
        mainImage,
        img => {
          console.log({ img });
          img.crossOrigin = 'anonymous'; // Important to avoid CORS issues

          // Set custom size for the image
          const customWidth = 400; // Set your desired width
          const customHeight = 500; // Set your desired height

          // Scale the image to the custom size
          img.scaleToWidth(customWidth);
          img.scaleToHeight(customHeight);

          // Center the image on the canvas
          img.set({
            left: (fabricCanvas.width - img.width * img.scaleX) / 2,
            top: 0
          });

          fabricCanvas.add(img);
          setTshirt(img); // Store the T-shirt image object
          fabricCanvas.renderAll(); // Render the canvas to reflect changes
        },
        { crossOrigin: 'anonymous' }
      );

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        fabricCanvas.dispose(); // Dispose Fabric.js instance
      };
    }
  }, [mainImage]);
  // Function to change T-shirt color using a filter

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % thumbnails.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      prev => (prev - 1 + thumbnails.length) % thumbnails.length
    );
  };

  const handleColorChange = color => {
    // Set the selected color
    setSelectedColor(color);

    // If there's a T-shirt image, set its background color
    if (tshirt) {
      console.log({ color });
      tshirt.filters = [
        new fabric.Image.filters.BlendColor({
          color: color,
          mode: 'multiply', // You can experiment with other blend modes like 'add', 'subtract'
          alpha: 0.5 // Adjust transparency (0.0 to 1.0)
        })
      ];
      tshirt.applyFilters(); // Apply the filter
      canvas.renderAll(); // Re-render canvas to display the new color
    }
  };
  return (
    isLoaded && (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-6">CUSTOMIZE DESIGN</h1>
        <Card className="p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Product Preview */}
            <div className="space-y-4">
              <div className="aspect-square relative bg-white rounded-lg overflow-hidden border">
                {/* {modifiedImageUrl ? (
                  <Image
                    src={modifiedImageUrl || '/placeholder.svg'}
                    alt="Product Preview"
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    Loading...
                  </div>
                )} */}
                <div className="w-full h-screen flex flex-col items-center">
                  {/* Canvas Container */}
                  <div ref={canvasRef} className="w-full h-full">
                    <canvas
                      id="tshirtCanvas"
                      className="w-full h-full"></canvas>
                  </div>
                </div>
              </div>
              {/* <div className="text-center text-lg font-medium">OR</div>
              <Button
                variant="secondary"
                className="w-full bg-[#C4A484] text-white hover:bg-[#B08968]">
                Upload Images
              </Button> */}
            </div>

            {/* Right side - Customization Options */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">
                  FURNITURE DESIGN DETAILS
                </h2>

                <div className="space-y-4">
                  {/* Category Dropdown */}
                  <div>
                    <label className="text-sm text-gray-600">Category</label>
                    <Select defaultValue={product.category}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Wood Type Dropdown */}
                  <div>
                    <label className="text-sm text-gray-600">Wood</label>
                    <Select defaultValue={product.woodType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select wood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.woodTypes.map(wood => (
                          <SelectItem key={wood.id} value={wood.id}>
                            {wood.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Width</label>
                      <Select
                        value={width.toString()}
                        onValueChange={value => {
                          if (value) setWidth(Number(value));
                        }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select width" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.dimensions.map(d => (
                            <SelectItem key={d} value={d.toString()}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Height</label>
                      <Select
                        value={height.toString()}
                        onValueChange={value => {
                          if (value) setHeight(Number(value));
                        }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select height" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.dimensions.map(d => (
                            <SelectItem key={d} value={d.toString()}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">
                      Color
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={previousImage}
                        className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex gap-2">
                        {product.colors.map(color => (
                          <button
                            key={color.id}
                            onClick={() => handleColorChange(color.value)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              selectedColor === color.id
                                ? 'border-[#C4A484] scale-110'
                                : 'border-gray-200 hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.value }}
                            aria-label={`Select ${color.id} color`}
                          />
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextImage}
                        className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Additional Design */}
                  <div>
                    <label className="text-sm text-gray-600">
                      Additional Design
                    </label>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Carve</label>
                      <Input placeholder="Input your carve details" />
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={previousImage}
                      className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex gap-2 overflow-hidden">
                      {thumbnails.map((src, index) => (
                        <div
                          key={index}
                          className={`w-16 h-16 border rounded-lg overflow-hidden ${
                            currentImageIndex === index
                              ? 'border-[#C4A484]'
                              : 'border-gray-200'
                          }`}>
                          <Image
                            src={src || '/placeholder.svg'}
                            alt={`Thumbnail ${index + 1}`}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextImage}
                      className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Price */}
                  <div className="text-xl font-semibold">
                    Price:{' '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2
                    }).format(product.price)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-[#C4A484] hover:bg-[#B08968] text-white shadow-md">
                      <Save className="mr-2" /> Save Design
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-white shadow-md">
                      <ShoppingCart className="mr-2" /> Add to Cart
                    </Button>
                    <Button className="flex-1 bg-[#C4A484] hover:bg-[#B08968] text-white shadow-md">
                      <DollarSign className="mr-2" /> Buy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
}
