import { MainNav } from '@/components/main-nav';
import { OrdersTable } from '@/components/orders-table';

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#312f2f]">Orders</h1>
          <p className="text-[#6a717d] mt-2">Manage your customer orders</p>
        </div>
        <OrdersTable />
      </main>
    </div>
  );
}
