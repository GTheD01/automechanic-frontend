import { ChangeEvent, FormEvent } from "react";
import Input, { InputProps } from "./Input";
import Spinner from "./Spinner";

type FormMethod = "GET" | "POST" | "PUT" | "PATCH";

interface FormProps {
  config: InputProps[];
  method?: FormMethod;
  btnText: string;
  isLoading: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function Form({
  config,
  method = "POST",
  onSubmit,
  btnText,
  onChange,
  isLoading,
}: FormProps) {
  return (
    <form
      method={method}
      onSubmit={onSubmit}
      className="mt-8 mb-4 flex flex-col items-center space-y-4 min-w-72"
    >
      {config.map((input) => (
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
        />
      ))}
      <button
        disabled={isLoading}
        type="submit"
        className="bg-secondary px-12 py-2 tracking-wider lg:text-lg md:text-base text-sm hover:bg-secondaryHover cursor-pointer w-full"
      >
        {isLoading ? <Spinner /> : btnText}
      </button>
    </form>
  );
}

export default Form;
