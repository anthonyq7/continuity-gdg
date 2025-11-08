"use client";
import { useState, useRef, useEffect } from 'react';
import { User, LogOut} from 'lucide-react'; 
import Link from 'next/link';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;
      if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex" ref={dropdownRef}>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none"
      >
        <User className="h-10 w-10 p-2 bg-gray-500 rounded-full hover:bg-gray-600 transition" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-12 text-gray-500 w-50 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:bg-[#e8bbb4] p-4 duration-300 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <LogOut className="w-5 h-5"/>
            <span>Sign Out</span>
          </Link>
        </div>
      )}
    </div>
  );
}