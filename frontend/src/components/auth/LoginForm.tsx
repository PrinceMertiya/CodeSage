import Input from "../common/Input";
import PasswordInput from "./PasswordInput";
import AuthDivider from "./AuthDivider";
import OAuthButtons from "./OAuthButtons";

export default function LoginForm() {
  return (
    <form className="space-y-5">

      <Input
        type="email"
        placeholder="Email address"
      />

      <PasswordInput />

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-violet-400 transition hover:text-violet-300"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="
          h-14
          w-full
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-600
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-[0_15px_40px_rgba(124,58,237,.45)]
        "
      >
        Login
      </button>

      <AuthDivider />

      <OAuthButtons />

      <p className="pt-6 text-center text-sm text-zinc-500">
        Don't have an account?{" "}
        <button
          type="button"
          className="font-semibold text-violet-400 hover:text-violet-300"
        >
          Create Account
        </button>
      </p>

    </form>
  );
}