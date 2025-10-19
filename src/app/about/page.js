import Link from "next/link";

export const metadata = {
  title: "About | Cotton Core",
  description:
    "Learn how Cotton Core works — features, shopping process, and admin panel details.",
};

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
        About Cotton Core
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Discover how our modern streetwear store operates and how you can easily
        shop your favorite tees.
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            🛍 What Cotton Core Is
          </h2>
          <p>
            Cotton Core is a stylish online clothing store built with the MERN
            stack and Next.js. We specialize in premium{" "}
            <strong>oversized and regular printed tees</strong> crafted for
            comfort, culture, and confidence. Our goal is to bring high-quality
            apparel to the Pakistani market with a simple and smooth shopping
            experience.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            ⚙️ How It Works
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Browse through our{" "}
              <Link href="/products" className="text-blue-600 hover:underline">
                products page
              </Link>{" "}
              or choose a category like Muslim, Trending, Motivational, or
              Fanbase.
            </li>
            <li>Click any product to view details and add it to your cart.</li>
            <li>
              Once ready, go to your <strong>Cart</strong> to review your
              selected items.
            </li>
            <li>
              Proceed to <strong>Checkout</strong> — fill in your name, phone
              number, and delivery address.
            </li>
            <li>
              Place your order with <strong>Cash on Delivery (COD)</strong>. No
              payment integration is added yet.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            🧾 Features
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Modern, responsive design for mobile and desktop.</li>
            <li>Category-based product browsing.</li>
            <li>Add to Cart and Checkout system.</li>
            <li>Customer order management with COD workflow.</li>
            <li>Admin Panel to manage products and orders.</li>
            <li>
              Simple and fast UI with real-time updates using Next.js API
              routes.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            🔐 Admin Panel
          </h2>
          <p>
            Our built-in <strong>Admin Dashboard</strong> allows the site owner
            to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>View and manage all orders placed by customers.</li>
            <li>Add, edit, or delete products easily.</li>
            <li>Track product categories and stock details.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">
            🚀 Future Updates
          </h2>
          <p>
            We plan to introduce <strong>online payment integration</strong> via
            card, Easypaisa, and JazzCash soon — making Cotton Core a complete
            e-commerce experience for every user in Pakistan.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    </section>
  );
}
