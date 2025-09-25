import React from 'react';

const ButtonLoader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <i className="pi pi-spin pi-spinner text-xl"></i>
    );
};

export default ButtonLoader;