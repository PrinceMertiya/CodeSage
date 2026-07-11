import AuthLayout from "../../components/auth/AuthLayout";
import AuthPreview from "../../components/auth/AuthPreview";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout preview={<AuthPreview />}>
      <AuthCard>

        <AuthHeader
          title="Welcome Back 👋"
          subtitle="Continue building intelligent software with CodeSage."
        />

        <LoginForm />

      </AuthCard>
    </AuthLayout>
  );
}