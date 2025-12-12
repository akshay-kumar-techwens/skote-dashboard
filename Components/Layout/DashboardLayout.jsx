import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-[#f8f8fb] overflow-hidden font-sans">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <Header />

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
