"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, MessageCircle, EllipsisVertical, History, X, Send, Trash2 } from 'lucide-react';
import smslogo from "@/assets/widelogo.png";
import { historyProps } from '@/app/components/historycards';
import { UserDropdown } from '@/app/icondrop/UserDropdown'
import ChatInterface from '@/app/components/chatInterface';


interface Document {
    id: number;
    name: string;
    date: string;
}

export default function Home() {
    const [activeItem, setActiveItem] = useState('Overview');
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpenedChat, setHasOpenedChat] = useState(false);
    const [message, setMessage] = useState('');
    const navItems = [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/chat", icon: MessageSquare, label: "Chat" },
    ];
    const [payrollItems, setPayrollItems] = useState([
        { id: 1, name: 'Item 1', amount: 4500, dueDate: '2025-11-15', status: 'pending' },
        { id: 2, name: 'Item 2', amount: 5200, dueDate: '2025-11-15', status: 'pending' },
        { id: 3, name: 'Item 3', amount: 3800, dueDate: '2025-11-10', status: 'overdue' },
        { id: 4, name: 'Item 4', amount: 4800, dueDate: '2025-11-20', status: 'payment' },
        { id: 5, name: 'Item 5', amount: 4800, dueDate: '2025-11-20', status: 'payment' },
        { id: 6, name: 'Item 6', amount: 4800, dueDate: '2025-11-20', status: 'payment' },
        { id: 7, name: 'Item 7', amount: 4800, dueDate: '2025-11-20', status: 'payment' },
        { id: 8, name: 'Item 8', amount: 4800, dueDate: '2025-11-20', status: 'payment' },
    ]);


    const [activeTab, setActiveTab] = useState<'payment' | 'pending' | 'overdue'>('payment');
    const filteredItems = payrollItems.filter(item => item.status === activeTab);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'payment': return 'text-green-600';
            case 'pending': return 'text-yellow-600';
            case 'overdue': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };
    
    const [documents, setDocuments] = useState<Document[]>([]);
    const [showMenu, setShowMenu] = useState<number | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const today = new Date();
            const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const newDoc: Document = {
                id: Date.now(),
                name: files[0].name,
                date: localDate
            };
            setDocuments([newDoc, ...documents]);
        }
        e.target.value = '';
    };

    const handleDelete = (id: number) => {
        setDocuments(documents.filter(doc => doc.id !== id));
        setShowMenu(null);
    };


    return (
        <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff", fontFamily: "'Montserrat', sans-serif" }}>
            <div className="flex h-screen">
                <div className="flex-1 w-full overflow-y-auto">
                    <div className="flex border-b border-gray-300 text-gray-700 w-full justify-between items-center gap-5 p-2">
                        <div className="flex"><Image src={smslogo} alt="logo" className="w-40 h-auto" /></div>
                        <div className="flex w-full justify-between items-center gap-5">
                            <div className="flex gap-5">
                                <Link href="/calendar" className="hover:text-gray-600 transition-colors cursor-pointer">
                                    Calendar
                                </Link>
                                <a href="https://app.hubspot.com/login?hubs_signup-url=www.hubspot.com%2Fproducts%2Fdata&hubs_signup-cta=nav-utility-login&hubs_content=www.hubspot.com%2Fproducts%2Fdata&hubs_content-cta=nav-utility-login&uuid=anon2907328735ba182f3362a12b0f4c" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors cursor-pointer">
                                    <p>HubSpot</p>
                                </a>
                                <p>Resources</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right"><p><b>Show Media</b></p>
                                    <p className='text-xs'>showmedia@gmail.com</p></div>
                                <UserDropdown />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 p-4 flex-wrap transition-all duration-500 ease-in-out gap-2 pt-6" style={{ backgroundColor: "#fafafaff" }}>
                        <div className="text-black appear px-2 min-w-[400px] flex-1">
                            <div className="min-w-[350] round mb-5 p-6 text-white transition-all duration-300 flex-shrink-0" style={{ backgroundColor: "#e35540" }}>
                                <h1 className="text-white font-bold text-4xl mb-2">MY DASHBOARD</h1>
                                <p className="text-md text-white">Manage all activities here</p>
                            </div>
                            <div className="min-w-[350px] border-[0.5] border-gray-200 min-h-[765px] bg-white p-8 text-white transition-all duration-300 delay-150 flex-shrink-0">
                                <h1 className="text-gray-900 text-2xl font-bold mb-4">
                                    Payroll
                                </h1>

                                <div className="flex gap-10 mb-6 border-b border-gray-200">
                                    <button
                                        onClick={() => setActiveTab('payment')}
                                        className={`text-lg pb-2 transition-colors ${activeTab === 'payment' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-gray-900 hover:cursor-pointer'}`}
                                    >
                                        Payment
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('pending')}
                                        className={`text-lg pb-2 transition-colors ${activeTab === 'pending' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-700 hover:text-gray-900 hover:cursor-pointer'}`}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('overdue')}
                                        className={`text-lg pb-2 transition-colors ${activeTab === 'overdue' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700 hover:text-gray-900 hover:cursor-pointer'}`}
                                    >
                                        Overdue
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left text-gray-700 font-semibold py-3 px-4">Name</th>
                                                <th className="text-left text-gray-700 font-semibold py-3 px-4">Amount</th>
                                                <th className="text-left text-gray-700 font-semibold py-3 px-4">Due Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredItems.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="text-gray-800 py-4 px-4">{item.name}</td>
                                                    <td className={`py-4 px-4 font-semibold ${getStatusColor(item.status)}`}>
                                                        ${item.amount.toLocaleString()}
                                                    </td>
                                                    <td className="text-gray-600 py-4 px-4">{item.dueDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {filteredItems.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            No {activeTab} items found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="appear text-black px-2 min-w-[400px] flex-1">
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


                                <div className="h-[380px] min-w-[400px] bg-white mb-5 p-8 text-white round flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <h1 className="text-gray-900 text-2xl font-bold">Documents</h1>
                                        <label htmlFor="file-upload" className="bg-gray-200 hover:bg-gray-300 transition-colors px-4 py-2 flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
                                            <span className="text-xl">+</span>
                                            Upload</label>
                                        <input
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                                accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"/>
                                    </div>
                                    {documents.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center text-center">
                                            <div>
                                                <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500 text-lg mb-2">No documents yet</p>
                                                <p className="text-gray-400 text-sm">Click the Upload button to add document files</p>
                                            </div>
                                    </div>
                                    ) : (
                                    <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-2">
                                        {documents.map((doc) => (
                                            <div key={doc.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors flex items-start gap-3">
                                                <FileText size={20} className="text-gray-600 mt-1 flex-shrink-0" />
                                                <p className="text-gray-900 text-sm font-medium truncate flex-1">{doc.name}</p>
                                                <p className="text-gray-500 text-xs whitespace-nowrap">{doc.date}</p>
                                                <div className="relative">
                                                    <EllipsisVertical 
                                                        size={18}
                                                        className="text-gray-500 cursor-pointer hover:text-gray-700" 
                                                        onClick={() => setShowMenu(showMenu === doc.id ? null : doc.id)}
                                                    />
                                                    {showMenu === doc.id && (
                                                        <div className="absolute right-0 mt-1 bg-white border border-gray-200 hover:bg-red-50 shadow-lg py-1 z-10 min-w-[100px]">
                                                            <button
                                                                onClick={() => handleDelete(doc.id)}
                                                                className="w-full px-4 py-2 text-left text-xs text-red-600 flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <Trash2 size={14} />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>)}
                                </div>

                            <div className="h-[360px] min-w-[400px] bg-white mb-5 p-8 flex flex-col round">
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
                                            <h3 className="text-gray-900 font-semibold text-sm mt-1">Team Meeting</h3>
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
                                            <h3 className="text-gray-900 font-semibold text-sm mt-1">Project Deadline</h3>
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
                                            <h3 className="text-gray-900 font-semibold text-sm mt-1">Client Presentation</h3>
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
                                            <h3 className="text-gray-900 font-semibold text-sm mt-1">Training Session</h3>
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
                                            <h3 className="text-gray-900 font-semibold text-sm mt-1">Monthly Review</h3>
                                            <p className="text-gray-600 text-xs">3:00 PM - 4:00 PM</p>
                                            <p className="text-gray-500 text-xs mt-1">Main Office</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Button */}
                    {!isOpen && (
                        <button
                            onClick={() => {
                                setIsOpen(true);
                                setHasOpenedChat(true);
                            }}
                            className="fixed bottom-6 right-6 text-white p-4 rounded-full transition-all z-[9999] ease-in-out hover:scale-[1.04] hover:cursor-pointer"
                            style={{ backgroundColor: "#ea4b33" }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#b34836"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ea4b33"}
                        >
                            <MessageSquare size={24} />
                        </button>
                    )}

                    {/* Chat Window - Mount once opened, then persist to keep messages */}
                    {hasOpenedChat && (
                        <div style={{ display: isOpen ? 'block' : 'none' }}>
                            <ChatInterface onClose={() => setIsOpen(false)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}