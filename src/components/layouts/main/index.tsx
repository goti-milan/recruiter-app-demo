import {
    getCityList,
    getQualificationList,
    getRoles,
} from "@/helpers/apis/jobs";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { twMerge } from "tailwind-merge";
import MainSidebar from "./MainSidebar";
import Navbar from "./Navbar";

const MainLayout: React.FC = () => {
    const { pathname } = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const setLayout = () => {
        if (pathname.includes("account-setup")) {
            return false;
        }
        return true;
    };

    const queryClient = useQueryClient();

    async function globalData() {
        try {
            const [cities, qualifications, roles] = await Promise.all([
                await queryClient.ensureQueryData({
                    queryKey: [USE_QUERY_KEYS.GET_CITIES],
                    queryFn: getCityList,
                    gcTime: Infinity,
                    staleTime: Infinity,
                }),
                await queryClient.ensureQueryData({
                    queryKey: [USE_QUERY_KEYS.GET_QUALIFICATIONS],
                    queryFn: getQualificationList,
                    gcTime: Infinity,
                    staleTime: Infinity,
                }),
                await queryClient.ensureQueryData({
                    queryKey: [USE_QUERY_KEYS.GET_ROLES],
                    queryFn: () => getRoles(),
                    gcTime: Infinity,
                    staleTime: Infinity,
                }),
            ]);
            localStorage.setItem("cities", JSON.stringify(cities));
            localStorage.setItem("roles", JSON.stringify(roles));
            localStorage.setItem(
                "qualifications",
                JSON.stringify(qualifications)
            );
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        globalData();
    }, []);

    return (
        <div className="flex lg:flex-row flex-col h-screen font-manrope">
            {setLayout() ? (
                <>
                    <Navbar />
                    <div className="hidden lg:block">
                        <MainSidebar
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />
                    </div>
                    <div
                        className={twMerge(
                            "w-full h-full overflow-auto py-4 md:pl-4 pl-2 pr-4 bg-[#F7FAFF] transition-[width] duration-100 ease-in-out",
                            isCollapsed
                                ? "lg:w-[calc(100%-80px)]"
                                : "lg:w-[calc(100%-230px)]"
                        )}
                    >
                        <Outlet />
                    </div>
                </>
            ) : (
                <div className="w-full h-full">
                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default MainLayout;
