// app/components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">CottonCore</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your go-to store for premium quality T-shirts and apparel. Trendy
            designs, great prices, fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/products?category=Muslim"
                className="hover:text-white"
              >
                Muslim
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=Motivational"
                className="hover:text-white"
              >
                Motivational
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=Trending"
                className="hover:text-white"
              >
                Trending
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=Fanbase"
                className="hover:text-white"
              >
                Fanbase
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@shopnext.com</li>
            <li>Phone: +92 300 1234567</li>
          </ul>

          <div className="flex gap-4 mt-4">
            <Link href="#" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopNext. All rights reserved.
      </div>
    </footer>
  );
}
