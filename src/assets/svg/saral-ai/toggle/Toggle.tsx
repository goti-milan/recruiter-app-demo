
const ToggleSVG = () => {
  return (
      <svg
      width="27"
      height="28"
      className="h-full w-auto mt-[7px] opacity-70 hover:opacity-90 transition"
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_55_448)">
        <path
          d="M10.3684 1H8C6.34315 1 5 2.34315 5 4V16C5 17.6569 6.34314 19 8 19H10.3684M10.3684 1H19C20.6569 1 22 2.34315 22 4V16C22 17.6569 20.6569 19 19 19H10.3684M10.3684 1V19"
          stroke="#3F1462"
          strokeWidth="1.6"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_55_448"
          x="0.200195"
          y="0.199951"
          width="26.5996"
          height="27.6001"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_55_448"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_55_448"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default ToggleSVG