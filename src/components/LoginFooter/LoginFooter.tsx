import Image from "next/image";
import gov_logo from "../../../public/images/logo/gov_icon.png";
import sports_logo from "../../../public/images/logo/logo-trans.png";
import uss_col_logo from "../../../public/images/logo/uss_col_trans.png";

const LoginFooter = () => {
  return (
    <>
      <div className="flex flex-col place-items-center justify-around bg-slate-200 py-1 md:flex-row">
        <div className="flex-cols flex place-items-center gap-2 py-2">
          <div className="text-xs text-black md:text-sm">
            পরিকল্পনা ও বাস্তবায়নে
          </div>
          <Image src={sports_logo} width={40} height={40} alt="sports logo" />
          <Image src={gov_logo} width={40} height={40} alt="gov logo" />
        </div>
        <div className="py-1 text-center md:ms-8">
          <p className="text-xs text-black md:text-sm">
            কপিরাইট ©২০২৪ সর্বস্বত্ব সংরক্ষিত
            <br />
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
          </p>
        </div>
        <div className="flex-cols flex place-items-center gap-2 py-1">
          <div className="text-xs text-black md:text-sm">কারিগরি সহযোগিতায়</div>
          <Image
            src={uss_col_logo}
            width={140}
            height={140}
            alt="uss logo"
          />{" "}
        </div>
      </div>
    </>
  );
};

export default LoginFooter;
