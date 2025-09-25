/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface RadioFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    register?: any
}
const RadioField: React.FC<RadioFieldProps> = ({ label, register, ...rest }) => {
    return (
        <div className='w-max flex items-center gap-2 p-3 bg-field rounded-xl cursor-pointer'>
            <input
                {...register}
                type="radio"
                {...rest}
                className='accent-primary cursor-pointer h-4 w-4'
            />
            <label className='text-sm cursor-pointer' htmlFor={rest.id}>{label}</label>
        </div>
    )
}

export default RadioField
