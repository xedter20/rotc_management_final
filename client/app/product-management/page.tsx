'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { MainNav } from '@/components/main-nav';
import { Badge } from '@/components/ui/badge';
import { Search, Pencil, Trash2, Eye, Plus, Filter } from 'lucide-react';
import { productService, categoryService } from '@/services/api';
import { ProductDialog } from './product-dialog';
import { toast } from 'sonner';

export default function ProductManagementTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    stockStatus: 'All',
    priceRange: { min: 0, max: 1000 },
    dateRange: { from: null, to: null }
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [filters, sortConfig]);

  const loadProducts = async () => {
    try {
      const allProducts = await productService.getAllProducts();
      const filteredProducts = allProducts.filter(product => {
        const matchesSearch = filters.search
          ? product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            categories
              .find(cat => cat.id === product.categoryId)
              ?.name.toLowerCase()
              .includes(filters.search.toLowerCase())
          : true;

        const matchesCategory =
          filters.category === 'All' || product.categoryId === filters.category;
        const matchesStockStatus =
          filters.stockStatus === 'All' ||
          product.stockStatus === filters.stockStatus;

        const matchesPriceRange =
          product.price >= filters.priceRange.min &&
          product.price <= filters.priceRange.max;

        const matchesDateRange =
          (!filters.dateRange.from ||
            new Date(product.dateAdded) >= filters.dateRange.from) &&
          (!filters.dateRange.to ||
            new Date(product.dateAdded) <= filters.dateRange.to);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStockStatus &&
          matchesPriceRange &&
          matchesDateRange
        );
      });

      const sortedProducts = filteredProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      setProducts(sortedProducts);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await categoryService.getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        toast.success('Product deleted successfully');
        loadProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleViewDetails = (product: any) => {
    // Handle view details logic
  };

  const handleSave = async (productData: any) => {
    try {
      if (selectedProduct) {
        await productService.updateProduct(selectedProduct.id, productData);
        toast.success('Product updated successfully');
      } else {
        await productService.createProduct(productData);
        toast.success('Product created successfully');
      }
      setIsDialogOpen(false);
      loadProducts();
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#312f2f]">Orders</h1>
          <p className="text-[#6a717d] mt-2">Manage your products</p>
        </div>
        <Card className="space-y-4">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={filters.search}
                  onChange={e =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="border rounded p-2"
                />
              </div>
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={filters.category}
                onChange={e =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="border rounded p-2">
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={filters.stockStatus}
                onChange={e =>
                  setFilters({ ...filters, stockStatus: e.target.value })
                }
                className="border rounded p-2">
                <option value="All">All Stock Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>
            </div>
            <Button
              onClick={() => {
                setSelectedProduct(null);
                setIsDialogOpen(true);
              }}
              className="flex items-center space-x-2">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('image')}>Image</TableHead>
                <TableHead onClick={() => handleSort('name')}>Name</TableHead>
                <TableHead onClick={() => handleSort('category')}>
                  Category
                </TableHead>
                <TableHead onClick={() => handleSort('price')}>Price</TableHead>
                <TableHead onClick={() => handleSort('stock')}>
                  Stock Status
                </TableHead>
                <TableHead onClick={() => handleSort('dateAdded')}>
                  Date Added
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {categories.find(cat => cat.id === product.categoryId)
                      ?.name || 'Unknown'}
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.stock > 10
                          ? 'default'
                          : product.stock > 0
                          ? 'destructive'
                          : 'danger'
                      }>
                      {product.stock > 10
                        ? 'In Stock'
                        : product.stock > 0
                        ? 'Low Stock'
                        : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(product)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="py-4 border-t">
            <div className="flex justify-center">
              <Button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="mr-2">
                Previous
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  variant={currentPage === i + 1 ? 'default' : 'ghost'}>
                  {i + 1}
                </Button>
              ))}
              <Button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="ml-2">
                Next
              </Button>
            </div>
          </div>
        </Card>
        <ProductDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          product={selectedProduct}
          onSave={handleSave}
        />
      </main>
    </div>
  );
}
