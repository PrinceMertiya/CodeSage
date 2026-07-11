import AuthLayout from "../../components/auth/AuthLayout";
import AuthPreview from "../../components/auth/AuthPreview";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout preview={<AuthPreview />}>
      <AuthCard>

        <AuthHeader
          title="Forgot Password?"
          subtitle="We'll send you a password reset link."
        />

        <ForgotPasswordForm />

      </AuthCard>
    </AuthLayout>
  );
}