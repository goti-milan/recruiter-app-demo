import { Dropdown, DropdownProps } from "primereact/dropdown";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";
import AuthLabel from "./AuthLabel";

interface SelectFieldProps extends DropdownProps {
    label?: string;
    dropdownContainerStyle?: string;
    dropdownStyle?: string;
    inputStyle?: string;
    triggerStyle?: string;
    errorMsg?: FieldError;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    dropdownContainerStyle,
    dropdownStyle,
    inputStyle,
    triggerStyle,
    errorMsg,
    ...rest
}: SelectFieldProps) => {
    return (
        <div
            className={twMerge("flex flex-col w-full", dropdownContainerStyle)}
        >
            <div
                className={`flex flex-col ${label ? "gap-2" : "gap-0"} w-full`}
            >
                <AuthLabel label={label} />
                <Dropdown
                    className={twMerge("w-full justify-between", dropdownStyle)}
                    {...rest}
                    pt={{
                        root: {
                            className:
                                "!text-black border-none focus:!shadow-none !w-full bg-field !font-manrope !rounded-xl",
                        },
                        filterInput: {
                            className:
                                "!text-black border-none focus:!shadow-none pr-7 py-2",
                        },
                        panel: { className: "!w-52" },
                        wrapper: {
                            style: {
                                scrollbarWidth: "thin",
                                minHeight: "auto",
                            },
                        },
                        item: {
                            className:
                                "!text-black !h-[3rem]  !capitalize overflow-hidden text-ellipsis text-nowrap bg-field hover:bg-primary hover:!text-white border-none outline-none",
                        },
                        filterIcon: { className: "right-2" },
                        emptyMessage: { className: "px-4 py-4" },
                        header: {
                            className: "bg-field",
                        },
                        input: { className: twMerge("", inputStyle) },
                        list: { className: "p-0" },
                        virtualScroller: { root: { className: "!bg-field" } },
                        trigger: { className: twMerge("", triggerStyle) },
                    }}
                />
            </div>
            {errorMsg && (
                <small className="w-full text-red-400">
                    {errorMsg?.message}
                </small>
            )}
        </div>
    );
};

export default SelectField;
