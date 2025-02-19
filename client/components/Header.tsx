import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function Header() {
  const router = useRouter();
  return (
    <header className="bg-charcoal text-desert py-4 w-full z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-olive">
          CBSUA-Sipocot ROTC
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="#" className="hover:text-steel transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-steel transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-steel transition-colors">
                Programs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-steel transition-colors">
                Events
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-steel transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Button
          onClick={() => router.push('/login')}
          className="bg-olive hover:bg-ranger text-desert font-bold transition-colors">
          Enroll Now
        </Button>
      </div>
    </header>
  );
}
