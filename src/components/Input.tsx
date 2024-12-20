import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  required: boolean;
  name: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function Input({
  name,
  label,
  placeholder,
  required,
  type,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col items-start w-full">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete="off"
        required={required}
        minLength={1}
        placeholder={placeholder}
        onChange={onChange}
        className="outline-none text-white px-4 py-2 bg-transparent border border-white placeholder:text-neutral w-full"
      />
      {error && <p className="text-red-500 font-light">{error}</p>}
    </div>
  );
}

export default Input;
