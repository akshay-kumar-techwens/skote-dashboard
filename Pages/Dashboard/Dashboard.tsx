import React from 'react';
import ProfileCard from './ProfileCard';
import DashboardStats from './DashboardStats';
import MonthlyEarningCard from './MonthlyEarningCard';
import Chats from './Chats';
import SocialSourceCard from './SocialSourceCard';
import ActivityFeed from './ActivityFeed';
import TopCitiesCard from './TopCitiesCard';
import TransactionTable from './TransactionTable';

const Dashboard: React.FC = () => {

  return (
    <div className="w-full p-6 font-sans">
      <div className="container mx-auto max-w-[1440px]">
        
        {/* Breadcrumb / Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <h4 className="text-[18px] font-semibold text-[#495057] uppercase">Dashboard</h4>
            <div className="text-[13px] font-medium text-[#74788d]">
                <span className="cursor-pointer hover:text-[#556ee6]">Skote</span> 
                <span className="mx-2">/</span> 
                <span className="text-[#556ee6]">Dashboard</span>
            </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Left Column (Profile & Monthly Earning) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Profile Card */}
            <div className="w-full">
              <ProfileCard />
            </div>
            {/* Monthly Earning Card */}
            <div className="w-full flex-1">
              <MonthlyEarningCard />
            </div>
          </div>

          {/* Right Column (Stats & Chart) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Top Row: 3 Stats Cards */}
            <div className="w-full">
              <DashboardStats />
            </div>
            
            {/* Bottom Row: Email Sent Chart */}
            <div className="w-full flex-1">
              <Chats />
            </div>
          </div>

        </div>

        {/* Second Row: 3 Column Widgets */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="w-full h-full">
                <SocialSourceCard />
            </div>
            <div className="w-full h-full">
                <ActivityFeed />
            </div>
            <div className="w-full h-full">
                <TopCitiesCard />
            </div>
        </div>

        {/* Third Row: Transaction Table */}
        <div className="w-full">
          <TransactionTable />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;