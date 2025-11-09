"use client";
import { useState } from 'react';
import Image from "next/image";
import { LayoutDashboard, FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User, HandCoins, CalendarDays, X, Send } from 'lucide-react';
import smslogo from "@/assets/widelogo.png";
import { NavBar } from '@/app/components/navbar';
import {UserDropdown} from '@/app/icondrop/UserDropdown'


export default function Home() {
    const [activeItem, setActiveItem] = useState('Overview');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navItems = [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/chat", icon: MessageSquare, label: "Chat" },
    ];
    return (
        <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff",fontFamily: "'Montserrat', sans-serif" }}>
            <div className="flex h-screen">
                <div className="flex-1 w-full overflow-y-auto">
                    <div className="flex items-center p-2 justify-between gap-4 border-b-[0.5] h-15">
                        <div className="flex"><Image src={smslogo} alt="logo" className="w-40 h-auto" /></div>
                        <div className="flex items-center gap-5">
                            <div className="flex md:border-1 h-10 roundsearch md:border-gray-300 transition-all duration-300 w-[0px] md:w-40 lg:w-60">
                                <input className="text-gray-700 p-3 lg:w-50 transition-all roundsearch w-[0px] md:w-30 duration-300 md:focus:outline-none md:focus:ring-1 md:focus:ring-orange-500 md:focus:border-orange-500" placeholder="Search"/>
                                <button className="hover:bg-gray-300 flex justify-center items-center w-[0px] md:w-10 duration-300 roundsearch hover:cursor-pointer"><Search/></button>
                                <button></button>
                            </div>
                            <p>HubSpot</p>
                            <p>Resources</p>
                            <UserDropdown/>

                        </div>
                    </div>
                    <div className="flex flex-1 p-4 appear flex-wrap transition-all duration-500 ease-in-out gap-2 pt-6" style={{ backgroundColor: "#fafafaff"}}>
                        <div className="text-black px-2 min-w-[400px] flex-1">
                            <div className="min-w-[350] round mb-5 p-6 text-white transition-all duration-300 flex-shrink-0" style={{ backgroundColor: "#e35540" }}>
                                <h1 className="text-white font-bold text-4xl mb-2">MY DASHBOARD</h1>
                                <p className="text-md text-white">Manage all activities here</p>
                            </div>
                            <div className="min-w-[350] h-[770px] round bg-white p-8 text-white transition-all duration-300 delay-150 flex-shrink-0">
                                <h1 className="text-gray-900 text-2xl font-bold mb-4">
                                    Payroll
                                </h1>
                                <div className="flex gap-10"><p className="text-lg text-gray-700">Payment</p>
                                <p className="text-lg text-gray-700">Pending</p>
                                <p className="text-lg text-gray-700">Overdue</p></div>
                            </div>
                        </div>
                        <div className="text-black px-1 h-[200px] min-w-[400px] flex-1">
                            <div className="h-[185px] min-w-[400px] bg-white mb-5 p-8 text-white round">
                                <h1 className="text-gray-900 text-2xl mb-3 font-bold">
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
                                            <div className="h-2 transition-all duration-300" style={{ width: '75%', backgroundColor: '#e35540' }}></div>
                                        </div>
                                    </div>

                                    {/* Progress Item 2 */}
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-700 text-sm font-medium">Tasks Completed</span>
                                            <span className="text-gray-600 text-sm">12/20</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-2">
                                            <div className="h-2 transition-all duration-300" style={{ width: '60%', backgroundColor: '#e35540' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[365px] min-w-[400px] bg-white mb-5 p-8 text-white round">
                                <h1 className="text-gray-900 text-2xl mb-4 font-bold">
                                    Documents
                                </h1>
                                <p className="text-gray-700">
                                    need future design on documents
                                </p>
                            </div>

                            <div className="h-[320px] min-w-[400px] bg-white mb-5 p-8 flex flex-col round">
                                <h1 className="text-gray-900 text-2xl mb-5 font-bold flex-shrink-0">
                                    Upcoming Events
                                </h1>
                                <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                                    {/* Event 1 */}
                                    <div className="flex gap-2 p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#e35540" }}>
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
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#e35540" }}>
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
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#e35540" }}>
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
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#e35540" }}>
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
                                        <div className="flex flex-col items-center justify-center bg-red-100 px-3 py-2 min-w-[60px]" style={{ backgroundColor: "#e35540" }}>
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
                        className="fixed bottom-6 right-6 text-white p-4 rounded-full transition-all z-[9999] ease-in-out hover:scale-[1.04] hover:cursor-pointer"
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
                        style={{height: "600px" }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: "#e35540" }}>
                            <h3 className="text-lg font-bold text-white">Chat</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <X size={20} className="hover:cursor-pointer" />
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
                                    style={{ outlineColor: "#e35540" }}
                                />
                                <button
                                    className="text-white p-2 transition-colors hover:cursor-pointer"
                                    style={{ backgroundColor: "#e35540" }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#8e3123ff"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e35540"}
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