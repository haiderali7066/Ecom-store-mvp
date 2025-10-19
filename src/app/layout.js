import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../app/context/AuthContext";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ecom Store",
  description: "Simple Next.js store (COD)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/* AuthProvider wraps everything */}
        <AuthProvider>
          <Navbar />

          {/* Responsive main container */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
