"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-600 tracking-tight hover:text-blue-700 transition-colors"
        >
          ShopNext
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link
            href="/"
            className={`hover:text-blue-600 transition ${
              pathname === "/" ? "text-blue-600" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`hover:text-blue-600 transition ${
              pathname === "/products" ? "text-blue-600" : ""
            }`}
          >
            Products
          </Link>
          <Link
            href="/cart"
            className={`hover:text-blue-600 transition ${
              pathname === "/cart" ? "text-blue-600" : ""
            }`}
          >
            Cart
          </Link>

          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="text-sm font-semibold px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/admin/login"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
