'use client';

import { useState, useEffect } from 'react';
import { productService, categoryService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useStore } from '@/lib/mock-data';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [stockFilter, setStockFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
        setIsLoaded(true);
      } catch (error) {
        setError(error);
        setIsLoaded(true);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Ensure products are unique by id
    const uniqueProducts = Array.from(
      new Map(products.map(product => [product.id, product])).values()
    );

    let result = uniqueProducts;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter

    console.log({ selectedCategory });
    if (selectedCategory !== 'All') {
      result = result.filter(
        product => product.categoryId === selectedCategory
      );

      console.log({ result });
    }

    // Apply price range filter
    result = result.filter(
      product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply stock filter
    if (stockFilter === 'In Stock') {
      result = result.filter(product => product.stock > 0);
    } else if (stockFilter === 'Out of Stock') {
      result = result.filter(product => product.stock === 0);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'newest')
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      return 0;
    });

    setFilteredProducts(result);
    setIsLoaded(true);
  }, [products, searchTerm, selectedCategory, priceRange, stockFilter, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block mb-2 text-sm font-medium">Category</label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="relative z-50 bg-white border border-gray-300 rounded-md shadow-sm">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="All">All</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Price Range
            </label>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-2"
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Stock</label>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Stock status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {error ? (
        <p>Error: {error.message}</p>
      ) : !isLoaded ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              className="overflow-hidden flex flex-col h-full">
              <Link href={`/products/${product.id}`} className="flex-grow">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <div className="flex justify-between w-full items-center mb-2">
                    <h3 className="font-semibold text-[#312f2f]">
                      {product.name}
                    </h3>
                    <span className="text-[#ba8a5b] font-medium">
                      ₱{product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-[#6a717d] mb-2">
                    {product.category}
                  </p>
                  <div className="flex justify-between w-full items-center">
                    <Badge
                      variant={product.stock > 0 ? 'default' : 'destructive'}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                    <span className="text-sm text-[#6a717d]">
                      Stock: {product.stock}
                    </span>
                  </div>
                </CardFooter>
              </Link>
              <Button
                className="w-full bg-[#ba8a5b] hover:bg-[#a67b4d] text-white mt-auto"
                onClick={() =>
                  useStore
                    .getState()
                    .addToCart(
                      product.id,
                      1,
                      product.colors?.[0]?.name ?? '',
                      product.sizes?.[0]?.name ?? ''
                    )
                }
                disabled={product.stock === 0}>
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
