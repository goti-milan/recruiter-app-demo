import React from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    label?: string;
    labelStyle?: string;
    iconPosition?: 'left' | 'right';
}
const AuthLabel: React.FC<LabelProps> = ({ label, labelStyle, iconPosition, ...rest }) => {
    return (
        <label className={twMerge("text-sm", labelStyle)} {...rest}>{label}</label>
    )
}

export default AuthLabel;
