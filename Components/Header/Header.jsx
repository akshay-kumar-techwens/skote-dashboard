import React from 'react';
import { Menu, Search, LayoutGrid, Maximize, Bell, Settings, ChevronDown } from 'lucide-react';

const Header = () => {
    // Load user
    const rawUser = localStorage.getItem("user");
    let currentUser = null;

    try {
        currentUser = rawUser ? JSON.parse(rawUser) : null;
    } catch {
        currentUser = null;
    }

    const userName = currentUser?.name || "User";

    return (
        <header className="w-full h-[70px] bg-white flex items-center justify-between px-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sticky top-0 z-30">

            {/* Left Section */}
            <div className="flex items-center gap-6">
                <button className="text-[#555b6d] hover:text-[#2a3042] transition-colors">
                    <Menu className="w-5 h-5" />
                </button>

                <div className="hidden sm:flex items-center bg-[#f3f3f9] rounded-full px-4 h-[38px] w-[240px]">
                    <Search className="w-4 h-4 text-[#74788d]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-none bg-transparent focus:outline-none text-[13px] text-[#495057] placeholder-[#74788d] w-full ml-2"
                    />
                </div>

                <div className="hidden lg:block relative">
                    <button className="flex items-center gap-1 text-[#555b6d] text-[14px] font-medium hover:text-[#2a3042]">
                        Mega Menu <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-5">

                <button className="relative text-[#555b6d] hover:text-[#2a3042] transition-colors">
                    <Bell className="w-[22px] h-[22px]" strokeWidth={1.5} />
                    <span className="absolute -top-1.5 -right-1 bg-[#f46a6a] text-white text-[11px] font-semibold flex items-center justify-center h-[18px] min-w-[18px] rounded-full px-1 border-2 border-white">
                        3
                    </span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 cursor-pointer pl-2">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="admin"
                        className="w-[36px] h-[36px] rounded-full bg-gray-100 object-cover border border-gray-100"
                    />
                    <div className="hidden xl:flex items-center gap-1">
                        <span className="text-[#555b6d] text-[14px] font-medium">
                            {userName}
                        </span>
                        <ChevronDown className="w-3 h-3 text-[#555b6d]" />
                    </div>
                </div>

                <button className="text-[#555b6d] hover:text-[#2a3042] transition-colors">
                    <Settings className="w-[22px] h-[22px] animate-spin-slow" strokeWidth={1.5} />
                </button>
            </div>
        </header>
    );
};

export default Header;
