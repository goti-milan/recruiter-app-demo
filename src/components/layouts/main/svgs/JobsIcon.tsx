import * as React from "react";

const JobsIcon: React.FC<{
    isActive?: boolean;
}> = ({ isActive = false }) =>
    isActive ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="22.926"
                strokeWidth="1.406"
                d="M6.563 5.719V3.63c0-.83.68-1.51 1.51-1.51h7.854c.83 0 1.51.68 1.51 1.51V5.72m4.922 6.75v8.004a1.41 1.41 0 0 1-1.406 1.406H3.047a1.41 1.41 0 0 1-1.406-1.406v-7.957"
            ></path>
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M10.125 14.836C5.166 14.552.703 13.134.703 10.582V7.254c0-.775.632-1.406 1.406-1.406h19.782a1.41 1.41 0 0 1 1.406 1.406v3.328c0 2.568-4.52 3.988-9.516 4.26"
                clipRule="evenodd"
            ></path>
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="22.926"
                strokeWidth="1.406"
                d="M10.125 14.836C5.166 14.552.703 13.134.703 10.582V7.254c0-.775.632-1.406 1.406-1.406h19.782a1.41 1.41 0 0 1 1.406 1.406v3.328c0 2.568-4.52 3.988-9.516 4.26"
            ></path>
            <path
                fill="#000"
                fillRule="evenodd"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="22.926"
                strokeWidth="1.406"
                d="M10.266 13.441h3.468v1.618c0 .889-.727 1.617-1.617 1.617h-.234c-.89 0-1.617-.728-1.617-1.617z"
                clipRule="evenodd"
            ></path>
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="22.926"
                strokeWidth="1.406"
                d="M6.563 5.719V3.63c0-.83.68-1.51 1.51-1.51h7.854c.83 0 1.51.68 1.51 1.51V5.72m4.922 6.75v8.004a1.41 1.41 0 0 1-1.406 1.406H3.047a1.41 1.41 0 0 1-1.406-1.406v-7.957"
            ></path>
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="22.926"
                strokeWidth="1.406"
                d="M10.125 14.836C5.166 14.552.703 13.134.703 10.582V7.254c0-.775.632-1.406 1.406-1.406h19.782a1.41 1.41 0 0 1 1.406 1.406v3.328c0 2.568-4.52 3.988-9.516 4.26"
            ></path>
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="22.926"
                strokeWidth="1.406"
                d="M10.266 13.441h3.468v1.618c0 .889-.727 1.617-1.617 1.617h-.234c-.89 0-1.617-.728-1.617-1.617z"
                clipRule="evenodd"
            ></path>
        </svg>
    );

export default JobsIcon;
