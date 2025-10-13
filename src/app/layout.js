import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../app/context/AuthContext";

export const metadata = {
  title: "Ecom Store",
  description: "Simple Next.js store (COD)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* Wrap the entire app in AuthProvider */}
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
