import LogoSegment from "@/components/LogoSegment/LogoSegment";
import LoginForm from "./LoginForm";
import LoginFooter from "@/components/LoginFooter/LoginFooter";

const LoginPage = () => {
  return (
    <div className="bg-red-100 flex h-screen flex-col items-center justify-center">
      <LogoSegment />
      <LoginForm />
      <div className="relative">
        <div className="fixed bottom-0 left-0 right-0">
          {/* <LoginFooter /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
