"use client";
import { useState } from 'react';
import { LayoutDashboard,   FileText, Users, MessageSquare, MoreHorizontal, Search, Bell, User } from 'lucide-react';


export default function Chat() {
    const [activeItem, setActiveItem] = useState('Overview');

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Documents', icon: FileText },
    { name: 'Crew', icon: Users },
    { name: 'Chat', icon: MessageSquare },
    { name: 'More', icon: MoreHorizontal }
  ];

  return(
      <div className="h-screen w-screen"  style={{ backgroundColor: "#F6E8E8"}}>
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
            <div className="flex overflow-y-auto w-full" style={{ fontFamily: "DM Sans" }}>
              <div>
                  <h1 className="text-red-800 pt-5 px-5 ">ShowMedia.AI</h1>
              </div>
              <div className="flex flex-1 p-5 justify-center flex-wrap overflow-y-auto transition-all duration-500 ease-in-out">  
                  <div className="fixed bottom-6 text-black px-5 pt-5 flex-1">
                          <div className="bg-white w-[50vw] h-[80px] rounded-md text-gray-500 shadow-lg flex-shrink-0">
                            <input placeholder="Ask Chatbot Anything" className="p-5 w-[50vw] py-2 h-[80px] focus:outline-none border border-gray-300 rounded-md flex-shrink-0" />
                          </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
    )
}