type ArrowDirection = "left" | "right";

interface ArrowIconProps {
  arrowDirection: ArrowDirection;
  className?: string;
}

function ArrowIcon({ arrowDirection, className }: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={`transition-colors duration-200 group w-8 h-8 cursor-pointer ${className}`}
    >
      <g>
        <polyline
          fill="none"
          stroke="#918f8f"
          strokeWidth="2"
          strokeLinejoin="bevel"
          strokeMiterlimit="10"
          points="37,15 20,32 37,49"
          transform={`${arrowDirection === "left" ? "" : "rotate(180 32 32)"}`}
          className={`transition-all duration-300 group-hover:stroke-primary`}
        />
      </g>
      <g>
        <circle
          fill="none"
          stroke="#918f8f"
          strokeWidth="2"
          strokeMiterlimit="10"
          cx="32"
          cy="32"
          r="30.999"
          className={`transition-all duration-300 group-hover:stroke-primary`}
        />
      </g>
    </svg>
  );
}

export default ArrowIcon;
