import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

import Input from "../common/Input";
import PasswordInput from "./PasswordInput";
import AuthDivider from "./AuthDivider";
import OAuthButtons from "./OAuthButtons";

import { AuthService } from "../../services/auth.service";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password.",
      );
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response =
        await AuthService.login(
          email.trim(),
          password,
        );

      const { token, user } = response.data;

      localStorage.setItem(
        "token",
        token,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user),
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ??
            "Unable to log in. Please try again.",
        );
      } else {
        setError(
          "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit}
    >
      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      <PasswordInput
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            navigate("/forgot-password")
          }
          className="text-sm text-violet-400 transition hover:text-violet-300"
        >
          Forgot Password?
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-2
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
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:scale-100
        "
      >
        {isLoading ? (
          <>
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>

      <AuthDivider />

      <OAuthButtons />

      <p className="pt-6 text-center text-sm text-zinc-500">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() =>
            navigate("/signup")
          }
          className="font-semibold text-violet-400 hover:text-violet-300"
        >
          Create Account
        </button>
      </p>
    </form>
  );
}