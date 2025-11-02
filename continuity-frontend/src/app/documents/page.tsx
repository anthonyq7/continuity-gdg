"use client";
import { useState } from 'react';
import Image from "next/image";
import { LayoutDashboard,   FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User } from 'lucide-react';
import Link from "next/link"; 
import smslogo from "@/assets/widelogo.png";

export default function Home() {

    return(
      <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff"}}>
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
             <div className="h-full flex flex-col mx-auto justify-center items-center page-transition">
                 <h1 className="text-white text-center font-bold text-5xl p-5" style={{ fontFamily: "Futura" }}>This is the document board</h1>
             </div>

        </div>
    )
}