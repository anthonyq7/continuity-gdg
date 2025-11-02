"use client";
import { useState } from 'react';
import Image from "next/image";
import { LayoutDashboard, FileText, Users, MessageSquare, HandCoins, MoreHorizontal, Search, Bell, User, CalendarDays } from 'lucide-react';
import smslogo from "@/assets/widelogo.png";
import {NavBar} from '@/app/components/navbar';

export default function Calendar() {
    const [activeItem, setActiveItem] = useState('Overview');
    const navItems = [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/documents", icon: FileText, label: "Documents" },
        { href: "/chat", icon: MessageSquare, label: "Chat" },
        { href: "/calendar", icon: CalendarDays, label: "Calendar" },
        { href: "/payroll", icon: HandCoins, label: "Payroll" },
        ];
    return(
      <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff"}}>
          <div className="flex w-screen">
              <div className="flex flex-col border-r w-60 h-screen p-3">
                <nav className="bg-white" style={{ fontFamily: "DM Sans" }}>
                    <Image src={smslogo} alt="logo" className="w-55 h-auto mb-2"/>
                    {navItems.map((item) => (
                        <NavBar key={item.href} {...item}/>
                    ))}
                </nav>
            </div>
            <div className="overflow-y-auto w-full appear" style={{ fontFamily: "DM Sans" }}>
            <div>
                <h1 className="text-red-800 pt-5 px-5 ">Calendar</h1>
            </div>
            <div className="flex flex-1 p-5 flex-wrap transition-all duration-500 ease-in-out">  
                
            </div>
            </div>
        </div>
        </div>
    )
}