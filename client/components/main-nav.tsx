'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { useStore } from '@/lib/mock-data';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Benefits from '@/components/Benefits';
import SuccessStories from '@/components/SuccessStories';
import Footer from '@/components/Footer';
export function MainNav() {
  const router = useRouter();
  const currentUser = useStore(state => state.currentUser);
  const logout = useStore(state => state.logout);
  const cart = useStore(state => state.cart);

  const handleLogout = () => {
    logout();
    localStorage.clear();

    router.push('/login');
  };

  console.log({ currentUser });

  const Home = () => {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Mission />
          <Benefits />
          <SuccessStories />
        </main>
        <Footer />
      </div>
    );
  };

  const HomeWithUser = () => {
    return (
      <header
        className="sticky top-0 z-50 w-full border-b bg-gradient-to-r
       from-olive to-olive text-white">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex"></div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {/* <div className="w-full flex-1 md:w-auto md:flex-none">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 bg-white/20 border-white/20 text-white w-full md:w-[300px] placeholder-white/70"
                  />
                </div>
              </form>
            </div> */}
            {/* <ThemeToggle /> */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>

            {currentUser ? (
              <UserNav />
            ) : (
              <Button
                onClick={() => router.push('/login')}
                variant="ghost"
                className="text-white hover:bg-white/20">
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  };

  if (currentUser) {
    return <HomeWithUser />;
  }

  return <Home />;
}
