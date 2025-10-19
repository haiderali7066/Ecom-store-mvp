"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative h-72 w-full overflow-hidden group">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            unoptimized
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
            No Image
          </div>
        )}

        {/* Overlay Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {product.category}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description?.slice(0, 100) || "No description available."}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xl font-extrabold text-gray-900">
            PKR {product.price}
          </div>
          <Link href={`/product/${product._id}`}>
            <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
