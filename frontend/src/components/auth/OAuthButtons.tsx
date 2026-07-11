import { FaGithub, FaGoogle } from "react-icons/fa";
import SocialButton from "./SocialButton";

export default function OAuthButtons() {
  return (
    <div className="space-y-4">
      <SocialButton
        icon={<FaGithub size={18} />}
        text="Continue with GitHub"
      />

      <SocialButton
        icon={<FaGoogle size={18} />}
        text="Continue with Google"
      />
    </div>
  );
}