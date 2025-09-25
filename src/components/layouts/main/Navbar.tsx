import { DASHBOARD } from "@/routes";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import { Link } from "react-router";
import MainSidebar from "./MainSidebar";

const Navbar: React.FC = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="lg:hidden flex items-center justify-between h-14 bg-primary p-4 text-lg text-white">
            <Link to={DASHBOARD}>
                <img
                    src="/white-logo-2.webp"
                    alt="headsin"
                    className="w-32 object-contain"
                />
            </Link>
            <button
                type="button"
                className="flex items-center justify-center"
                onClick={() => setVisible(true)}
            >
                <i className="pi pi-bars text-2xl"></i>
            </button>

            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                showCloseIcon={false}
                pt={{
                    root: { className: "p-0" },
                    content: { className: "p-0" },
                    header: { className: "p-0" },
                }}
            >
                <MainSidebar
                    isCollapsed={false}
                    setIsCollapsed={() => {}}
                    setVisible={setVisible}
                />
            </Sidebar>
        </div>
    );
};

export default Navbar;
