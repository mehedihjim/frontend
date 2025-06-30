import LogoSegment from "@/components/LogoSegment/LogoSegment";

import LoginFooter from "@/components/LoginFooter/LoginFooter";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="h-screen">
      <LogoSegment />
      <ForgotPasswordForm />
      <div className="relative">
        <div className="fixed bottom-0 left-0 right-0">
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
