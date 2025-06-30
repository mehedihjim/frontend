"use client";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  mobile: z
    .string()
    .min(11, "Must be 11 digits number")
    .max(11, "Must be 11 digits number"),
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [forgotPassword] = useForgotPasswordMutation();
  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await forgotPassword({
        mobile: values.mobile,
      }).unwrap();
      if (res.success) {
        localStorage.setItem("mobile", JSON.stringify(values.mobile));
        toast.success("OTP has been sent to your mobile number.");
        router.push("/reset-password");
      }
    } catch (error: any) {
      console.log("error :>> ", error);
      toast.error(error.errors?.message || "Something went wrong!");
    }
  };
  return (
    <div>
      <div className="mx-auto w-full max-w-md">
        <div className="mx-4 mt-6 rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px] md:mx-0">
          <SportsFrom
            onSubmit={handleSubmit}
            isReset={false}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              mobile: "",
            }}
          >
            <div className="mb-2 mt-2 text-center text-xl font-bold text-sky-800 md:text-2xl">
              Forgot Password
            </div>
            <div className="mb-4">
              <p className="pb-5 text-center text-black">
                {" "}
                Enter your mobile number, we`ll send you a OTP to reset your
                password.
              </p>
              <label className="mb-1 block inline-block text-sm font-medium text-black dark:text-white">
                Mobile No. <span className="text-danger">*</span>
              </label>
              <SportsInput
                type="tel"
                name="mobile"
                placeholder="Enter your mobile no."
                style="input input-bordered w-full max-w-md bg-white dark:bg-black"
              />
            </div>

            <div>
              <button
                // disabled={loading}
                type="submit"
                className="btn w-full max-w-md rounded border-0 bg-sky-800 text-white hover:bg-sky-900"
              >
                {" "}
                Send OTP{" "}
              </button>
            </div>
            <div className="f mt-4  flex justify-center font-medium text-black dark:text-white">
              back to{" "}
              <Link
                href="/auth/login"
                className="cursor-pointer px-1 font-semibold text-sky-800"
              >
                {" "}
                login
              </Link>
            </div>
          </SportsFrom>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
