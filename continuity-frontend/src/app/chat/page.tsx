"use client";
import { useState } from 'react';
import Image from "next/image";
import { LayoutDashboard, FileText, Users, MessageSquare, MoreHorizontal, HandCoins, Search, Bell, User, CalendarDays } from 'lucide-react';
import smslogo from "@/assets/widelogo.png";
import { NavBar } from '@/app/components/navbar';

export default function Chat() {
    const [activeItem, setActiveItem] = useState('Overview');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navItems = [
        { href: "/dashboard_new", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/chat", icon: MessageSquare, label: "Chat" },
    ];
    return (
        <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff" }}>
            <div className="flex h-screen">
                <aside className="flex flex-col border-r w-60 shrink-0 p-3">
                    <nav
                        className="bg-white"
                        style={{
                            fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        }}
                    >
                        <Image src={smslogo} alt="logo" className="w-56 h-auto mb-2" />
                        {navItems.map((item) => (
                            <NavBar key={item.href} {...item} />
                        ))}
                    </nav>
                </aside>
                <div className="flex justify-between w-full appear" style={{ fontFamily: "DM Sans" }}>
                    <div className='w-30'>
                        <h1 className="pt-5 pl-5 font-bold" style={{ color: "#ea4b33" }}>ShowMedia.AI</h1>
                    </div>
                    <div className="flex flex-col justify-center transition-all duration-500 ease-in-out">
                        <div className="h-[85vh] py-5">
                            <p></p>
                        </div>
                        <div className="text-black px-5 pt-5 flex-1">
                            <div className="bg-white fixed-bottom flex w-[50vw] h-[75px] hover:scale-[1.01] rounded-md text-gray-500 shadow-lg transition-all ease-in-out duration-300">
                                <div className="py-10 px-2 flex items-center bg-white border border-gray-300 rounded-md flex-shrink-0">
                                    <input placeholder="Ask Chatbot Anything" className="p-5 w-[50vw] py-2 h-[80px] focus:outline-none" />
                                    <button className="hover:scale-[0.96] pr-5 hover:text-gray-600 hover:cursor-pointer duration-300">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-30">
                    </div>
                </div>
            </div>
        </div>
    )
}