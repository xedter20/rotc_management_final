'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Users,
  Heart,
  Clock,
  BoxIcon,
  FileText
} from 'lucide-react';
import { useStore } from '@/lib/mock-data';

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['cadet', 'rotc_officer', 'rotc_coordinator']
  },
  {
    title: 'ROTC Application',
    href: '/rotc-application',
    icon: FileText,
    roles: ['cadet']
  },
  {
    title: 'Application Management',
    href: '/application-management',
    icon: FileText,
    roles: ['rotc_officer', 'rotc_coordinator']
  },
  {
    title: 'User Management',
    href: '/user-management',
    icon: Users,
    roles: ['rotc_officer', 'rotc_coordinator']
  },
  {
    title: 'Attendance Management',
    href: '/attendance-management',
    icon: Clock,
    roles: ['rotc_officer', 'rotc_coordinator']
  },
  {
    title: 'Attendance Form',
    href: '/attendance-form',
    icon: Clock,
    roles: ['cadet']
  }
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useStore(state => state.logout);
  const currentUser = useStore(state => state.currentUser);

  console.log({ currentUser });
  const filteredNavItems = sidebarNavItems.filter(item =>
    currentUser?.role ? item?.roles?.includes(currentUser.role) : false
  );

  const handleLogout = () => {
    localStorage.clear();
    logout();
    router.push('/login');
  };

  return (
    currentUser.id && (
      <div className="hidden border-r bg-olive text-white lg:block w-64">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[70px] items-center border-b border-white/20 px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Package className="h-6 w-6" />
              <span>ROTC Management System</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 px-3">
            <div className="flex flex-col gap-2 py-2">
              {filteredNavItems.map(item => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={cn('w-full justify-start', {
                    'bg-white/20 text-white hover:bg-white/30 hover:text-white':
                      pathname === item.href,
                    'text-white/80 hover:bg-white/20 hover:text-white':
                      pathname !== item.href
                  })}
                  asChild>
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-auto p-4">
            <Button
              variant="outline"
              className="w-full justify-start bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover-color)] border-none"
              onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
