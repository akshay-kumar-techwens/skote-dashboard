import React from 'react';

// --- Icons (Recreated as SVG components to match Lucide icons) ---
const CopyIcon = ({ className = "w-6 h-6" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const ArchiveIcon = ({ className = "w-6 h-6" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="21 8 21 21 3 21 3 8"></polyline>
        <rect x="1" y="3" width="22" height="5"></rect>
        <line x1="10" y1="12" x2="14" y2="12"></line>
    </svg>
);

const TagIcon = ({ className = "w-6 h-6" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
);

// --- Components ---
const StatCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] border border-gray-100 flex items-center justify-between h-full">
            <div className="flex flex-col space-y-1">
                <span className="text-[#74788d] font-medium text-[14px] tracking-wide truncate">{title}</span>
                <span className="text-[#495057] font-semibold text-[20px]">{value}</span>
            </div>

            {/* Icon Container with specialized styling to match the 'shine' effect */}
            <div className="relative w-[48px] h-[48px] bg-[#556ee6] rounded-full flex items-center justify-center overflow-hidden shrink-0 ml-4">
                {/* The gradient overlay for the glossy effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />

                {/* The Icon */}
                <Icon className="w-5 h-5 text-white relative z-10 stroke-[1.5]" />
            </div>
        </div>
    );
};

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            <StatCard
                title="Orders"
                value="1,235"
                icon={CopyIcon}
            />
            <StatCard
                title="Revenue"
                value="$35, 723"
                icon={ArchiveIcon}
            />
            <StatCard
                title="Average Price"
                value="$16.2"
                icon={TagIcon}
            />
        </div>
    );
};

export default DashboardStats;
