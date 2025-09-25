;
import { Button, ButtonProps } from "primereact/button";
import React from "react";
import { twMerge } from "tailwind-merge";

interface AuthBtnProps extends ButtonProps {
    label?: string;
    customStyle?: string;
}

const AuthButton: React.FC<AuthBtnProps> = ({ label, customStyle, ...rest }) => {
    return (
        <Button
            {...rest}
            pt={{ root: { className: twMerge("flex items-center justify-center w-full !bg-primary !text-white font-medium hover:bg-unset border-none focus:shadow-none !rounded-xl py-3 md:px-4 px-0", customStyle) }, label: { className: "font-medium text-base" } }}
            label={label}
        />
    );
};

export default AuthButton;