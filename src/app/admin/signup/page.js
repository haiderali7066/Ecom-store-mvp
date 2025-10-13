"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "admin" }), // force admin role
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      setSuccess("Admin account created successfully!");
      setTimeout(() => router.push("/admin/login"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already an admin?{" "}
        <a href="/admin/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </section>
  );
}
