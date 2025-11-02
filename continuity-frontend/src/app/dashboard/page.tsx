"use client";
import { useState } from 'react';
import Image from "next/image";
import { LayoutDashboard,   FileText, MessageSquare, MoreHorizontal, Search, Bell, User, HandCoins, CalendarDays } from 'lucide-react';
import smslogo from "@/assets/widelogo.png";
import {NavBar} from '@/app/components/navbar';

export default function Home() {
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
                <h1 className="text-red-800 pt-5 px-5 ">Overview</h1>
            </div>
            <div className="flex flex-1 p-5 flex-wrap transition-all duration-500 ease-in-out">  
                <div className="text-black px-5 min-w-[400px] flex-1">
                        <div className="min-w-[350] bg-red-800 mb-5 rounded-md p-6 text-white shadow-lg transition-all duration-300 delay-150 flex-shrink-0">
                            <h1 className="text-white font-bold text-4xl mb-2" style={{ fontFamily: "DM Sans" }}>My Dashboard</h1>
                            <p className="text-md text-white" style={{ fontFamily: "DM Sans" }}>Manage all activities here</p>
                        </div>
                        <div className="min-w-[350] h-[600] bg-white rounded-md p-8 text-white shadow-lg transition-all duration-300 delay-150 flex-shrink-0">
                            <p className="text-black p-6" style={{ fontFamily: "DM Sans" }}></p>
                        </div>
                </div>
                <div className="text-black px-5 min-w-[400px] flex-1">
                        <div className="h-100 min-w-[400px] bg-white mb-5 rounded-md p-8 text-white shadow-lg">
                            <h1 className="text-white text-4xl mb-2" style={{ fontFamily: "DM Sans" }}></h1>
                        </div>
                        <div className="h-100 min-w-[400px] bg-white mb-5 rounded-md p-8 text-white shadow-lg">
                            <h1 className="text-white text-4xl mb-2" style={{ fontFamily: "DM Sans" }}></h1>
                        </div>
                        <div className="h-100 min-w-[400px] bg-white mb-5 rounded-md p-8 text-white shadow-lg">
                            <h1 className="text-white text-4xl mb-2" style={{ fontFamily: "DM Sans" }}></h1>
                        </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}