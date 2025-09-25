import * as React from "react";

interface StarProps extends React.SVGProps<SVGSVGElement> {
    fromcolor?: string;
    tocolor?: string;
    width?: string | number;
}

const Star: React.FC<StarProps> = ({ fromcolor, tocolor, width }) => {
    const uniqueId = React.useId();
    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "34"}
            height={width || "34"}
            fill="none"
            viewBox="0 0 19 19"
        >
             <path
                fill={`url(#${uniqueId})`} 
                d="M9.5 0C8.188 7.125 7.125 8.188 0 9.5c7.125 1.312 8.188 2.375 9.5 9.5 1.312-7.125 2.375-8.188 9.5-9.5-7.125-1.312-8.188-2.375-9.5-9.5"
            ></path>
            <defs>
                <linearGradient
                    id={uniqueId} 
                    x1="2.5"
                    x2="15.5"
                    y1="1.5"
                    y2="19"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={fromcolor || "#3F1562"}></stop>
                    <stop offset="1" stopColor={tocolor || "#DF6789"}></stop>
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Star;
