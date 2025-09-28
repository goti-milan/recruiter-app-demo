import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getCompanyAuth } from "@/helpers/apis/auth";
import Loader from "@/components/ui/loader/Loader";

const ProtectedRouter = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const company = await getCompanyAuth();
                setTimeout(() => setIsAuthenticated(!!company), 500);
            } catch {
                setIsAuthenticated(false); // Set to false if request fails
            }
        };

        fetchCompany();
    }, []);

    // Show loading until authentication is determined
    if (isAuthenticated === null) return <div className="h-screen w-full flex items-center justify-center"><Loader isVisible /></div>;

    return !isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRouter;
