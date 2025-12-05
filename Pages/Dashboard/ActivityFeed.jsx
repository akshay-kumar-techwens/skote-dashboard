import React from 'react';

// Lucide React Icons (simplified versions)
const ArrowRight = ({ size = 24, className, strokeWidth = 2 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const MoveRight = ({ size = 24, className, strokeWidth = 2 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M18 8L22 12L18 16" />
        <path d="M2 12H22" />
    </svg>
);

// ActivityFeed Component
const ActivityFeed = () => {
    const activities = [
        {
            id: 1,
            date: '22 Nov',
            content: 'Responded to need "Volunteer Activities"',
            isActive: false,
        },
        {
            id: 2,
            date: '17 Nov',
            content: 'Everyone realizes why a new common language would be desirable... Read More',
            isActive: false,
        },
        {
            id: 3,
            date: '15 Nov',
            content: 'Joined the group "Boardsmanship Forum"',
            isActive: true,
        },
        {
            id: 4,
            date: '22 Nov',
            content: 'Responded to need "In-Kind Opportunity"',
            isActive: false,
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] border border-gray-100 p-6 h-full font-sans">
            <h4 className="text-[15px] font-semibold text-[#495057] mb-6">Activity</h4>

            <div className="relative flex flex-col gap-7">
                {/* Vertical Dashed Line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-px border-l border-dashed border-[#eff2f7]" aria-hidden="true" />

                {activities.map((item) => (
                    <div key={item.id} className="relative z-10 grid grid-cols-[auto_auto_1fr] gap-4 items-start">

                        {/* Column 1: Timeline Icon */}
                        <div className="flex items-start justify-center pt-1">
                            <div
                                className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border transition-colors duration-200 bg-white
                  ${item.isActive
                                        ? 'border-[#556ee6] text-[#556ee6] shadow-[0_0_0_3px_rgba(85,110,230,0.15)]'
                                        : 'border-gray-200 text-[#74788d]'
                                    }`}
                            >
                                <MoveRight size={14} strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Column 2: Date and Arrow */}
                        <div className="flex flex-col items-start min-w-[60px] pt-2">
                            <span className="text-[#495057] font-medium text-[13px] leading-none mb-1.5">
                                {item.date}
                            </span>
                            <ArrowRight className="text-[#74788d] w-3.5 h-3.5" />
                        </div>

                        {/* Column 3: Content */}
                        <div className="pt-1.5">
                            <p className="text-[#74788d] text-[13px] leading-relaxed">
                                {item.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <button className="bg-[#556ee6] hover:bg-[#4458b8] text-white text-[13px] font-medium py-[0.45rem] px-[0.85rem] rounded-[4px] flex items-center gap-1.5 transition-all shadow-sm">
                    <span>View More</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};

export default ActivityFeed;
