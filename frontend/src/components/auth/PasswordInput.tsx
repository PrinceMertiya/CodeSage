import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "../common/Input";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export default function PasswordInput({
  placeholder = "Password",
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="pr-12"
      />

      <button
        type="button"
        onClick={() =>
          setShow((current) => !current)
        }
        aria-label={
          show
            ? "Hide password"
            : "Show password"
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
      >
        {show ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  );
}