// app/components/ProductCard.js
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow p-4"
    >
      <div className="h-40 w-full mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover w-full h-full"
            unoptimized
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500 mt-1">
        {product.description?.slice(0, 80)}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-bold">PKR {product.price}</div>
        <Link href={`/product/${product._id}`}>
          <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
            Buy Now
          </button>
        </Link>
      </div>
    </motion.article>
  );
}
