'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const orders = useStore(state => state.orders);
  const products = useStore(state => state.products);

  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-[#312f2f] mb-8">
        Order Confirmation
      </h1>
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8"
        role="alert">
        <strong className="font-bold">Thank you for your order!</strong>
        <span className="block sm:inline">
          {' '}
          Your order has been placed successfully.
        </span>
      </div>
      <div className="space-y-4">
        <p>
          <strong>Order ID:</strong> {latestOrder.id}
        </p>
        <p>
          <strong>Date:</strong>{' '}
          {new Date(latestOrder.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Total:</strong> ${latestOrder.total.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong> {latestOrder.status}
        </p>
        <div>
          <h2 className="text-xl font-semibold text-[#312f2f] mb-2">
            Order Details
          </h2>
          {latestOrder.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return (
              <div
                key={`${item.productId}-${item.color}`}
                className="flex justify-between">
                <span>
                  {product?.name} - {item.color} (x{item.quantity})
                </span>
                <span>
                  ${((product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#312f2f] mb-2">
            Shipping Details
          </h2>
          <p>{latestOrder.shippingDetails.name}</p>
          <p>{latestOrder.shippingDetails.address}</p>
          <p>
            {latestOrder.shippingDetails.city},{' '}
            {latestOrder.shippingDetails.country}{' '}
            {latestOrder.shippingDetails.postalCode}
          </p>
        </div>
      </div>
      <Button
        onClick={() => router.push('/')}
        className="mt-8 bg-[#ba8a5b] hover:bg-[#a67b4d] text-white">
        Continue Shopping
      </Button>
    </div>
  );
}
