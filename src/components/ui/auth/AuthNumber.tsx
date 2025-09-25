
import { InputNumber, InputNumberProps } from 'primereact/inputnumber';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldError } from 'react-hook-form';
import AuthLabel from './AuthLabel';

interface InputNumberFieldProps extends InputNumberProps {
    label?: string;
    inputNumberStyle?: string;
    errorMsg?: FieldError;
}
const AuthNumber: React.FC<InputNumberFieldProps> = ({ label, inputNumberStyle, errorMsg, ...rest }) => {
    return (
        <div className='flex flex-col w-full'>
            <div className="flex flex-col gap-1 w-full">
                <AuthLabel label={label} />
                <InputNumber
                    className={twMerge("", inputNumberStyle)}
                    {...rest}
                    pt={{
                        input: { root: { className: "!w-full !text-black !bg-field !border-none focus:!shadow-none rounded-xl" } }
                    }} />
            </div>
            {errorMsg && (<small className="w-full text-red-400">{errorMsg?.message}</small>)}
        </div>

    )
}

export default AuthNumber;
