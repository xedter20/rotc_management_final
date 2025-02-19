'use client';

import { useStore } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash, Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { productService } from '@/services/api'; // Adjust the import path as needed

export default function CartPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateCartItem = useStore(state => state.updateCartItem);

  useEffect(() => {
    async function fetchProducts() {
      console.log('deddex');
      try {
        const data = await productService.getAllProducts();

        console.log({ data });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  console.log({ cart, products });
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const shippingCost = 10; // Example flat rate shipping cost
  const grandTotal = subtotal + shippingCost;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  console.log({ products });
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div
                key={`${item.productId}-${item.color}`}
                className="flex items-center space-x-4 p-4 border rounded-md">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.product?.image || '/placeholder.png'} // Fallback image
                    alt={item.product?.name || 'Product Image'}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold">
                    {item.product?.name || 'Unknown Product'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.product?.description || 'No description available.'}
                  </p>
                  <p className="text-lg font-bold">
                    ₱{item.product?.price?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateCartItem(
                        item.productId,
                        Math.max(1, item.quantity - 1),
                        item.color,
                        item.size
                      )
                    }>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => {
                      const newQuantity = Number.parseInt(e.target.value);
                      if (newQuantity > 0) {
                        updateCartItem(
                          item.productId,
                          newQuantity,
                          item.color,
                          item.size
                        );
                      }
                    }}
                    className="w-12 text-center"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateCartItem(
                        item.productId,
                        item.quantity + 1,
                        item.color,
                        item.size
                      )
                    }>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-lg font-bold">
                  ₱{((item.product?.price || 0) * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.productId)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          <div className="space-y-4 p-4 border rounded-md">
            <h2 className="text-xl font-bold">Cart Summary</h2>
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₱{shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Grand Total:</span>
              <span>₱{grandTotal.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full text-white mt-4">
              Proceed to Checkout
            </Button>
            <Button
              onClick={() => router.push('/products')}
              variant="ghost"
              className="w-full mt-2">
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
