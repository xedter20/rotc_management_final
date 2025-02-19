'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Package,
  Tag,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Package2,
  Hammer,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { categoryService } from '@/services/api';

interface Category {
  id: string;
  name: string;
  description?: string;
}

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  categoryId: z.string().min(1, 'Category is required'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Must be a valid URL'),
  stock: z.string().min(1, 'Stock is required'),
  material: z.string().min(1, 'Material is required'),
  estimatedDelivery: z.string().min(1, 'Estimated delivery is required')
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
  onSave: (data: any) => void;
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
  onSave
}: ProductDialogProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      price: '',
      description: '',
      image: '',
      stock: '',
      material: '',
      estimatedDelivery: ''
    }
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        categoryId: product.categoryId,
        price: product.price.toString(),
        description: product.description,
        image: product.image,
        stock: product.stock.toString(),
        material: product.material,
        estimatedDelivery: product.estimatedDelivery
      });
    } else {
      form.reset({
        name: '',
        categoryId: '',
        price: '',
        description: '',
        image: '',
        stock: '',
        material: '',
        estimatedDelivery: ''
      });
    }
  }, [product, form]);

  const onSubmit = (data: ProductFormValues) => {
    onSave({
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              {product ? 'Edit Product' : 'Create New Product'}
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Package className="h-4 w-4" />
                        <span>Name</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          form.formState.errors.name &&
                            'border-red-500 focus-visible:ring-red-500'
                        )}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          <span>{form.formState.errors.name.message}</span>
                        </div>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Tag className="h-4 w-4" />
                        <span>Category</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger
                          className={cn(
                            form.formState.errors.categoryId &&
                              'border-red-500 focus-visible:ring-red-500'
                          )}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.categoryId && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          <span>
                            {form.formState.errors.categoryId.message}
                          </span>
                        </div>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2 text-gray-900">
                        <DollarSign className="h-4 w-4" />
                        <span>Price</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        className={cn(
                          form.formState.errors.price &&
                            'border-red-500 focus-visible:ring-red-500'
                        )}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.price && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          <span>{form.formState.errors.price.message}</span>
                        </div>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Package2 className="h-4 w-4" />
                        <span>Stock</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className={cn(
                          form.formState.errors.stock &&
                            'border-red-500 focus-visible:ring-red-500'
                        )}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.stock && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          <span>{form.formState.errors.stock.message}</span>
                        </div>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Hammer className="h-4 w-4" />
                        <span>Material</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          form.formState.errors.material &&
                            'border-red-500 focus-visible:ring-red-500'
                        )}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.material && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          <span>{form.formState.errors.material.message}</span>
                        </div>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedDelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Clock className="h-4 w-4" />
                        <span>Estimated Delivery</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          form.formState.errors.estimatedDelivery &&
                            'border-red-500 focus-visible:ring-red-500'
                        )}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.estimatedDelivery && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          <span>
                            {form.formState.errors.estimatedDelivery.message}
                          </span>
                        </div>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2 text-gray-900">
                      <ImageIcon className="h-4 w-4" />
                      <span>Image URL</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        form.formState.errors.image &&
                          'border-red-500 focus-visible:ring-red-500'
                      )}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.image && (
                      <div className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        <span>{form.formState.errors.image.message}</span>
                      </div>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2 text-gray-900">
                      <FileText className="h-4 w-4" />
                      <span>Description</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={cn(
                        'min-h-[100px]',
                        form.formState.errors.description &&
                          'border-red-500 focus-visible:ring-red-500'
                      )}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.description && (
                      <div className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        <span>{form.formState.errors.description.message}</span>
                      </div>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2">
              <Package2 className="h-4 w-4" />
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
