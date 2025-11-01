"use client";
import { useState } from 'react';
import { LayoutDashboard,   FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User } from 'lucide-react';
import Link from "next/link";

export default function Home() {
    const [activeItem, setActiveItem] = useState('Overview');

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Documents', icon: FileText },
    { name: 'Crew', icon: Users },
    { name: 'Chat', icon: MessageSquare },
    { name: 'More', icon: MoreHorizontal }
  ];

  return(
      <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff"}}>
          <div className="flex h-screen">
              <div className="flex flex-col border-r h-screen">

                {/* Nav */}
                <nav className="flex-1 p-4 bg-white" style={{ fontFamily: "DM Sans" }}>
                    <ul className="space-y-1 text-gray-700">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.name;
                        return (
                        <li key={item.name}>
                            <button
                            onClick={() => setActiveItem(item.name)}
                            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                                isActive
                                ? 'bg-gray-300'
                                : 'hover:bg-gray-50'
                            }`}
                            >
                            <Icon size={20} />
                            <span>{item.name}</span>
                            </button>
                        </li>
                        );
                    })}
                    </ul>
                </nav>
                </div>
        <div className="overflow-y-auto w-full page-transition" style={{ fontFamily: "DM Sans" }}>
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