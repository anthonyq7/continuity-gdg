"use client";
import { useState } from 'react';
import Image from "next/image";
import { LayoutDashboard,   FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User } from 'lucide-react';
import Link from "next/link"; 
import smslogo from "@/assets/widelogo.png";
import {NavBar} from '@/app/components/navbar';

export default function Home() {
    const [activeItem, setActiveItem] = useState('Overview');

  return(
      <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff"}}>
          <div className="flex w-screen">
              <div className="flex flex-col border-r w-60 h-screen p-3">
                <nav className="bg-white" style={{ fontFamily: "DM Sans" }}>
                    <ul className="text-gray-700 flex flex-col gap-1">
                        <Image src={smslogo} alt="logo" className="w-55 h-auto mb-2"/>
                        <Link href="/dashboard" className="flex gap-5 hover:bg-gray-200 p-4 pr-7 duration-300 rounded-md"><LayoutDashboard/>Dashboard</Link>
                        <Link href="/documents" className="flex gap-5 hover:bg-gray-200 p-4 pr-7 duration-300 rounded-md"><FileText/>Documents</Link>
                        <Link href="/chat" className="flex gap-5 hover:bg-gray-200 p-4 pr-7 duration-300 rounded-md"><MessageSquare/>Chat</Link>
                        <Link href="" className="flex gap-5 hover:bg-gray-200 p-4 pr-7 duration-300 rounded-md"><MoreHorizontal/>More</Link>

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