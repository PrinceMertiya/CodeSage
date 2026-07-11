import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "../common/Input";

interface PasswordInputProps {
  placeholder?: string;
}

export default function PasswordInput({
  placeholder = "Password",
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">

      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>

    </div>
  );
}