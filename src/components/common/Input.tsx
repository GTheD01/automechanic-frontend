import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import { cn } from "@/lib/cn";
import Tooltip from "@/components/common/Tooltip";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  name: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  value: string;
  className?: string;
  toolTipMessage?: string;
}

function Input({
  name,
  label,
  placeholder,
  required = false,
  type,
  onChange,
  error,
  value,
  className,
  toolTipMessage,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col items-start w-80 md:w-96">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>

      <Tooltip tooltipMessage={toolTipMessage}>
        <input
          id={name}
          value={value}
          name={name}
          type={type}
          autoComplete="off"
          required={required}
          minLength={1}
          placeholder={placeholder}
          onChange={onChange}
          className={cn(
            "outline-none text-white px-4 py-2 bg-transparent border border-white placeholder:text-neutral w-full",
            className
          )}
          {...props}
        />
      </Tooltip>

      {error && (
        <p className="text-red-500 font-light text-sm md:text-base">{error}</p>
      )}
    </div>
  );
}

export default Input;
