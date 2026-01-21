import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  links: { href: string; text: string }[];
}

const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <ul className="lg:flex hidden space-x-2">
      {links.map((link, index) => (
        <React.Fragment key={link.href}>
          {index > 0 && <li>|</li>}
          <li className="px-4">
            <Link
              href={link.href}
              className={`${
                pathname === link.href
                  ? 'underline underline-offset-4 decoration-1'
                  : 'hover:underline hover:underline-offset-4 hover:decoration-2'
              } transition-all duration-200`}
            >
              {link.text}
            </Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default NavLinks;
