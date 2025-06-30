import LogoSegment from "@/components/LogoSegment/LogoSegment";
import LoginFooter from "@/components/LoginFooter/LoginFooter";
import OtpForm from "./OtpForm";

const OtpPage = () => {
  return (
    <>
      <div className="h-screen">
        <LogoSegment />
        <OtpForm />
        <div className="relative">
          <div className="fixed bottom-0 left-0 right-0">
            <LoginFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
