import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import MenuItemComponent from './MenuItem';
import { Hexagon } from 'lucide-react';
import axios from 'axios';
const API_URL = "http://localhost:5000/api";

const Sidebar = () => {
    // State to track which parent items are expanded
    const [expandedItems, setExpandedItems] = useState({
        'dashboards': true // Default open based on image
    });

    // State to track the currently active leaf node
    const [activeItem, setActiveItem] = useState('dash-default');

    // Toggle expand/collapse
    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Handle click on a leaf node
    const handleItemClick = (id) => {
        setActiveItem(id);
    };
    //logout function
    const handlelogout=async()=>{
        try {
            await axios.post(`${API_URL}/auth/logout`,{},{withCredentials:true});
            console.log("Logout clicked");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          //redirect to login page
            window.location.href = "/login";
            
        } catch (error) {
            console.error("Logout error:", error);

        }
    }

    return (
        <div className="w-[250px] bg-[#2a3042] h-full flex flex-col shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] z-40">
            {/* Logo Section */}
            <div className="h-[70px] flex items-center justify-center sticky top-0 bg-[#2a3042] z-10">
                <a href="#" className="flex items-center gap-2.5 text-white no-underline">
                    <div className="relative w-6 h-6 text-[#556ee6]">
                        {/* Abstract Geometric Icon simulation */}
                        <Hexagon className="w-full h-full fill-[#556ee6] bg-[#556ee6]/20 rounded-full" strokeWidth={1.5} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-[#2a3042] rounded-full opacity-50"></div>
                        </div>
                    </div>
                    <span className="text-[20px] font-bold tracking-normal text-white">SKOTE</span>
                </a>
            </div>

            {/* Scrollable Menu Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
                <ul>
                    {MENU_ITEMS.map((item, index) => {
                        if (item.isSectionHeader) {
                            return (
                                <li key={index} className="px-6 mt-6 mb-2">
                                    <span className="text-[11px] font-semibold text-[#6a7187] uppercase tracking-wider">
                                        {item.title}
                                    </span>
                                </li>
                            );
                        }

                        return (
                            <MenuItemComponent
                                key={item.id}
                                item={item}
                                isExpanded={expandedItems[item.id] || false}
                                isActive={activeItem === item.id}
                                activeChildId={activeItem}
                                onToggle={() => toggleExpand(item.id)}
                                onClick={(leafId) => handleItemClick(leafId)}
                            />
                        );
                    })}
                </ul>
            </div>
               <div className="h-[60px] flex items-center px-6 bg-[#2a3042] border-t border-[#32394e]">
         <button
    onClick={handlelogout}
    className="w-full text-left text-white flex items-center gap-3 hover:text-[#ff0000] transition-all"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
        />
    </svg>
    Logout
</button>
            </div>
        </div>
    );
};

export default Sidebar;
