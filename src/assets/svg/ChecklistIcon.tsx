import React from "react";

const ChecklistIcon: React.FC<React.SVGProps<SVGElement>> = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
        >
            <path
                fill="#3F1562"
                fillRule="evenodd"
                d="M1.464 1.464C0 2.93 0 5.286 0 10s0 7.071 1.464 8.536C2.93 20 5.286 20 10 20s7.071 0 8.536-1.464C20 17.07 20 14.713 20 10c0-4.714 0-7.071-1.464-8.536C17.07 0 14.713 0 10 0 5.286 0 2.929 0 1.464 1.464m7.08 4.053a.75.75 0 0 0-1.087-1.034l-2.314 2.43-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0zM11 6.25a.75.75 0 1 0 0 1.5h5a.75.75 0 1 0 0-1.5zm-2.457 6.267a.75.75 0 1 0-1.086-1.034l-2.314 2.43-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0zM11 13.25a.75.75 0 1 0 0 1.5h5a.75.75 0 1 0 0-1.5z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
};

export default ChecklistIcon;
