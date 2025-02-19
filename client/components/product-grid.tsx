'use client';

import { useStore } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProductGrid() {
  const products = useStore(state => state.products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Card key={`${product.id}-${index}`} className="overflow-hidden">
          <Link href={`/products/${product.id}`}>
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
                <h3 className="font-semibold text-[#312f2f]">{product.name}</h3>
                <span className="text-[#ba8a5b] font-medium">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-[#6a717d] mb-4">{product.category}</p>
            </CardFooter>
          </Link>
          <Button
            className="w-full bg-[#ba8a5b] hover:bg-[#a67b4d] text-white"
            onClick={() => useStore.getState().addToCart(product.id, 1)}>
            Add to Cart
          </Button>
        </Card>
      ))}
    </div>
  );
}
