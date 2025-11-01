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
      <div className="h-screen w-screen"  style={{ backgroundColor: "#ffffffff"}}>
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
            <div className="flex justify-between w-full" style={{ fontFamily: "DM Sans" }}>
              <div className='w-30'>
                  <h1 className="text-red-800 pt-5 pl-5">ShowMedia.AI</h1>
              </div>
              <div className="flex flex-col justify-center transition-all duration-500 ease-in-out">  
                  <div className="h-[85vh] py-5">
                    <p></p>
                  </div>
                  <div className="text-black px-5 pt-5 flex-1">
                          <div className="bg-white fixed-bottom flex w-[50vw] h-[75px] hover:scale-[1.01] rounded-md text-gray-500 shadow-lg transition-all ease-in-out duration-300">
                            <div className="py-10 px-2 flex items-center bg-white border border-gray-300 rounded-md flex-shrink-0">
                            <input placeholder="Ask Chatbot Anything" className="p-5 w-[50vw] py-2 h-[80px] focus:outline-none" />
                            <button className="hover:scale-[0.96] pr-5 hover:text-gray-600 hover:cursor-pointer duration-300">Submit</button>
                            </div>
                          </div>
                  </div>
              </div>
              <div className="w-30">
              </div>
            </div>
        </div>
    </div>
    )
}