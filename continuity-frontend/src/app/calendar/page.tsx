"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User, HandCoins, CalendarDays, X, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import smslogo from "@/assets/widelogo.png";
import { NavBar } from '@/app/components/navbar';
import { UserDropdown } from '@/app/icondrop/UserDropdown'


export default function Home() {
    const [activeItem, setActiveItem] = useState('Overview');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());

    // Sample events - Using November 2025 dates
    const [events] = useState([
        { date: '2025-11-15', title: 'Team Meeting', time: '10:00 AM' },
        { date: '2025-11-18', title: 'Project Deadline', time: '5:00 PM' },
        { date: '2025-11-22', title: 'Client Presentation', time: '2:00 PM' },
        { date: '2025-11-25', title: 'Training Session', time: '9:00 AM' },
    ]);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const getEventsForDate = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(event => event.date === dateStr);
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day && 
               today.getMonth() === month && 
               today.getFullYear() === year;
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="h-screen w-screen" style={{ backgroundColor: "#ffffffff", fontFamily: "'Montserrat', sans-serif" }}>
            <div className="flex h-screen">
                <div className="flex-1 w-full overflow-y-auto">
                    <div className="flex items-center p-2 justify-between gap-4 border-b-[0.5] h-15">
                        <div className="flex"><Image src={smslogo} alt="logo" className="w-40 h-auto" /></div>
                                       <div className="flex w-full justify-between items-center gap-5">
                            <div className="flex gap-5">
                            <Link href="/dashboard" className="hover:text-gray-600 transition-colors cursor-pointer">
                                Dashboard
                            </Link>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors cursor-pointer">
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

                    {/* Calendar Content */}
                    <div className="p-8" style={{ backgroundColor: "#fafafaff" }}>
                        <div className="max-w-7xl mx-auto">
                            <div className="flex gap-6">
                                {/* LEFT SIDE - Upcoming Events */}
                                <div className="w-80 flex-shrink-0 appear">
                                    <div className="bg-white shadow-sm p-6 sticky top-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
                                        <div className="space-y-3">
                                            {events.map((event, idx) => {
                                                // Parse date correctly to avoid timezone issues
                                                const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number);
                                                const eventDate = new Date(eventYear, eventMonth - 1, eventDay);
                                                
                                                return (
                                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                                                        <div className="flex flex-col items-center justify-center px-3 py-2 min-w-[60px]" style={{ backgroundColor: '#e35540' }}>
                                                            <span className="text-white text-xs font-semibold">
                                                                {eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                                                            </span>
                                                            <span className="text-white text-xl font-bold">
                                                                {eventDate.getDate()}
                                                            </span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-gray-900 font-semibold text-sm">{event.title}</h3>
                                                            <p className="text-gray-600 text-xs">{event.time}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT SIDE - Calendar */}
                                <div className="flex-1">
                                    <div className="bg-white shadow-sm p-6 appear">
                                        <div className="flex items-center justify-between mb-6">
                                            <h1 className="text-3xl font-bold text-gray-900">
                                                {monthNames[month]} {year}
                                            </h1>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={previousMonth}
                                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                >
                                                    <ChevronLeft className="text-gray-600" />
                                                </button>
                                                <button 
                                                    onClick={goToToday}
                                                    className="px-4 py-2 text-sm font-semibold text-white hover:opacity-90 hover:cursor-pointer transition-opacity"
                                                    style={{ backgroundColor: '#e35540' }}
                                                >
                                                    Today
                                                </button>
                                                <button 
                                                    onClick={nextMonth}
                                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                >
                                                    <ChevronRight className="text-gray-600" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Days of Week Header */}
                                        <div className="grid grid-cols-7 gap-2 mb-2">
                                            {daysOfWeek.map(day => (
                                                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Calendar Grid */}
                                        <div className="grid grid-cols-7 gap-2">
                                            {/* Empty cells for days before month starts */}
                                            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                                                <div key={`empty-${index}`} className="aspect-square p-2"></div>
                                            ))}
                                            
                                            {/* Days of the month */}
                                            {Array.from({ length: daysInMonth }).map((_, index) => {
                                                const day = index + 1;
                                                const dayEvents = getEventsForDate(day);
                                                const today = isToday(day);
                                                
                                                return (
                                                    <div 
                                                        key={day} 
                                                        className={`aspect-square p-2 border hover:bg-gray-50 transition-colors cursor-pointer ${
                                                            today ? 'border-2' : 'border-gray-200'
                                                        }`}
                                                        style={today ? { borderColor: '#e35540' } : {}}
                                                    >
                                                        <div className={`text-sm font-semibold mb-1 ${
                                                            today ? 'text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-700'
                                                        }`}
                                                        style={today ? { backgroundColor: '#e35540' } : {}}
                                                        >
                                                            {day}
                                                        </div>
                                                        <div className="space-y-1">
                                                            {dayEvents.map((event, idx) => (
                                                                <div 
                                                                    key={idx} 
                                                                    className="text-xs p-1 rounded text-white truncate"
                                                                    style={{ backgroundColor: '#e35540' }}
                                                                >
                                                                    {event.title}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}