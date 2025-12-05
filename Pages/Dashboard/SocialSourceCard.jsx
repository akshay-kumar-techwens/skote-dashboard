import React from 'react';

// Icons components
const FacebookIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const TwitterIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
);

const InstagramIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

// SocialSourceCard Component
const SocialSourceCard = () => {
    const socialStats = [
        { platform: 'Facebook', sales: 125 },
        { platform: 'Twitter', sales: 112 },
        { platform: 'Instagram', sales: 104 },
    ];

    return (
        <div className="bg-white rounded-lg shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] border border-gray-100 p-6 h-full font-sans">
            {/* Header */}
            <h2 className="text-[15px] font-semibold text-[#495057] mb-6">Social Source</h2>

            {/* Main Highlight */}
            <div className="flex flex-col items-center mb-6">
                {/* Large Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-[#d4dafb] flex items-center justify-center mb-5 text-[#556ee6]">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <FacebookIcon className="w-full h-full" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-[20px] mb-3 text-[#495057]">
                    <span className="font-bold">Facebook</span>
                    <span className="text-[#74788d] font-normal ml-2 text-[15px]">125 sales</span>
                </div>

                {/* Description */}
                <p className="text-center text-[#74788d] text-[13px] leading-6 px-2 mb-6">
                    Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus tincidunt.
                </p>

                {/* Link */}
                <a href="#" className="text-[#556ee6] text-[13px] font-medium hover:underline flex items-center gap-1 transition-colors">
                    Learn more
                    <span className="text-[10px] mt-0.5">➜</span>
                </a>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-2">
                {socialStats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center text-white mb-3 shadow-sm
                ${stat.platform === 'Facebook' ? 'bg-[#556ee6]' : ''}
                ${stat.platform === 'Twitter' ? 'bg-[#50a5f1]' : ''}
                ${stat.platform === 'Instagram' ? 'bg-[#e83e8c]' : ''}
              `}
                        >
                            {stat.platform === 'Facebook' && <FacebookIcon className="w-4 h-4" />}
                            {stat.platform === 'Twitter' && <TwitterIcon className="w-4 h-4" />}
                            {stat.platform === 'Instagram' && <InstagramIcon className="w-4 h-4" />}
                        </div>

                        <div className="text-[15px] font-semibold text-[#495057] mb-1">
                            {stat.platform}
                        </div>
                        <div className="text-[13px] text-[#74788d] font-normal">
                            {stat.sales} sales
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialSourceCard;
