// app/order-success/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Success() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.push("/"), 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-40 h-40 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-4xl">
          ✓
        </div>
      </motion.div>
      <h2 className="text-2xl mt-6 font-semibold">Order placed!</h2>
      <p className="text-gray-500 mt-2">Thanks — redirecting to home...</p>
    </div>
  );
}
