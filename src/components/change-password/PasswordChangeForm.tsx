"use client";
import { passwordSchema } from "@/app/auth/registration/RegistrationForm";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z
  .object({
    password: passwordSchema,
    c_password: passwordSchema,
    current_password: z.string().min(6, {
      message: "Current password must be at least 6 characters long",
    }),
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

const PasswordChangeForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const handleReset = async (values: FieldValues) => {
    try {
      const res = await changePassword({
        current_password: values.current_password,
        password: values.password,
        c_password: values.c_password,
      }).unwrap();
      console.log("res :>> ", res);
      if (res.success) {
        toast.success(res.message);
        localStorage.removeItem("mobile");
        router.push("/auth/login");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.errors || "Something went wrong");
    }
  };
  console.log("error :>> ", error);
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mx-4 mt-6 rounded-md bg-rose-50 p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px] md:mx-0">
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
          <div className="mb-2 mt-2 text-center text-xl font-bold text-red-700 md:text-2xl">
            Change Password
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Current Password<span className="text-danger">*</span>
            </label>
            <SportsInput
              type="current_password"
              name="current_password"
              placeholder="Enter your current password"
              style="sm input input-bordered w-full max-w-md bg-white dark:bg-black input-sm md:input-md"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              New Password<span className="text-danger">*</span>
            </label>
            <SportsInput
              type="password"
              name="password"
              placeholder="Enter your new password"
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
          </div>

          <div>
            <button
              type="submit"
              className="btn w-full max-w-md rounded border-0 bg-red-700 text-white hover:bg-red-800"
            >
              Save
            </button>
          </div>
        </SportsFrom>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
