import React from 'react';
import SectionLoader from './SectionLoader';
import { twMerge } from 'tailwind-merge';

const Loader: React.FC<{ isVisible: boolean, className?: string }> = ({ isVisible, className }) => {
    if (!isVisible) return null;

    return (
        <div className={twMerge("w-full h-4/5 flex items-center justify-center", className)}>
            <SectionLoader />
        </div>
    );
};

export default Loader;