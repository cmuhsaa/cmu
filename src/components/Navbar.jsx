"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Edit from "@/components/Edit";

const NavLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="overflow-hidden text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Primary navigation items
  const primaryNavItems = [
    { href: "/introduction", label: "Introduction" },
    { href: "/background", label: "Background" },
    { href: "/messageFromChiefPatron", label: "Chief Patron" },
    { href: "/messageFromPresident", label: "President" },
    { href: "/messageFromSecretary", label: "Secretary" },
    { href: "/objectives", label: "Objectives" },
  ];

  // Secondary navigation items (will be in dropdown on desktop)
  const secondaryNavItems = [
    { href: "/post", label: "Posts" },
    { href: "/notice", label: "Notices" },
    { href: "/gallery", label: "Gallery" },
    { href: "/student", label: "Students" },
    { href: "/teacher", label: "Teachers" },
    { href: "/event", label: "Events" },
    { href: "/feedback", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              YourLogo
            </Link>
          </div>

          {/* Desktop Navigation - Primary Items */}
          <nav className="hidden md:flex space-x-2">
            {/* Dropdown for secondary items */}
            <div className="relative group flex items-center">
              <button className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                About
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="self-start absolute right-0 mt-[30px] w-48 origin-top-right bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 py-2">
                  <Edit model={"dashboard"} id={`/dashboard`} />
                </div>
              </div>
            </div>
            {secondaryNavItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Dropdown) */}
      <div className={`md:hidden bg-white ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
          {[...primaryNavItems, ...secondaryNavItems].map((item) => (
            <MobileNavLink key={item.href} href={item.href}>
              {item.label}
            </MobileNavLink>
          ))}
          <div className="px-3 py-2">
            <Edit model={"dashboard"} id={`/dashboard`} />
          </div>
        </div>
      </div>
    </header>
  );
}
