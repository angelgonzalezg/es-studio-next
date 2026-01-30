import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  links: { href: string; text: string }[];
}

const NavLinks = ({ links }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <ul className="lg:flex hidden items-center">
      {links.map((link) => (
        <li
          key={link.href}
          className="px-5 border-l first:border-l-0"
        >
          <Link
            href={link.href}
            className={`${pathname === link.href
              ? 'underline underline-offset-4 decoration-1'
              : 'hover:underline hover:underline-offset-4 hover:decoration-2'
              } transition-all duration-100`}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
