'use client';

import Link from 'next/link';
import {LucideIcon} from 'lucide-react';

interface NavBarProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export function NavBar({ href, icon: Icon, label }: NavBarProps) {
  return (
    <Link href={href} className="flex items-center gap-3 hover:bg-[#e8bbb4] p-4 pr-7 duration-300 mb-1">
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}