import Image from "next/image";
import Link from "next/link";
import HomeProducts from "@/components/HomeProducts";

export default function HomePage() {
  const categories = [
    {
      title: "Muslim",
      img: "https://i.pinimg.com/736x/0c/1a/d7/0c1ad796e8c3ead76ca571af046cf00b.jpg",
    },
    {
      title: "Trending",
      img: "https://img.joomcdn.net/3a214f374838fdc4a04ce65a9df042fd8e4e75cf_original.jpeg",
    },
    {
      title: "Fanbase",
      img: "https://images.meesho.com/images/products/330637171/1bxzr_512.jpg",
    },
    {
      title: "Motivational",
      img: "https://images-eu.ssl-images-amazon.com/images/I/61ziL3rbnrL._AC_UL600_SR600,600_.jpg",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-8 py-12 md:py-20 gap-10">
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Elevate Your <span className="text-blue-600">Street Style</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-md mx-auto md:mx-0">
              Premium oversized and regular tees crafted for comfort, culture,
              and confidence.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 flex justify-center">
            <Image
              src="https://tshirtmalli.lk/cdn/shop/files/mkluffy-t-shirt-sri-lanka-black.webp?v=1742066475&width=533"
              alt="Hero Shirt"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg object-cover w-[85%] sm:w-[70%] md:w-full"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/products?category=${encodeURIComponent(cat.title)}`}
              className="relative group overflow-hidden rounded-2xl shadow hover:shadow-lg transition"
            >
              <Image
                src={cat.img}
                alt={cat.title}
                width={400}
                height={300}
                className="object-cover w-full h-40 sm:h-52 md:h-56 group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-base sm:text-lg font-semibold">
                  {cat.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <HomeProducts />
      </section>
    </main>
  );
}
