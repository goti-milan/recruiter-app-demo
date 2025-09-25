import { motion } from "framer-motion";
import * as React from "react";

const SectionLoader: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="160"
        height="160"
        fill="none"
        viewBox="-35 -30 100 100"
    >
        <motion.path
            initial={{
                opacity: 0,
                y: [-40, 0, 40]
            }}
            animate={{
                y: [-100, 0, 0, 100],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                y: {
                    duration: 2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.1
                },
                opacity: {
                    duration: 2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.1
                },
            }}
            fill="url(#paint1_linear_3759_46)"
            d="M14.505 16.86c4.583 0 8.298-3.774 8.298-8.43S19.088 0 14.505 0 6.206 3.774 6.206 8.43s3.716 8.43 8.299 8.43"
        ></motion.path>

        <motion.path
            initial={{
                opacity: 0,
                y: [-40, 0, 40]
            }}
            animate={{
                y: [-100, 0, 0, 100],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                y: {
                    duration: 2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                opacity: {
                    duration: 2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
            fill="url(#paint0_linear_3759_46)"
            d="m28.68 24.028-13.387 13.6c-.433.44-1.145.44-1.578 0L.327 24.027a1.146 1.146 0 0 1 0-1.604l3.707-3.76c.44-.44 1.145-.44 1.579 0l8.096 8.225c.434.44 1.145.44 1.579 0l8.107-8.225a1.11 1.11 0 0 1 1.579 0l3.7 3.76c.434.44.434 1.163 0 1.604z"
        ></motion.path>

        <defs>
            <linearGradient
                id="paint0_linear_3759_46"
                x1="0"
                x2="26.928"
                y1="19.738"
                y2="27.207"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3F1562"></stop>
                <stop offset="1" stopColor="#DF6789"></stop>
            </linearGradient>
            <linearGradient
                id="paint1_linear_3759_46"
                x1="0"
                x2="26.928"
                y1="19.738"
                y2="27.207"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3F1562"></stop>
                <stop offset="1" stopColor="#DF6789"></stop>
            </linearGradient>
        </defs>
    </svg>
);

export default SectionLoader;
