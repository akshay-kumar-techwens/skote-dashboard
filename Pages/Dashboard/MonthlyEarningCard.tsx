import React from 'react';
import { ArrowRight } from 'lucide-react';

// --- Helper Components for the Gauge ---

interface GaugeProps {
  percentage: number;
  color: string;
}

const GaugeChart: React.FC<GaugeProps> = ({ percentage, color }) => {
  // Configuration for the gauge
  const numTicks = 30; // Number of ticks in the semi-circle
  const radius = 80; // Radius of the arc
  const tickLength = 12; // Length of each tick line
  const strokeWidth = 3; // Thickness of each tick
  const cx = 100; // Center X of SVG
  const cy = 100; // Center Y of SVG (bottom of the semi-circle)
  
  // Calculate ticks
  const ticks = Array.from({ length: numTicks }, (_, i) => {
    // Angle mapping: 0 index starts at 180 degrees (left), last index ends at 0 degrees (right)
    // We map 0..numTicks-1 to 180..0 degrees
    const angleDeg = 180 - (i / (numTicks - 1)) * 180;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Calculate start and end points for each tick
    const x1 = cx + (radius - tickLength) * Math.cos(angleRad);
    const y1 = cy - (radius - tickLength) * Math.sin(angleRad);
    const x2 = cx + radius * Math.cos(angleRad);
    const y2 = cy - radius * Math.sin(angleRad);

    // Determine if this tick is "active" based on percentage
    // Since ticks go from left (0%) to right (100%), we just check the index
    const isActive = i / (numTicks - 1) < percentage / 100;

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isActive ? color : '#eff2f7'} // Active color or Slate-200
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  });

  return (
    <div className="relative w-[140px] h-[90px] flex justify-center">
      <svg width="100%" height="100%" viewBox="0 0 200 110" className="overflow-visible">
        {ticks}
      </svg>
      
      {/* Text overlay centered at the bottom of the gauge */}
      <div className="absolute bottom-0 flex flex-col items-center justify-end pb-1">
        <span className="text-[22px] font-bold text-[#495057]">
          {percentage}%
        </span>
        <span className="text-[13px] font-medium text-[#74788d] mt-0.5">
          Series A
        </span>
      </div>
    </div>
  );
};

// --- Main Component ---

const MonthlyEarningCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] border border-gray-100 p-6 w-full font-sans h-full">
      {/* Header */}
      <h2 className="text-[15px] font-semibold text-[#495057] mb-6">
        Monthly Earning
      </h2>

      <div className="flex items-start justify-between">
        {/* Left Column: Stats */}
        <div className="flex flex-col pt-1">
          <p className="text-[#74788d] text-[13px] font-medium mb-2">This month</p>
          <h1 className="text-[20px] font-bold text-[#495057] mb-3">
            $34,252
          </h1>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center text-[#34c38f] text-[12px] font-medium">
              <span className="text-[10px] mr-1">▲</span> 
              12%
            </span>
            <span className="text-[#74788d] text-[13px] truncate">
              From previous period
            </span>
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="pt-1 pr-2 shrink-0">
          <GaugeChart percentage={67} color="#556ee6" />
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button className="bg-[#556ee6] hover:bg-[#4458b8] text-white text-[13px] font-medium py-[0.45rem] px-[0.85rem] rounded-[4px] flex items-center gap-1.5 transition-all shadow-sm">
            View More
            <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* Footer Text */}
      <p className="text-[#74788d] text-[13px] mt-4 leading-relaxed">
        We craft digital, graphic and dimensional thinking.
      </p>
    </div>
  );
};

export default MonthlyEarningCard;