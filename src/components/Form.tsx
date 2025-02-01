import { ChangeEvent, FormEvent } from "react";

import { cn } from "@/lib/cn";
import Spinner from "@/components/Spinner";
import Input, { InputProps } from "@/components/Input";

type FormMethod = "GET" | "POST" | "PUT" | "PATCH";

interface FormProps {
  inputConfig: InputProps[];
  method?: FormMethod;
  btnText: string;
  isLoading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formClassName?: string;
  buttonClassName?: string;
  inputClassName?: string;
}

function Form({
  inputConfig,
  method = "POST",
  onSubmit,
  btnText,
  onChange,
  isLoading,
  buttonClassName,
  formClassName,
  inputClassName,
}: FormProps) {
  return (
    <form
      method={method}
      onSubmit={onSubmit}
      className={cn(
        "mt-8 mb-4 flex flex-col items-center space-y-4 min-w-72",
        formClassName
      )}
    >
      {inputConfig.map((input) => (
        <Input
          value={input.value}
          key={input.name}
          type={input.type}
          label={input.label}
          name={input.name}
          placeholder={input.placeholder}
          required={input.required}
          error={input.error}
          onChange={onChange}
          className={inputClassName}
        />
      ))}
      <button
        disabled={isLoading}
        type="submit"
        className={cn(
          "bg-secondary px-12 py-2 tracking-wider lg:text-lg md:text-base text-sm hover:bg-secondaryHover cursor-pointer w-full flex justify-center",
          buttonClassName
        )}
      >
        {isLoading ? <Spinner md /> : btnText}
      </button>
    </form>
  );
}

export default Form;
