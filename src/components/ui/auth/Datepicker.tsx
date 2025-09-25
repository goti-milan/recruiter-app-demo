/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AuthLabel from "./AuthLabel";
import { Calendar, CalendarProps } from "primereact/calendar";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";

interface DatepickerProps extends CalendarProps {
    label?: string;
    register?: any;
    className?: string;
    errorMsg?: FieldError;
}
const Datepicker: React.FC<DatepickerProps> = ({
    label,
    register,
    className,
    errorMsg,
    ...rest
}) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-2 w-full">
                <AuthLabel label={label} />
                <Calendar
                    {...register}
                    {...rest}
                    placeholder="Date Range"
                    pt={{
                        root: {
                            className: twMerge(
                                "date-picker w-full !text-black border-none focus:!shadow-none !rounded-xl font-manrope",
                                className
                            ),
                        },
                        day: { className: "p-0" },
                        dayLabel: {
                            className:
                                "focus:shadow-field hover:bg-field aria-selected:!bg-field aria-selected:!text-primary aria-selected:font-medium aria-disabled:opacity-35",
                        },
                    }}
                    showIcon
                    dateFormat="dd/mm/yy"
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

export default Datepicker;
