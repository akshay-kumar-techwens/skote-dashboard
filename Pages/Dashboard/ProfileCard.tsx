import React from 'react';
import { ArrowRight } from 'lucide-react';

const DashboardIllustration = () => (
  <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* ...SVG content same as before... */}
  </svg>
);

const ProfileCard = () => {

  // Load logged in user
  const rawUser = localStorage.getItem("user");
  let currentUser = null;

  try {
    currentUser = rawUser ? JSON.parse(rawUser) : null;
  } catch {
    currentUser = null;
  }

  const userName = currentUser?.name || "User";
  const userRole = currentUser?.role || "Unknown role";

  return (
    <div className="w-full bg-white rounded-lg shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] overflow-hidden font-sans border border-gray-100 h-full">
      
      {/* Header */}
      <div className="bg-[#d4dafb] relative px-4 pt-4 pb-12">
        <div className="flex justify-between items-start relative z-10">
          <div className="pt-2">
            <h1 className="text-[#556ee6] text-[16px] font-semibold mb-1 leading-tight">
              Welcome Back, {userName}!
            </h1>
            <p className="text-[#556ee6] text-[13px] opacity-80 font-medium">
              Skote Dashboard
            </p>
          </div>
          <div className="w-36 h-20 -mb-4 -mr-2">
            <DashboardIllustration />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-5 relative">
        <div className="flex flex-col sm:flex-row">

          {/* Avatar */}
          <div className="sm:w-[120px] flex-shrink-0 flex flex-col sm:block items-center sm:items-start">
            <div className="-mt-10 mb-3 relative inline-block">
              <div className="h-[72px] w-[72px] rounded-full p-1 bg-white shadow-sm">
                <img 
                  src="https://picsum.photos/id/64/200/200" 
                  alt={userName}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-[15px] font-semibold text-[#495057] leading-snug">
                {userName}
              </h2>
              <p className="text-[13px] text-[#74788d] font-normal mt-0.5">
                {userRole}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 pt-2 sm:pl-4">
            <div className="flex justify-center sm:justify-between gap-8 sm:gap-4 mb-6 sm:mb-8">
              <div className="text-center sm:text-left">
                <h3 className="text-[15px] font-semibold text-[#495057]">125</h3>
                <p className="text-[13px] text-[#74788d]">Projects</p>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-[15px] font-semibold text-[#495057]">$1245</h3>
                <p className="text-[13px] text-[#74788d]">Revenue</p>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <button className="bg-[#556ee6] hover:bg-[#4458b8] text-white text-[13px] font-medium py-[0.45rem] px-[0.85rem] rounded-[4px] inline-flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md active:transform active:scale-95">
                View Profile 
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
