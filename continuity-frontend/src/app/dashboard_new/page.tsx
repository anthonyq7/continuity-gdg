"use client";
import { useState } from 'react';
import Image from "next/image";
import { LayoutDashboard, FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User, HandCoins, CalendarDays, X, Send } from 'lucide-react';
import Link from "next/link";
import smslogo from "@/assets/widelogo.png";
import { NavBar } from '@/app/components/navbar';

export default function Home() {
    const [activeItem, setActiveItem] = useState('Overview');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navItems = [
        { href: "/dashboard_new", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/chat", icon: MessageSquare, label: "Chat" },
    ];

    return (
        <div className="h-screen w-screen" style={{ backgroundColor: "#ffffff" }}>
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
                <div className="flex-1 w-full appear overflow-y-auto" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                    <div className="flex items-center p-5 justify-between gap-4">
                        <h1 className="font-bold" style={{ color: "#ea4b33" }}>Overview</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex border-1 h-10 border-gray-300">
                                <input className="p-2 w-30 lg:w-50 duration-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Search"/>
                                <button className="bg-gray-100 hover:bg-gray-300 p-2 duration-100"><Search/></button>
                                <button></button>
                            </div>
                            <User className="h-10 w-10 p-2 bg-gray-500 rounded-full"/>
                        </div>
                    </div>
                    <div className="flex flex-1 p-5 flex-wrap transition-all duration-500 ease-in-out">
                        <div className="text-black px-5 min-w-[400px] flex-1">
                            <div className="min-w-[350] mb-5 p-6 text-white shadow-lg transition-all duration-300 delay-150 flex-shrink-0" style={{ backgroundColor: "#ea4b33" }}>
                                <h1 className="text-white font-bold text-4xl mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>MY DASHBOARD</h1>
                                <p className="text-md text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>Manage all activities here</p>
                            </div>
                            <div className="min-w-[350] h-[770px] bg-white p-8 text-white shadow-lg transition-all duration-300 delay-150 flex-shrink-0">
                                <h1 className="text-gray-900 text-3xl font-bold mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                                    Payroll / Vendor (TBD)
                                </h1>
                                <p className="text-gray-700">
                                    will be designing this hub
                                </p>
                            </div>
                        </div>
                        <div className="text-black px-5 h-[200px] min-w-[400px] flex-1">
                            <div className="h-[185px] min-w-[400px] bg-white mb-5 p-8 text-white shadow-lg">
                                <h1 className="text-gray-900 text-2xl mb-3 font-bold" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                                    Progress Check
                                </h1>
                                <div className="space-y-3">
                                    {/* Progress Item 1 */}
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-700 text-sm font-medium">Project Completion</span>
                                            <span className="text-gray-600 text-sm">75%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-2">
                                            <div className="h-2 transition-all duration-300" style={{ width: '75%', backgroundColor: '#ea4b33' }}></div>
                                        </div>
                                    </div>

                                    {/* Progress Item 2 */}
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-700 text-sm font-medium">Tasks Completed</span>
                                            <span className="text-gray-600 text-sm">12/20</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-2">
                                            <div className="h-2 transition-all duration-300" style={{ width: '60%', backgroundColor: '#ea4b33' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[365px] min-w-[400px] bg-white mb-5 p-8 text-white shadow-lg">
                                <h1 className="text-gray-900 text-2xl mb-4 font-bold" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                                    Documents Hub
                                </h1>
                                <p className="text-gray-700">
                                    need future design on documents
                                </p>
                            </div>

                            <div className="h-[320px] min-w-[400px] bg-white mb-5 p-8 shadow-lg flex flex-col">
                                <h1 className="text-gray-900 text-2xl mb-1 font-bold flex-shrink-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                                    Upcoming Events
                                </h1>
                                <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                                    {/* Event 1 */}
                                    <div className="flex gap-2 p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#ea4b33" }}>
                                            <span className="text-white text-xs font-semibold">NOV</span>
                                            <span className="text-white text-2xl font-bold">15</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 font-semibold text-sm">Team Meeting</h3>
                                            <p className="text-gray-600 text-xs">10:00 AM - 11:30 AM</p>
                                            <p className="text-gray-500 text-xs mt-1">Conference Room A</p>
                                        </div>
                                    </div>

                                    {/* Event 2 */}
                                    <div className="flex gap-2 p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#ea4b33" }}>
                                            <span className="text-white text-xs font-semibold">NOV</span>
                                            <span className="text-white text-2xl font-bold">18</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 font-semibold text-sm">Project Deadline</h3>
                                            <p className="text-gray-600 text-xs">5:00 PM</p>
                                            <p className="text-gray-500 text-xs mt-1">Submit final report</p>
                                        </div>
                                    </div>

                                    {/* Event 3 */}
                                    <div className="flex gap-2 p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#ea4b33" }}>
                                            <span className="text-white text-xs font-semibold">NOV</span>
                                            <span className="text-white text-2xl font-bold">22</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 font-semibold text-sm">Client Presentation</h3>
                                            <p className="text-gray-600 text-xs">2:00 PM - 3:30 PM</p>
                                            <p className="text-gray-500 text-xs mt-1">Virtual Meeting</p>
                                        </div>
                                    </div>

                                    {/* Event 4 */}
                                    <div className="flex gap-2 p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#ea4b33" }}>
                                            <span className="text-white text-xs font-semibold">NOV</span>
                                            <span className="text-white text-2xl font-bold">25</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 font-semibold text-sm">Training Session</h3>
                                            <p className="text-gray-600 text-xs">9:00 AM - 12:00 PM</p>
                                            <p className="text-gray-500 text-xs mt-1">Room 301</p>
                                        </div>
                                    </div>

                                    {/* Event 5 */}
                                    <div className="flex gap-2 p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#ea4b33" }}>
                                            <span className="text-white text-xs font-semibold">DEC</span>
                                            <span className="text-white text-2xl font-bold">01</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 font-semibold text-sm">Monthly Review</h3>
                                            <p className="text-gray-600 text-xs">3:00 PM - 4:00 PM</p>
                                            <p className="text-gray-500 text-xs mt-1">Main Office</p>
                                        </div>
                                    </div>
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
                        className="fixed bottom-6 right-6 bg-white shadow-2xl z-[9999] w-[450px] flex flex-col"
                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', height: "600px" }}
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
        </div>
    )
}