import React from "react";

const CheckIcon: React.FC<React.SVGProps<SVGElement>> = ({ width, height }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "22"}
            height={height || "20"}
            fill="none"
            viewBox="0 0 22 20"
            className="lg:block hidden"
        >
            <path
                fill="#fff"
                d="M10.076 19.27a.46.46 0 0 1-.339-.149L.599 9.237a.462.462 0 0 1 .34-.775h4.398a.46.46 0 0 1 .348.159l3.054 3.513c.33-.705.969-1.88 2.09-3.312 1.657-2.116 4.74-5.228 10.015-8.037a.461.461 0 0 1 .5.77c-.02.017-2.053 1.618-4.394 4.552-2.154 2.7-5.017 7.113-6.426 12.812a.46.46 0 0 1-.448.35"
            ></path>
        </svg>
    );
};

export default CheckIcon;
