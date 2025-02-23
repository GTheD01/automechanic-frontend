import { ChangeEvent, FormEvent } from "react";

import { cn } from "@/lib/cn";
import Button from "@/components/Button";
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
      <Button className="px-12 py-2" type="submit">
        {isLoading ? <Spinner md /> : btnText}
      </Button>
    </form>
  );
}

export default Form;
