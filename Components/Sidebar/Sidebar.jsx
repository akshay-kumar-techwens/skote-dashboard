import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import MenuItemComponent from './MenuItem';
import { Hexagon } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { UserRole } from '../../Pages/Auth/Signup/types';

const API_URL = "http://localhost:5000/api";

// 👉 LocalStorage se user safe way me fetch karne ka function
const getCurrentUser = () => {
    try {
        const row = localStorage.getItem("user");
        if (!row) return null;

        const parsed = JSON.parse(row);

        // Role hona zaroori hai
        if (!parsed.role) return null;

        return parsed;
    } catch (error) {
        console.error("Invalid JSON in localStorage");
        return null;
    }
};

// 👉 ROLE-BASED FILTER FUNCTION
// 👉 PERMISSION-BASED FILTER FUNCTION
const filterMenuByRole = (items, user) => {
    if (!user) return [];

    // Super Admin sees everything
    if (user.role === 'super_admin') return items;

    const userPermissions = user.permissions || [];

    return items
        .filter(item => {
            // Section headers should be shown if any of their children are shown (complex logic), 
            // OR currently just show them if they are static headers.
            if (item.isSectionHeader) return true; // Simplify: Show headers. Could refine to hide empty sections later.

            // Check if item ID is in permissions
            const hasPermission = userPermissions.includes(item.id);

            // Also check if any subItem has permission (so parent remains visible)
            if (!hasPermission && item.subItems) {
                return item.subItems.some(sub => userPermissions.includes(sub.id));
            }

            return hasPermission;
        })
        .map(item => {
            // Filter subItems
            if (item.subItems) {
                const filteredSub = item.subItems.filter(sub =>
                    userPermissions.includes(sub.id)
                );
                return { ...item, subItems: filteredSub };
            }
            return item;
        })
        // Remove items that have subItems but all were filtered out (empty parents)
        .filter(item => {
            if (item.subItems && item.subItems.length === 0) return false;
            return true;
        });
};

const Sidebar = () => {

    // Stabilize currentUser to prevent infinite loops
    const currentUser = React.useMemo(() => getCurrentUser(), []);
    // const currentUser = getCurrentUser(); // Old unstable line
    const userRole = currentUser?.role;

    console.log("CURRENT USER:", currentUser);
    console.log("CURRENT USER ROLE:", userRole);

    // User not logged in
    if (!currentUser) {
        return (
            <div className="w-full p-6 font-sans text-red-500 text-xl">
                ❌ Error: User not logged in or invalid user data
            </div>
        );
    }

    const navigate = useNavigate();
    const location = useLocation();

    const filteredMenu = React.useMemo(() => {
        return filterMenuByRole(MENU_ITEMS, currentUser);
    }, [currentUser]);

    const [expandedItems, setExpandedItems] = useState({
        'dashboards': true
    });

    const [activeItem, setActiveItem] = useState('dash-default');

    // URL ke hisaab se active item set karna
    React.useEffect(() => {
        const currentPath = location.pathname;

        for (const item of filteredMenu) {

            if (item.link === currentPath) {
                setActiveItem(item.id);
                return;
            }

            if (item.subItems) {
                for (const subItem of item.subItems) {
                    if (subItem.link === currentPath) {
                        setActiveItem(subItem.id);
                        setExpandedItems(prev => ({ ...prev, [item.id]: true }));
                        return;
                    }
                }
            }
        }
    }, [location.pathname, filteredMenu]);

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleItemClick = (item) => {
        setActiveItem(item.id);
        if (item.link) navigate(item.link);
    };

    const handlelogout = async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="w-[250px] bg-[#2a3042] h-full flex flex-col shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] z-40">

            {/* Logo Section */}
            <div className="h-[70px] flex items-center justify-center sticky top-0 bg-[#2a3042] z-10">
                <a href="#" className="flex items-center gap-2.5 text-white no-underline">
                    <div className="relative w-6 h-6 text-[#556ee6]">
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
                    {filteredMenu.map((item, index) => {

                        // Section Header render
                        if (item.isSectionHeader) {
                            return (
                                <li key={index} className="px-6 mt-6 mb-2">
                                    <span className="text-[11px] font-semibold text-[#6a7187] uppercase tracking-wider">
                                        {item.title}
                                    </span>
                                </li>
                            );
                        }

                        // Normal Menu Item
                        return (
                            <MenuItemComponent
                                key={item.id}
                                item={item}
                                isExpanded={expandedItems[item.id] || false}
                                isActive={activeItem === item.id}
                                activeChildId={activeItem}
                                onToggle={() => toggleExpand(item.id)}
                                onClick={(clickedItem) => handleItemClick(clickedItem)}
                            />
                        );
                    })}
                </ul>
            </div>

            {/* Logout Button */}
            <div className="h-[60px] flex items-center px-6 bg-[#2a3042] border-t border-[#32394e]">
                <button
                    onClick={handlelogout}
                    className="w-full text-left text-white flex items-center gap-3 hover:text-[#ff0000] transition-all"
                >
                    Logout
                </button>
            </div>

        </div>
    );
};

export default Sidebar;
