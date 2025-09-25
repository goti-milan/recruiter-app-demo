import * as React from "react";

const ExternalLinkIcon: React.FC<React.SVGProps<SVGElement>> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill="#3F1562"
      fillRule="evenodd"
      d="M9 0H4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-5a1 1 0 0 0-2 0v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5a1 1 0 0 0 0-2m7.586 2H13a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V3.414l-7.293 7.293a1 1 0 0 1-1.414-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default ExternalLinkIcon;
