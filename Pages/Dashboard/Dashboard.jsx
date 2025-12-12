import React from 'react';
import ProfileCard from './ProfileCard';
import DashboardStats from './DashboardStats';
import MonthlyEarningCard from './MonthlyEarningCard';
import Chats from './Chats';
import SocialSourceCard from './SocialSourceCard';
import ActivityFeed from './ActivityFeed';
import TopCitiesCard from './TopCitiesCard';
import TransactionTable from './TransactionTable';
import { UserRole } from '../Auth/Signup/types';

// Safe function to get user
const getCurrentUser = () => {
    try {
        const raw = localStorage.getItem("user");
        if (!raw) return null;

        const parsed = JSON.parse(raw);

        // user.role must exist
        if (!parsed.role) return null;

        return parsed;
    } catch {
        console.error("Invalid JSON in localStorage");
        return null;
    }
};

const Dashboard = () => {
    const currentUser = getCurrentUser();
    const userRole = currentUser?.role;

    console.log("CURRENT USER:", currentUser);
    console.log("CURRENT USER ROLE:", userRole);

    if (!currentUser) {
        return (
            <div className="w-full p-6 font-sans text-red-500 text-xl">
                ❌ Error: User not logged in or invalid user data
            </div>
        );
    }

    /* SUPER ADMIN */
    const renderSuperAdminDashboard = () => (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h4 className="text-[18px] font-semibold text-[#495057] uppercase">Dashboard</h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <ProfileCard />
                    <MonthlyEarningCard />
                </div>

                <div className="lg:col-span-8 flex flex-col gap-6">
                    <DashboardStats />
                    <Chats />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <SocialSourceCard />
                <ActivityFeed />
                <TopCitiesCard />
            </div>

            <TransactionTable />
        </>
    );

    /* MANAGER */
    const renderManagerDashboard = () => (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h4 className="text-[18px] font-semibold text-[#495057] uppercase">{userRole} Dashboard</h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <ProfileCard />
                    <MonthlyEarningCard />
                </div>

                <div className="lg:col-span-8 flex flex-col gap-6">
                    <DashboardStats />
                    <Chats />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <SocialSourceCard />
                <ActivityFeed />
                <TopCitiesCard />
            </div>

            <TransactionTable />
        </>
    );

    /* ACCOUNTANT */
    const renderAccountantDashboard = () => (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h4 className="text-[18px] font-semibold text-[#495057] uppercase">Accountant Dashboard</h4>
            </div>

            <TransactionTable />
        </>
    );

    /* ROLE HANDLER */
    const renderDashboardContent = () => {
        if (!userRole) {
            return (
                <div className="text-red-500 text-lg">
                    ❌ Error: User role missing
                </div>
            );
        }

        switch (userRole) {
            case UserRole.SUPER_ADMIN:
                return renderSuperAdminDashboard();

            case UserRole.MANAGER:
                return renderManagerDashboard();

            case UserRole.ACCOUNTANT:
                return renderAccountantDashboard();

            default:
                // For any custom role, show the Manager/Default dashboard
                return renderManagerDashboard();
        }
    };

    return (
        <div className="w-full p-6 font-sans">
            <div className="container mx-auto max-w-[1440px]">
                {renderDashboardContent()}
            </div>
        </div>
    );
};

export default Dashboard;
