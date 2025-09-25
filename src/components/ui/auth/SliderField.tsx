import { Slider, SliderProps } from 'primereact/slider';
import React, { useMemo } from 'react';
import AuthLabel from './AuthLabel';

interface SliderFieldProps extends SliderProps {
    label: string;
    value: number;
    /** maximum years that the slider maps to (default 10) */
    maxYears?: number;
}

const SliderField: React.FC<SliderFieldProps> = ({ label, value, maxYears = 30, ...rest }) => {

    // Use slider value directly as years (rounded). No need to pass min/max props.
    const years = useMemo(() => Math.max(0, Math.round(value)), [value]);

    return (
        <div className='flex flex-col gap-2 w-full pb-2'>
            <AuthLabel label={label} />
            <div className="w-full flex flex-col items-center gap-2 px-3">
                <p>Years: <span className='font-semibold text-lg'>{years} {years === 0 && <span className='text-sm'> (Fresher) </span>}</span></p>
                <Slider
                    {...rest}
                    pt={{
                        root: {
                            className: "w-full bg-primary/10"
                        },
                        range: {
                            className: "bg-primary h-1 rounded-full",
                        },
                        handle: {
                            className: "border-primary hover:bg-primary hover:border-primary w-5 h-5 -mt-2 -ml-1",
                        }
                    }}
                    value={value}
                    max={maxYears}
                    min={0}
                />
            </div>
        </div>
    )
}

export default SliderField