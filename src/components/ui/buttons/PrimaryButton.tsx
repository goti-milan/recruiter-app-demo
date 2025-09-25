import { Button, ButtonProps } from "primereact/button";
import React from "react";
import { twMerge } from "tailwind-merge";

interface PrimaryButtonProps extends ButtonProps {
    className?: string;
    labelStyle?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    className,
    labelStyle,
    ...rest
}) => {
    return (
        <Button
            {...rest}
            pt={{
                root: {
                    className: twMerge(
                        "flex items-center justify-center w-full bg-primary text-white font-medium font-manrope border-none outline-none rounded-xl hover:bg-secondary !shadow-none",
                        className
                    ),
                },
                label: {
                    className: twMerge("text-white font-medium font-manrope",labelStyle),
                },
            }}
        />
    );
};

export default PrimaryButton;
