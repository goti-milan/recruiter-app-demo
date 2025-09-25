const SaralLoader = ({ size = 24, strokeWidth = 3 }) => {
  return (
    <div className="animate-spin" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3F1562" />
            <stop offset="100%" stopColor="#DF6789" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${Math.PI * (size / 2 - strokeWidth)} ${
            Math.PI * (size / 2 - strokeWidth)
          }`}
          strokeDashoffset={`${(Math.PI * (size / 2 - strokeWidth)) / 2}`}
          fill="none"
        />
      </svg>
    </div>
  );
};

export default SaralLoader;
