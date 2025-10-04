import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-900">
              FoodWave
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="/" className="text-lime-600 font-medium">Home</a>
              <a href="/about" className="text-gray-600 hover:text-lime-600 font-medium">About Us</a>
              <a href="/contact" className="text-gray-600 hover:text-lime-600 font-medium">Contact</a>
              <a href="/order" className="text-gray-600 hover:text-lime-600 font-medium">Order</a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="/" className="block px-3 py-2 text-lime-600 font-medium">Home</a>
              <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-lime-600 font-medium">About Us</a>
              <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-lime-600 font-medium">Contact</a>
              <a href="/order" className="block px-3 py-2 text-gray-600 hover:text-lime-600 font-medium">Order</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}