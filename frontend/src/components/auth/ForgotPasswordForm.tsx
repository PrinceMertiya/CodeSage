import Input from "../common/Input";

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-6">

      <Input
        type="email"
        placeholder="Email Address"
      />

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
        "
      >
        Send Reset Link
      </button>

      <button
        type="button"
        className="w-full text-sm text-violet-400 hover:text-violet-300"
      >
        ← Back to Login
      </button>

    </form>
  );
}