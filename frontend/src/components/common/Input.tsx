import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "h-14 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-all duration-300",
          "placeholder:text-zinc-500",
          "focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;