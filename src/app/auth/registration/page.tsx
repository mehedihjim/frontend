"use client";
import LogoSegment from "@/components/LogoSegment/LogoSegment";
import RegistrationForm from "./RegistrationForm";
import LoginFooter from "@/components/LoginFooter/LoginFooter";

const RegistrationPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <LogoSegment />
        <div className="mb-auto">
          <RegistrationForm />
        </div>
        <LoginFooter />
        {/* <div className="relative">
          <div className="fixed bottom-0 left-0 right-0">
          </div>
        </div> */}
      </div>
    </>
  );
};

export default RegistrationPage;
