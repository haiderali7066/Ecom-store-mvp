import Image from "next/image";
import Link from "next/link";
import HomeProducts from "@/components/HomeProducts";

export default function HomePage() {
  const categories = [
    {
      title: "Muslim",
      img: "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140,2000%7C61tGSs8mMOL.png%7C0,0,2140,2000%200.0,0.0,2140.0,2000.0_AC_SL1500_.png",
    },
    { title: "Trending", img: "/images/trending.jpg" },
    { title: "Fanbase", img: "/images/fanbase.jpg" },
    { title: "Motivational", img: "/images/motivational.jpg" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-8 py-20">
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Elevate Your <span className="text-blue-600">Street Style</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-md">
              Premium oversized and regular tees crafted for comfort, culture,
              and confidence.
            </p>
            <div className="mt-6 flex gap-4">
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

          <div className="flex-1 mt-10 md:mt-0">
            <Image
              src="https://www.inkfactory.pk/wp-content/uploads/2019/08/T-Shirt-Mockup-0016.jpg"
              alt="Hero Shirt"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {cat.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Products
        </h2>
        <HomeProducts />
      </section>
    </main>
  );
}
