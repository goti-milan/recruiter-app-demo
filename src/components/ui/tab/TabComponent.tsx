export interface Tab {
    id: number;
    icon?: JSX.Element;
    label: string;
    path: string;
}

export interface TabItemProps {
    id: number;
    icon?: JSX.Element;
    label: string;
    isFirst: boolean;
    isLast: boolean;
    isActiveTab: boolean;
    path: string;
    onTabClick: (id: number) => void;
}

// TabComponent.tsx
import React, { JSX } from "react";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

const TabItem: React.FC<TabItemProps> = ({
    id,
    icon,
    label,
    isFirst,
    isLast,
    isActiveTab,
    path,
    onTabClick,
}) => {
    return (
        <Link
            to={path}
            onClick={() => onTabClick(id)}
            className={twMerge(
                "h-[40px] flex-1 flex items-center justify-center gap-2 p-2 rounded-t-xl relative cursor-pointer transition-colors duration-200",
                isActiveTab ? "bg-white" : "bg-[#F7FAFF]"
            )
            }
        >
            <p className="inline-flex items-center gap-2 text-base font-semibold text-black">
                <span className="z-20">{icon}</span> <span className={twMerge("text-sm md:text-base overflow-ellipsis whitespace-nowrap overflow-hidden", !isActiveTab && "hidden md:inline")}>{label}</span>
            </p>
            {/* Right corner - show for first and middle tabs when active */}
            {isActiveTab && !isLast && (
                <div className="w-8 h-8 bg-white absolute z-10 bottom-0 -right-8 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#F7FAFF] after:rounded-bl-2xl"></div>
            )}
            {/* Left corner - show for middle and last tabs when active */}
            {isActiveTab && !isFirst && (
                <div className="w-8 h-8 bg-white absolute z-10 bottom-0 -left-8 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#F7FAFF] after:rounded-br-2xl" />
            )}
        </Link>
    );
};

const TabComponent: React.FC<{
    tabs: Tab[];
    activeTabIndex: number;
    onTabClick: (id: number) => void;
}> = ({ tabs, activeTabIndex, onTabClick }) => {
    return (
        <div className="w-full flex items-center justify-start">
            {tabs.map((tab: Tab, index) => (
                <TabItem
                    key={tab.id}
                    id={tab.id}
                    icon={tab.icon}
                    label={tab.label}
                    isFirst={index === 0}
                    isLast={index === tabs.length - 1}
                    isActiveTab={activeTabIndex === tab.id}
                    path={tab.path}
                    onTabClick={onTabClick}
                />
            ))}
        </div>
    );
};

export default TabComponent;
