// components/header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            priority
            className="rounded-full bg-black"
          />
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link
            href="/collections"
            className="hover:text-indigo-600 transition"
          >
            Collections
          </Link>
          <Link href="/designs" className="hover:text-indigo-600 transition">
            Designs
          </Link>
          <Link href="/products" className="hover:text-indigo-600 transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-indigo-600 transition">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Link href="/collections">Explore</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
