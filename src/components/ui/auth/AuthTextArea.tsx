
import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldError } from 'react-hook-form';
import AuthLabel from './AuthLabel';

interface InputTextAreaProps extends InputTextareaProps {
    label?: string;
    inputStyle?: string;
    errorMsg?: FieldError;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
}
const AuthTextArea: React.FC<InputTextAreaProps> = ({ label, inputStyle, register, errorMsg, ...rest }) => {
    return (
        <div className='flex flex-col w-full'>
            <div className="flex flex-col gap-2 w-full">
                <AuthLabel label={label} />
                <InputTextarea
                    {...register}
                    className={twMerge("!text-black !bg-field !border-none focus:!shadow-none resize-none !rounded-xl", inputStyle)}
                    {...rest} />    
            </div>
            {errorMsg && (<small className="w-full text-red-400">{errorMsg?.message}</small>)}
        </div>

    )
}

export default AuthTextArea;
