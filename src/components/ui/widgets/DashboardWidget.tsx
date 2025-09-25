import React from "react";

interface DashboardWidgetProps {
    icon: string;
    count: number;
    title: string;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ icon, count, title }) => {
    return (
        <div className="relative w-full md:h-[120px] rounded-2xl bg-white border border-[#E7E7E7] flex items-center justify-start lg:gap-6 gap-4 md:p-5 p-2 font-manrope">
                <div className="md:w-18 w-10 md:h-18 h-10 md:rounded-xl rounded-lg border border-[#E7E7E7] flex items-center justify-center bg-[#EDD8FF]">
                    <img
                        src={icon}
                        alt={icon}
                        className="w-3/5 aspect-square"
                    />
                </div>
            <div className="font-inter">
                <p className="text-[#282828] font-bold md:text-4xl text-xl">{count}</p>
                <p className="lg:text-lg md:text-base text-sm text-[#646464] font-medium">{title}</p>
            </div>
        </div>
    );
};

export default DashboardWidget;
