import {  InputOtp, InputOtpProps } from 'primereact/inputotp'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface OtpInputProps extends InputOtpProps {
    InputOtpStyle?: string
    InputOtpContainerStyle?: string
 }

const AuthOtp: React.FC<OtpInputProps> = ({ InputOtpStyle,InputOtpContainerStyle, ...rest }) => {
    return (
        <div className={twMerge("", InputOtpContainerStyle)}>
            <InputOtp
             pt={{
                root:{className:"gap-6",InputOtpStyle},
                input:{root: {className: "!w-12 !h-12 !text-center bg-field text-xl !text-balck hover:!border-primary focus:!border-primary !border-2 focus:!shadow-none !rounded-xl"}}
            }}
             {...rest} />
        </div>
    )
}

export default AuthOtp
