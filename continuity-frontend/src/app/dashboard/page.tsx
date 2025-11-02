"use client";
import { useState } from 'react';
import Image from "next/image";
import { LayoutDashboard, FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User, X, Send } from 'lucide-react';
import Link from "next/link";
import smslogo from "@/assets/widelogo.png";

export default function Home() {
    const [activeItem, setActiveItem] = useState('Overview');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: "#ffffffff" }}>
            <div className="flex">
                <div className="flex flex-col border-r w-60 min-h-screen p-3 sticky top-0">
                    <nav className="bg-white" style={{ fontFamily: "DM Sans" }}>
                        <ul className="text-gray-700 flex flex-col gap-1">
                            <Image src={smslogo} alt="logo" className="w-55 h-auto mb-2" />
                            <Link href="/dashboard" className="flex gap-5 hover:bg-gray-200 p-4 pr-7 duration-300 rounded-md"><LayoutDashboard />Dashboard</Link>
                            <Link href="/documents" className="flex gap-5 hover:bg-gray-200 p-4 pr-7 duration-300 rounded-md"><FileText />Documents</Link>
                            <Link href="/chat" className="flex gap-5 hover:bg-gray-200 p-4 pr-7 duration-300 rounded-md"><MessageSquare />Chat</Link>
                            <Link href="" className="flex gap-5 hover:bg-gray-200 p-4 pr-7 duration-300 rounded-md"><MoreHorizontal />More</Link>
                        </ul>
                    </nav>
                </div>
                <div className="flex-1 w-full page-transition" style={{ fontFamily: "DM Sans" }}>
                    <div>
                        <h1 className="pt-5 px-5" style={{ color: "#ea4b33" }}>Overview</h1>
                    </div>
                    <div className="flex flex-1 p-5 flex-wrap transition-all duration-500 ease-in-out">
                        <div className="text-black px-5 min-w-[400px] flex-1">
                            <div className="min-w-[350] mb-5 p-6 text-white shadow-lg transition-all duration-300 delay-150 flex-shrink-0" style={{ backgroundColor: "#ea4b33" }}>
                                <h1 className="text-white font-bold text-4xl mb-2" style={{ fontFamily: "DM Sans" }}>My Dashboard</h1>
                                <p className="text-md text-white" style={{ fontFamily: "DM Sans" }}>Manage all activities here</p>
                            </div>
                            <div className="min-w-[350] h-[600px] bg-white p-8 text-white shadow-lg transition-all duration-300 delay-150 flex-shrink-0">
                                <p className="text-black p-6" style={{ fontFamily: "DM Sans" }}></p>
                            </div>
                        </div>
                        <div className="text-black px-5 h-[200px] min-w-[400px] flex-1">
                            <div className="h-100 min-w-[400px] bg-white mb-5 p-8 text-white shadow-lg">
                                <h1 className="text-white text-4xl mb-2" style={{ fontFamily: "DM Sans" }}></h1>
                            </div>
                            <div className="h-100 h-[200px] min-w-[400px] bg-white mb-5 p-8 text-white shadow-lg">
                                <h1 className="text-white text-4xl mb-2" style={{ fontFamily: "DM Sans" }}></h1>
                            </div>
                            <div className="h-100 h-[200px] min-w-[400px] bg-white mb-5d p-8 text-white shadow-lg">
                                <h1 className="text-white text-4xl mb-2" style={{ fontFamily: "DM Sans" }}></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 text-white p-4 rounded-full shadow-lg transition-all z-[9999]"
                    style={{ backgroundColor: "#ea4b33" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#b34836"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ea4b33"}
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed bottom-6 right-6 bg-white shadow-2xl z-[9999] w-[90%] max-w-sm flex flex-col"
                    style={{ fontFamily: "DM Sans", height: "500px" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: "#ea4b33" }}>
                        <h3 className="text-lg font-bold text-white">Chat</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        <div className="text-gray-500 text-sm text-center">
                            Start a conversation
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-3 py-2 border focus:outline-none focus:ring-2 text-gray-800"
                                style={{ outlineColor: "#ea4b33" }}
                            />
                            <button
                                className="text-white p-2 transition-colors"
                                style={{ backgroundColor: "#ea4b33" }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#b34836"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ea4b33"}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}