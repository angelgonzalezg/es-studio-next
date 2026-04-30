"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginDrawer from "@/components/layout/LoginDrawer";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from '@/hooks/useUser';
import NavLinks from '@/components/layout/NavLinks';

import icon from "../../../public/images/es_logo.png";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, loading } = useUser()
  // Router for navigation
  const router = useRouter();
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (err) {
      // Logout on frontend even if backend fails
      console.error('Logout failed', err);
    } finally {
      localStorage.removeItem('auth_state');
      // Dispatch storage event to update useUser in same tab
      window.dispatchEvent(new StorageEvent('storage', { key: 'auth_state', newValue: null }));
      router.push('/'); // Redirect to home after logout
    }
  }

  if (loading) {
    return <p>Loading...</p>; // or a loading spinner
  }

  const isHome = pathname === '/';
  const navbarClasses = `flex justify-between items-center fixed top-0 left-0 w-full px-5 lg:px-15 p-2 z-50 transition-all duration-300 ease-in-out ${(isHome) && scrollY >= 0 && scrollY <= 40 ? 'bg-transparent backdrop-blur-none border-b border-transparent h-40 text-base text-white shadow-none' : 'bg-background/15 backdrop-blur-lg border-b border-black/10 h-20 text-sm text-black'
    }`;
  const hamburgerSpanClasses = `h-0.5 ${(isHome) && scrollY === 0 ? 'bg-white' : 'bg-black'
    }`;

  return (
    <nav className={navbarClasses}>
      <Link href="/">
        <Image
          src={icon}
          alt="icon"
          width={70}
          priority // inmediate download
        />
      </Link>

      <NavLinks
        links={
          user
            ? [
              // { href: '/dashboard', text: 'Dashboard' }
            ]
            : [
              { href: '/', text: 'Home' },
              { href: '/about', text: 'Studio' },
              { href: '/services', text: 'Servicios' },
              { href: '/portfolio', text: 'Portfolio' },
              { href: '/contact', text: 'Contacto' },
            ]
        }
      />

      {user ? (
        <div className="flex flex-row items-center gap-4">
          <span className="text-1xl">Bienvenido,<br /> {user.email}</span>
          <button
            onClick={handleLogout}
            className="flex lg:flex justify-center items-center relative group overflow-hidden border p-0.5 px-2 rounded cursor-pointer"
          >
            <LogOut className="p-0.5" />
          </button>
        </div>

      ) : (
        <LoginDrawer />
      )}

      {/* Hamburger menu for mobile */}
      <button className="lg:hidden cursor-pointer">
        <div className="flex flex-col items-center gap-1.5">
          <span className={`${hamburgerSpanClasses} w-8`}></span>
          <span className={`${hamburgerSpanClasses} w-6`}></span>
          <span className={`${hamburgerSpanClasses} w-8`}></span>
        </div>
      </button>
    </nav>
  );
}

export default Navbar;
