import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  className?: string;
  onClick?: () => void;
  link?: boolean;
  to?: string;
}

function Button({
  onClick,
  link,
  to,
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  let baseClassName =
    "text-white bg-secondary hover:bg-secondaryHover text-sm lg:text-base";

  if (link && to) {
    return (
      <Link to={to} className={`${baseClassName} ${className}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
