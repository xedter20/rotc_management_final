'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  const router = useRouter();
  const products = useStore(state => state.products);
  const cart = useStore(state => state.cart);
  const currentUser = useStore(state => state.currentUser);
  const addOrder = useStore(state => state.addOrder);
  const clearCart = useStore(state => state.clearCart);

  const [shippingDetails, setShippingDetails] = useState({
    name: currentUser?.firstName || '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  });

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    if (!currentUser) {
      alert('Please log in to place an order.');
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      userId: currentUser.id,
      items: cart,
      total,
      status: 'processing' as const,
      date: new Date().toISOString(),
      shippingDetails
    };

    addOrder(newOrder);
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-[#312f2f] mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#312f2f] mb-4">
            Shipping Details
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={shippingDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={shippingDetails.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#312f2f] mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div
                key={`${item.productId}-${item.color}`}
                className="flex justify-between">
                <span>
                  {item.product?.name} - {item.color} (x{item.quantity})
                </span>
                <span>
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-[#ba8a5b]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handlePlaceOrder}
        className="w-full mt-8 bg-[#ba8a5b] hover:bg-[#a67b4d] text-white">
        Place Order
      </Button>
    </div>
  );
}
