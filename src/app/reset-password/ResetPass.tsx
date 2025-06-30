"use client";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { passwordSchema } from "../auth/registration/RegistrationForm";
const validationSchema = z
  .object({
    password: passwordSchema,
    token: z.string().min(4, "Must be at least 4 characters"),
    c_password: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine(
    (values) => {
      return values.password === values.c_password;
    },
    {
      message: "Passwords must match!",
      path: ["c_password"],
    },
  );

const ResetPass = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  const handleReset = async (values: FieldValues) => {
    try {
      const mobile = JSON.parse(localStorage.getItem("mobile") || "");
      if (!mobile) {
        throw new Error("Invalid mobile number");
      }
      const res = await resetPassword({
        token: values.token,
        password: values.password,
        c_password: values.c_password,
        mobile: mobile,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        localStorage.removeItem("mobile");
        router.push("/auth/login");
      }
    } catch (error: any) {
      setError(error.errors || "Something went wrong!");
    }
  };
  console.log("error :>> ", error);
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mx-4 mt-6 rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px] md:mx-0">
        <SportsFrom
          onSubmit={handleReset}
          isReset={false}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            mobile: "",
            password: "",
            c_password: "",
          }}
        >
          <div className="mb-2 mt-2 text-center text-xl font-bold text-sky-800 md:text-2xl">
            Verify OTP & Reset Password
          </div>
          <div className="mb-4">
            <label className="mb-1 block inline-block text-sm font-medium text-black dark:text-white">
              OTP <span className="text-danger">*</span>
            </label>
            <SportsInput
              type="text"
              name="token"
              placeholder="Enter your Otp."
              style="input input-bordered w-full max-w-md bg-white dark:bg-black"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Password<span className="text-danger">*</span>
            </label>
            <SportsInput
              type="password"
              name="password"
              placeholder="Enter your password"
              style="sm input input-bordered w-full max-w-md bg-white dark:bg-black input-sm md:input-md"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Confirm Password<span className="text-danger">*</span>
            </label>
            <SportsInput
              type="password"
              name="c_password"
              placeholder="Enter your password"
              style="input input-bordered w-full max-w-md bg-white dark:bg-black"
            />
            {error && <div className="text-red text-sm">{error}</div>}
          </div>

          <div>
            <button
              type="submit"
              className="btn w-full max-w-md rounded border-0 bg-sky-800 text-white hover:bg-sky-900"
            >
              Reset Password
            </button>
          </div>
          <div className="f mt-4 flex justify-center font-medium text-black dark:text-white">
            Back to
            <Link
              href="/auth/login"
              className="cursor-pointer font-semibold text-sky-800"
            >
              {" "}
              &nbsp; Login
            </Link>
          </div>
        </SportsFrom>
      </div>
    </div>
  );
};

export default ResetPass;
