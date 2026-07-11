import AuthLayout from "../../components/auth/AuthLayout";
import AuthPreview from "../../components/auth/AuthPreview";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import SignupForm from "../../components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout preview={<AuthPreview />}>
      <AuthCard>

        <AuthHeader
          title="Create your account"
          subtitle="Start analyzing repositories with AI."
        />

        <SignupForm />

      </AuthCard>
    </AuthLayout>
  );
}