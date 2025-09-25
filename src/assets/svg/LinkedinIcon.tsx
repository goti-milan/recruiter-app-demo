import * as React from "react";

const LinkedinIcon: React.FC<React.SVGProps<SVGElement>> = ({ color="#0077B5" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 22 22"
    >
        <g clipPath="url(#clip0_1783_178)">
            <path
                fill={color}
                d="M21.995 22H22v-8.07c0-3.947-.85-6.987-5.464-6.987-2.219 0-3.707 1.217-4.315 2.371h-.064V7.311H7.782V22h4.555v-7.273c0-1.915.363-3.766 2.735-3.766 2.336 0 2.371 2.185 2.371 3.89V22zM.362 7.312h4.561V22H.363zM2.642 0A2.643 2.643 0 0 0 0 2.642C0 4.1 1.183 5.308 2.642 5.308S5.284 4.1 5.284 2.642A2.644 2.644 0 0 0 2.642 0"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_1783_178">
                <path fill="#fff" d="M0 0h22v22H0z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default LinkedinIcon;
