"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🩶 Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-blue-600 transition"
        >
          Next<span className="text-blue-600">Store</span>
        </Link>

        {/* 🧭 Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative transition ${
                pathname === href
                  ? "text-blue-600 after:w-full"
                  : "hover:text-blue-600"
              } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full`}
            >
              {label}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="text-sm font-semibold px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition"
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/admin/login"
              className="text-sm text-blue-600 hover:text-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* 🛍️ Cart Icon & Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart" className="text-gray-700 hover:text-blue-600">
            <ShoppingBag size={22} />
          </Link>
          <button
            className="text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slideDown">
          <div className="px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`${
                  pathname === href ? "text-blue-600" : "hover:text-blue-600"
                }`}
              >
                {label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
