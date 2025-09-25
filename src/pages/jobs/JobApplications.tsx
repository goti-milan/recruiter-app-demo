import AI_Icon from "@/assets/svg/AI_Icon";
import ChecklistIcon from "@/assets/svg/ChecklistIcon";
import ShortlistedIcon from "@/assets/svg/ShortlistedIcon";
import VerifiedIcon from "@/assets/svg/VerifiedIcon";
import TabComponent, { Tab } from "@/components/ui/tab/TabComponent";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { twMerge } from "tailwind-merge";

const tabs: Tab[] = [
    {
        id: 0,
        icon: <AI_Icon />,
        label: "AI Recommended",
        path: ".",
    },
    {
        id: 1,
        icon: <ChecklistIcon />,
        label: "Applied",
        path: "applied",
    },
    {
        id: 2,
        icon: <ShortlistedIcon />,
        label: "Shortlisted",
        path: "shortlisted",
    },
    {
        id: 3,
        icon: <VerifiedIcon />,
        label: "Accepted & Rejected",
        path: "accepted-rejected",
    },
];

const JobApplications: React.FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { pathname } = useLocation();

    useEffect(() => {
        tabs.forEach((tab, index) => {
            if (pathname.includes(tab.path)) {
                setActiveTabIndex(index);
            }
        });
    }, [pathname]);

    return (
        <div className="w-full h-full rounded-2xl lg:py-4 overflow-y-auto">
            <TabComponent
                tabs={tabs}
                activeTabIndex={activeTabIndex}
                onTabClick={(id) => setActiveTabIndex(id)}
            />
            <div
                className={twMerge(
                    "h-full max-h-[calc(100%-40px)] w-full lg:p-4 p-2 bg-white rounded-2xl",
                    activeTabIndex === 0 && "rounded-tr-2xl rounded-tl-none",
                    activeTabIndex === tabs.length - 1 &&
                        "rounded-tl-2xl rounded-tr-none"
                )}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default JobApplications;
