import { MultiSelect, MultiSelectProps } from 'primereact/multiselect'
import React from 'react'
import AuthLabel from './AuthLabel'
import { twMerge } from 'tailwind-merge'
import { FieldError } from 'react-hook-form';

interface MultiSelectFieldProps extends MultiSelectProps {
    label: string;
    errorMsg?: FieldError;
    inputStyle?: string;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({ label, errorMsg, inputStyle, ...rest }) => {
    return (
        <div className={twMerge("flex flex-col w-full")}>
            <div className="flex flex-col gap-1 w-full">
                <AuthLabel label={label} />
                <MultiSelect
                    className={twMerge("justify-between", inputStyle)}
                    {...rest}
                    pt={{
                        root: { className: "!text-black border-none focus:!shadow-none !w-full bg-field !font-manrope !rounded-xl" },
                        panel: { className: "!w-52 " },
                        wrapper: { style: { scrollbarWidth: "thin", minHeight: "auto" } },
                        item: { className: "group !text-black overflow-hidden text-ellipsis text-nowrap bg-field hover:bg-primary hover:!text-white border-none" },
                        emptyMessage: { className: "px-4" },
                        header: {
                            className: "bg-field"
                        },
                        list: { className: "py-0" },
                        input: { className: twMerge("", inputStyle) },
                        hiddenInputWrapper: { className: "hidden" },
                        checkbox: {
                            box: {
                                className:
                                      "!w-5 !h-5 rounded-md border-primary bg-transparent group-hover:!bg-field overflow-hidden p-1/2",
                            },
                            icon: {
                                className: "w-full h-full bg-primary text-field",
                            },
                        }
                    }} />
            </div>
            {errorMsg && (<small className="w-full text-red-400">{errorMsg?.message}</small>)}
        </div>
    )
}

export default MultiSelectField
