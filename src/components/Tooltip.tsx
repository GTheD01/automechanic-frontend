import { PropsWithChildren } from "react";

interface TooltipWrapperProps {
  tooltipMessage?: string;
}

function TooltipWrapper({
  children,
  tooltipMessage,
}: PropsWithChildren<TooltipWrapperProps>) {
  return (
    <div className="w-full relative group">
      {tooltipMessage && (
        <div
          role="tooltip"
          className={`absolute -top-8 left-1/3 bg-gray-200 px-4 py-1 group-hover:opacity-100 opacity-0 transition-opacity duration-300`}
        >
          {tooltipMessage}
        </div>
      )}
      {children}
    </div>
  );
}

export default TooltipWrapper;
