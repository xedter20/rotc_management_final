import { MainNav } from '@/components/main-nav';
import { ProductGrid } from '@/components/product-grid';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8"></div>
      </main>
    </div>
  );
}
