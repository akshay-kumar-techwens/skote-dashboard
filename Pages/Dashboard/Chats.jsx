import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Year Data (Jan-Dec)
const yearData = [
    { name: 'Jan', A: 44, B: 13, C: 11 },
    { name: 'Feb', A: 55, B: 23, C: 18 },
    { name: 'Mar', A: 41, B: 20, C: 15 },
    { name: 'Apr', A: 57, B: 8, C: 15 },
    { name: 'May', A: 22, B: 13, C: 21 },
    { name: 'Jun', A: 43, B: 27, C: 14 },
    { name: 'Jul', A: 36, B: 18, C: 11 },
    { name: 'Aug', A: 52, B: 22, C: 18 },
    { name: 'Sep', A: 24, B: 10, C: 17 },
    { name: 'Oct', A: 18, B: 16, C: 12 },
    { name: 'Nov', A: 36, B: 24, C: 20 },
    { name: 'Dec', A: 48, B: 22, C: 18 },
];

// Week Data (Mon-Sun)
const weekData = [
    { name: 'Mon', A: 30, B: 15, C: 12 },
    { name: 'Tue', A: 40, B: 20, C: 18 },
    { name: 'Wed', A: 45, B: 25, C: 10 },
    { name: 'Thu', A: 35, B: 15, C: 22 },
    { name: 'Fri', A: 50, B: 20, C: 15 },
    { name: 'Sat', A: 20, B: 10, C: 10 },
    { name: 'Sun', A: 15, B: 5, C: 8 },
];

// Month Data (1-30)
const monthData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const seed = (i * 13) % 100;
    return {
        name: `${day}`,
        A: 20 + (seed % 30),
        B: 10 + (seed % 15),
        C: 5 + (seed % 10),
    };
});

// Custom colors matched from the image
const COLORS = {
    SeriesA: '#556ee6', // Primary Blue
    SeriesB: '#f1b44c', // Yellow/Orange
    SeriesC: '#34c38f', // Green
};

const Chats = () => {
    // State for the active filter button
    const [activeFilter, setActiveFilter] = useState('Year');

    const getCurrentData = () => {
        switch (activeFilter) {
            case 'Week': return weekData;
            case 'Month': return monthData;
            case 'Year': return yearData;
            default: return yearData;
        }
    };

    const getBarSize = () => {
        switch (activeFilter) {
            case 'Week': return 32;
            case 'Month': return 8;
            case 'Year': return 10;
            default: return 10;
        }
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] border border-gray-100 p-6 h-full flex flex-col">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h4 className="text-[15px] font-semibold text-[#495057] self-start sm:self-auto">
                    Email Sent
                </h4>

                {/* Timeframe Toggles */}
                <div className="flex items-center space-x-1 bg-[#f8f9fa] p-1 rounded-md self-end sm:self-auto">
                    {['Week', 'Month', 'Year'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1 text-[13px] font-medium transition-all rounded-[4px] ${activeFilter === filter
                                    ? 'bg-[#556ee6] text-white shadow-sm'
                                    : 'text-[#495057] hover:bg-gray-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Section */}
            <div className="w-full flex-grow min-h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={getCurrentData()}
                        margin={{
                            top: 10,
                            right: 0,
                            left: -20,
                            bottom: 0,
                        }}
                        barSize={getBarSize()}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#eff2f7"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#74788d', fontSize: 12, dy: 10 }}
                            interval={activeFilter === 'Month' ? 2 : 0}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#74788d', fontSize: 12, dx: -10 }}
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(0, 0, 0, 0.01)' }}
                            contentStyle={{
                                borderRadius: '4px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fff',
                                padding: '10px'
                            }}
                        />
                        <Legend
                            iconType="square"
                            iconSize={10}
                            align="center"
                            verticalAlign="bottom"
                            wrapperStyle={{ paddingTop: '24px' }}
                            formatter={(value) => (
                                <span className="text-[#74788d] text-[13px] ml-1 mr-3">{value}</span>
                            )}
                        />
                        {/* Stacked Bars */}
                        <Bar
                            dataKey="A"
                            name="Series A"
                            stackId="a"
                            fill={COLORS.SeriesA}
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="B"
                            name="Series B"
                            stackId="a"
                            fill={COLORS.SeriesB}
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="C"
                            name="Series C"
                            stackId="a"
                            fill={COLORS.SeriesC}
                            radius={[3, 3, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chats;
