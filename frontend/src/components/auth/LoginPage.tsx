import AuthLayout from "../../components/auth/AuthLayout";
import AuthPreview from "../../components/auth/AuthPreview";

export default function LoginPage() {
  return (
    <AuthLayout preview={<AuthPreview />}>
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-4 text-zinc-400">
          Login form will be here.
        </p>
      </div>
    </AuthLayout>
  );
}