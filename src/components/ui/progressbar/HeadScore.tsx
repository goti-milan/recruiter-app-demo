import React, { useEffect, useState } from "react";

interface HeadScoreProps {
    value?: number;
    size?: number;
}

const HeadScore: React.FC<HeadScoreProps> = ({ value = 0, size = 130 }) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const clampedValue = Math.min(100, Math.max(0, value));
        setProgress(clampedValue);
    }, [value]);

    const radius = 30;
    // const path = `M 22 50 A ${radius} ${radius} 0 0 1 78 50`; // original path
    const path = `M 20 40 A ${radius} ${radius} 0 0 1 80 40`;

    const pathLength = 100;
    const dashOffset = pathLength - (progress * pathLength) / 100;

    return (
        <div className="relative" style={{ width: size, height: 100 / 2 + 20 }}>
            <svg viewBox="10 0 90 60">
                <defs>
                    <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="var(--color-secondary)" />
                        <stop offset="100%" stopColor="var(--color-primary)" />
                    </linearGradient>
                </defs>

                <path
                    d={path}
                    stroke="#E5E5E5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                />

                <path
                    d={path}
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                        strokeDasharray: pathLength,
                        strokeDashoffset: dashOffset,
                        transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                />

                <text
                    x="50"
                    y="35"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xl font-semibold font-manrope"
                >
                    {Math.round(progress)}
                </text>
            </svg>
        </div>
    );
};

export default HeadScore;
