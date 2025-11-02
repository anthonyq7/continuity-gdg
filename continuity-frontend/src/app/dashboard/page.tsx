"use client";
import { useState } from 'react';
import { LayoutDashboard, FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User, X, Send } from 'lucide-react';
import Link from "next/link";

export default function Home() {
    const [activeItem, setActiveItem] = useState('Overview');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const navItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'Documents', icon: FileText },
        { name: 'Crew', icon: Users },
        { name: 'Chat', icon: MessageSquare },
        { name: 'More', icon: MoreHorizontal }
    ];

    return (
        <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff" }}>
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
                                            className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium transition-colors ${isActive
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
                        <h1 className="text-red-800 pt-5 px-5" style={{ color: "#ea4b33" }}>Overview</h1>
                    </div>
                    <div className="flex flex-1 p-5 flex-wrap transition-all duration-500 ease-in-out">
                        <div className="text-black px-5 min-w-[400px] flex-1">
                            <div className="min-w-[350] bg-red-800 mb-5 p-6 text-white shadow-lg transition-all duration-300 delay-150 flex-shrink-0" style={{ backgroundColor: "#ea4b33" }}>
                                <h1 className="text-white font-bold text-4xl mb-2" style={{ fontFamily: "DM Sans" }}>My Dashboard</h1>
                                <p className="text-md text-white" style={{ fontFamily: "DM Sans" }}>Manage all activities here</p>
                            </div>
                            <div className="min-w-[350] h-[600] bg-white p-8 text-white shadow-lg transition-all duration-300 delay-150 flex-shrink-0">
                                <p className="text-black p-6" style={{ fontFamily: "DM Sans" }}></p>
                            </div>
                        </div>
                        <div className="text-black px-5 min-w-[400px] flex-1">
                            <div className="h-100 min-w-[400px] bg-white mb-5 p-8 text-white shadow-lg">
                                <h1 className="text-white text-4xl mb-2" style={{ fontFamily: "DM Sans" }}></h1>
                            </div>
                            <div className="h-100 min-w-[400px] bg-white mb-5 p-8 text-white shadow-lg">
                                <h1 className="text-white text-4xl mb-2" style={{ fontFamily: "DM Sans" }}></h1>
                            </div>
                            <div className="h-100 min-w-[400px] bg-white mb-5 text-white shadow-lg">
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
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#cd5540"}
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
                    <div className="flex items-center justify-between p-4 border-b bg-red-800" style={{ backgroundColor: "#ea4b33" }}>
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
                                className="flex-1 px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-800"
                            />
                            <button className="bg-red-800 text-white p-2 hover:bg-red-900 transition-colors">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}