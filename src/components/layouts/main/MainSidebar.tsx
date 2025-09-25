import LogoutDailogIcon from "@/assets/svg/log-out/log-out.svg";
import MiniLogo from "@/assets/svg/MiniLogo";
import ConfirmationModal from "@/components/ui/modals/ConfirmationModal";
import ResetPasswordModal from "@/components/ui/modals/ResetPasswordModal";
import { logoutUser, resetPassword } from "@/helpers/apis/auth";
import { showToast } from "@/helpers/helper";
import { DASHBOARD, JOBS, LOGIN, MESSAGES, PROFILE, SARAL_AI, SUPPORT } from "@/routes";
import { ResetPasswordField, resetPasswordSchema } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "primereact/divider";
import React, { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import DashboardIcon from "./svgs/DashboardIcon";
import JobsIcon from "./svgs/JobsIcon";
import LogoutIcon from "./svgs/LogoutIcon";
import MessageIcon from "./svgs/MessageIcon";
import ProfileIcon from "./svgs/ProfileIcon";
import ResetPasswordIcon from "./svgs/ResetPasswordIcon";
import SupportIcon from "./svgs/SupportIcon";
import SaralAiIcon from "./svgs/SaralAi";

const SIDEBAR_ITEMS = [
    { title: "Dashboard", icon: <DashboardIcon />, to: DASHBOARD },
    { title: "Messages", icon: <MessageIcon />, to: MESSAGES },
    { title: "Candidates", icon: <JobsIcon />, to: JOBS },
    { title: "Profile", icon: <ProfileIcon />, to: PROFILE },
     { title: "Saral Ai", icon: <SaralAiIcon />, to: SARAL_AI },
];

const MainSidebar: React.FC<{
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    setVisible?: (visible: boolean) => void;
}> = ({ isCollapsed, setIsCollapsed, setVisible = () => { } }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [isResetPasswordLoader, setIsResetPasswordLoader] = useState(false);


    const handleLogout = async () => {
        setIsLoggedOut(true);
        try {
            const response = await logoutUser();
            if (response) {
                showToast("success", response.data);
                setShowConfirmation(false);
                setVisible(false);
                navigate(LOGIN);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoggedOut(false);
    }

    const resetPasswordForm = useForm<ResetPasswordField>({
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
        mode: "onChange",
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordField) => {
        setIsResetPasswordLoader(true);
        try {
            const response = await resetPassword(data.oldPassword, data.newPassword);
            if (response) {
                showToast("success", response.data);
                setShowResetPassword(false);
                setVisible(false);
                resetPasswordForm.reset();
            }
        } catch (error) {
            console.error(error);
        }
        setIsResetPasswordLoader(false);
    }

    return (
        <div
            className={twMerge(
                "relative w-full h-full bg-primary text-white text-sm font-manrope font-medium transition-all duration-100 ease-in-out",
                isCollapsed ? "lg:w-[80px]" : "lg:w-[230px]"
            )}
        >
            <Link
                to={DASHBOARD}
                className="w-full h-[100px] flex items-center justify-center"
                onClick={() => setVisible(false)}
            >
                {isCollapsed ? (
                    <MiniLogo />
                ) : (
                    <img
                        src="/white-logo-2.webp"
                        alt="Headsin"
                        className="w-40 object-contain"
                    />
                )}
            </Link>

            <button
                className="hidden text-center mx-auto my-3 absolute top-0 right-0"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                TEMP
            </button>

            <button
                onClick={() => setVisible(false)}
                className="lg:hidden absolute top-4 right-2 w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]/50"
                type="button"
            >
                <i className="pi pi-times text-white" />
            </button>
            <div className="w-full h-[calc(100%-100px)] pb-6 flex flex-col justify-between">
                <div
                    className={twMerge(
                        "flex flex-col items-center gap-2",
                        isCollapsed ? "p-2" : "pl-3 pr-1"
                    )}
                >
                    {SIDEBAR_ITEMS.map((item) => (
                        <SidebarItem
                            key={item.title}
                            title={item.title}
                            icon={React.cloneElement(item.icon, {
                                isActive: location.pathname === item.to,
                            })}
                            to={item.to}
                            onClick={() => setVisible(false)}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </div>

                <div className="flex flex-col items-center gap-1 px-3">
                    <SidebarItem
                        title="Support"
                        icon={<SupportIcon />}
                        to={SUPPORT}
                        onClick={() => setVisible(false)}
                        isCollapsed={isCollapsed}
                    />
                    <Divider className="!m-2 opacity-30" />
                    <button
                        type="button"
                        className={twMerge(
                            "flex items-center justify-start gap-4 hover:bg-white/30 py-3 px-4 rounded-md transition duration-300 ease-in-out cursor-pointer",
                            isCollapsed ? "w-auto" : "w-11/12"
                        )}
                        onClick={() => setShowResetPassword(true)}
                    >
                        <ResetPasswordIcon />{" "}
                        <span
                            className={twMerge(
                                isCollapsed ? "hidden" : "block"
                            )}
                        >
                            Reset Password
                        </span>
                    </button>
                    <button
                        type="button"
                        className={twMerge(
                            "text-secondary flex items-center justify-start gap-4 hover:bg-white/30 py-3 px-4 rounded-md transition duration-300 ease-in-out cursor-pointer",
                            isCollapsed ? "w-auto" : "w-11/12"
                        )}
                        onClick={() => setShowConfirmation(true)}
                    >
                        <LogoutIcon />{" "}
                        <span
                            className={twMerge(
                                isCollapsed ? "hidden" : "block"
                            )}
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </div>

            <ConfirmationModal
                isLoading={isLoggedOut}
                visible={showConfirmation}
                setVisible={setShowConfirmation}
                image={LogoutDailogIcon}
                header="Logout?"
                message="Are you sure you want to logout?"
                onClick={handleLogout}
            />

            <ResetPasswordModal
                isLoading={isResetPasswordLoader}
                resetPasswordForm={resetPasswordForm}
                visible={showResetPassword}
                setVisible={setShowResetPassword}
                onClick={resetPasswordForm.handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default MainSidebar;

const SidebarItem = ({
    title,
    icon,
    to,
    className,
    onClick,
    isCollapsed,
}: {
    title: string;
    icon: JSX.Element;
    to: string;
    className?: string;
    onClick?: () => void;
    isCollapsed?: boolean;
}) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                twMerge(
                    "flex items-center justify-start gap-4 hover:bg-white/30 py-3 px-4 rounded-md transition duration-300 ease-in-out",
                    className,
                    isCollapsed ? "w-auto" : "w-11/12",
                    isActive && "bg-white/30"
                )
            }
        >
            {icon}
            <span className={twMerge(isCollapsed ? "hidden" : "block")}>
                {title}
            </span>
        </NavLink>
    );
};
