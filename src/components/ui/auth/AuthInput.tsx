
import { InputText, InputTextProps } from 'primereact/inputtext'
import React from 'react'
import { twMerge } from 'tailwind-merge';
// import {  FieldError } from 'react-hook-form';
import AuthLabel from './AuthLabel';
import { FieldError } from 'react-hook-form';

interface InputFieldProps extends InputTextProps {
    label?: string;
    inputStyle?: string;
    errorMsg?: FieldError;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
    labelStyle?: string;
}
const AuthInput: React.FC<InputFieldProps> = ({ label, inputStyle, labelStyle, errorMsg, register, ...rest }) => {
    return (
        <div className="flex flex-col w-full">
            <div className={`flex flex-col ${label ? "gap-2" : "gap-0"} w-full`}>
                <AuthLabel label={label} labelStyle={labelStyle} />
                <InputText
                    {...register}
                    className={twMerge(" !text-black border-none focus:!shadow-none !bg-field !rounded-xl", inputStyle)}
                    {...rest}
                />
            </div>
            {errorMsg && (<small className="w-full text-red-400">{errorMsg?.message}</small>)}
        </div>

    )
}

export default AuthInput;
