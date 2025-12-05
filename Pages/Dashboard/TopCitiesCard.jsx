import React from 'react';

// Custom Location Icon to match the "Pin over Ring" look exactly
const LocationIcon = () => (
    <svg width="54" height="54" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#556ee6]">
        {/* Pin Body */}
        <path
            d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 17.92 11.24 19.72C11.64 20.12 12.36 20.12 12.76 19.72C14.58 17.92 19 13.17 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(85, 110, 230, 0.1)"
        />
        {/* Bottom Ellipse/Ring to simulate the hover effect base */}
        <path
            d="M5 19C5 19 8 21.5 12 21.5C16 21.5 19 19 19 19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-30"
        />
    </svg>
);

// Main Component
const TopCitiesCard = () => {
    // Data mocking the image values
    const cityData = [
        {
            id: '1',
            name: 'San Francisco',
            value: 1456,
            barColor: 'bg-[#556ee6]',
            percentage: 100
        },
        {
            id: '2',
            name: 'Los Angeles',
            value: 1123,
            barColor: 'bg-[#34c38f]',
            percentage: 77
        },
        {
            id: '3',
            name: 'San Diego',
            value: 1026,
            barColor: 'bg-[#f1b44c]',
            percentage: 70
        },
    ];

    const topCity = cityData[0];

    return (
        <div className="bg-white rounded-lg shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] border border-gray-100 p-6 h-full font-sans">
            {/* Header */}
            <h2 className="text-[15px] font-semibold text-[#495057] mb-6">
                Top Cities Selling Product
            </h2>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center mb-8">
                <div className="mb-5 transform scale-110">
                    <LocationIcon />
                </div>
                <div className="text-[20px] font-bold text-[#495057] mb-1">
                    {topCity.value.toLocaleString()}
                </div>
                <div className="text-[#74788d] text-[13px] font-normal">
                    {topCity.name}
                </div>
            </div>

            {/* List Section */}
            <div className="flex flex-col">
                {cityData.map((city, index) => (
                    <div
                        key={city.id}
                        className={`grid grid-cols-[1.2fr_0.6fr_1.2fr] items-center py-4 ${index !== cityData.length - 1 ? 'border-b border-[#eff2f7]' : ''}`}
                    >
                        {/* City Name */}
                        <span className="text-[#74788d] text-[13px] font-normal">
                            {city.name}
                        </span>

                        {/* Value */}
                        <span className="text-[#495057] font-semibold text-[14px] text-left pl-2">
                            {city.value.toLocaleString()}
                        </span>

                        {/* Progress Bar */}
                        <div className="w-full flex justify-start pl-4">
                            <div
                                className={`h-[4px] rounded-full ${city.barColor}`}
                                style={{ width: `${city.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCitiesCard;
