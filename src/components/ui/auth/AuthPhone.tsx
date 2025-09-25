import { IconField } from "primereact/iconfield";
import { InputText, InputTextProps } from "primereact/inputtext";
import React from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import AuthLabel from "./AuthLabel";
interface PhoneFieldProps extends InputTextProps {
    label: string;
    inputStyle?: string;
    inputContainerStyle?: string;
    errorMsg?: FieldError;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
}
const AuthPhone: React.FC<PhoneFieldProps> = ({
    label,
    inputStyle,
    inputContainerStyle,
    errorMsg,
    register,
    ...rest
}) => {
    return (
        <div className={twMerge("flex flex-col w-full", inputContainerStyle)}>
            <div className="flex flex-col gap-2 w-full">
                <AuthLabel label={label} />
                <IconField className="card bg-field rounded-xl flex items-center justify-start pl-3">
                    <AuthLabel
                        labelStyle="text-base"
                        label="+91"
                    />
                    <InputText
                        {...register}
                        type="text"
                        inputMode="numeric"
                        keyfilter="int"
                        pattern="[0-9]*"
                        maxLength={10}
                        className={twMerge(
                            " !text-black border-none focus:!shadow-none !bg-field !rounded-xl",
                            inputStyle
                        )}
                        {...rest}
                    />
                </IconField>
            </div>
            {errorMsg && (
                <small className="w-full text-red-400">
                    {errorMsg?.message}
                </small>
            )}
        </div>
    );
};

export default AuthPhone;
