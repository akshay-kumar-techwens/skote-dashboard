import React from 'react';
import { ArrowRight } from 'lucide-react';

const DashboardIllustration = () => (
  <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Desk */}
    <rect x="40" y="110" width="140" height="4" rx="2" fill="#dce0e8" />
    <path d="M60 114L55 135" stroke="#74788d" strokeWidth="2" strokeLinecap="round" />
    <path d="M140 114L145 135" stroke="#74788d" strokeWidth="2" strokeLinecap="round" />
    
    {/* Monitor */}
    <rect x="85" y="70" width="50" height="35" rx="2" fill="#8ba0c8" />
    <rect x="87" y="72" width="46" height="31" rx="1" fill="#ffffff" />
    <path d="M110 105V110" stroke="#8ba0c8" strokeWidth="3" />
    <rect x="100" y="110" width="20" height="2" rx="1" fill="#8ba0c8" />
    {/* Monitor Logo */}
    <circle cx="110" cy="87" r="2" fill="#dce0e8" />

    {/* Plant */}
    <path d="M55 110L58 100L65 100L62 110H55Z" fill="#8f5e48" />
    <path d="M58 100Q50 85 60 85Q70 85 62 100" fill="#558b6e" />
    <path d="M62 100Q75 90 70 80Q65 70 60 100" fill="#6cae8c" />

    {/* Wall Clock */}
    <circle cx="80" cy="30" r="8" fill="#ffffff" opacity="0.8" />
    <path d="M80 30L80 26" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
    <path d="M80 30L83 30" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
    <circle cx="80" cy="30" r="9" stroke="#cbd5e1" strokeWidth="1" />

    {/* Person */}
    <path d="M140 110V95C140 95 150 95 150 110" fill="#fff" stroke="#e2e6f7" strokeWidth="2" /> {/* Chair back */}
    <circle cx="130" cy="75" r="7" fill="#f2d4c6" /> {/* Head */}
    <path d="M130 70C130 70 136 68 136 78C136 78 138 68 130 65C122 62 124 75 124 75" fill="#8d5d46" /> {/* Hair */}
    <path d="M123 82Q130 85 137 82V100H123V82Z" fill="#fde69e" /> {/* Shirt */}
    <path d="M135 85L120 95" stroke="#fde69e" strokeWidth="5" strokeLinecap="round" /> {/* Arm */}
    <circle cx="120" cy="95" r="2" fill="#f2d4c6" /> {/* Hand */}

    {/* Speech Bubble */}
    <rect x="155" y="45" width="20" height="14" rx="4" fill="#fff" />
    <path d="M155 52L150 55L155 56" fill="#fff" />
    <circle cx="160" cy="52" r="1" fill="#cbd5e1" />
    <circle cx="165" cy="52" r="1" fill="#cbd5e1" />
    <circle cx="170" cy="52" r="1" fill="#cbd5e1" />
  </svg>
);

const ProfileCard = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] overflow-hidden font-sans border border-gray-100 h-full">
      {/* Header Section */}
      <div className="bg-[#d4dafb] relative px-4 pt-4 pb-12">
        <div className="flex justify-between items-start relative z-10">
          <div className="pt-2">
            <h1 className="text-[#556ee6] text-[16px] font-semibold mb-1 leading-tight">
              Welcome Back !
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

      {/* Body Section */}
      <div className="px-5 pb-5 relative">
        <div className="flex flex-col sm:flex-row">
          {/* Left Column: Avatar & User Info */}
          <div className="sm:w-[120px] flex-shrink-0 flex flex-col sm:block items-center sm:items-start">
            {/* Avatar Container - Negative Margin to overlap */}
            <div className="-mt-10 mb-3 relative inline-block">
              <div className="h-[72px] w-[72px] rounded-full p-1 bg-white shadow-sm">
                 <img 
                   src="https://picsum.photos/id/64/200/200" 
                   alt="Henry Price"
                   className="h-full w-full rounded-full object-cover"
                 />
              </div>
            </div>
            
            {/* Name & Role */}
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-[15px] font-semibold text-[#495057] leading-snug">
                Henry Price
              </h2>
              <p className="text-[13px] text-[#74788d] font-normal mt-0.5">
                UI/UX Designer
              </p>
            </div>
          </div>

          {/* Right Column: Stats & Actions */}
          <div className="flex-1 pt-2 sm:pl-4">
             {/* Stats Row */}
             <div className="flex justify-center sm:justify-between gap-8 sm:gap-4 mb-6 sm:mb-8">
                <div className="text-center sm:text-left">
                   <h3 className="text-[15px] font-semibold text-[#495057] leading-snug">
                     125
                   </h3>
                   <p className="text-[13px] text-[#74788d] mt-0.5">
                     Projects
                   </p>
                </div>
                <div className="text-center sm:text-left">
                   <h3 className="text-[15px] font-semibold text-[#495057] leading-snug">
                     $1245
                   </h3>
                   <p className="text-[13px] text-[#74788d] mt-0.5">
                     Revenue
                   </p>
                </div>
             </div>

             {/* Button Row */}
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