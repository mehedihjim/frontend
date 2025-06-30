"use client";

import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { setPermissions } from "@/redux/features/permission/permissionSlice";
import { useAppDispatch } from "@/redux/hooks";
import { createCookie } from "@/services/actions/setCookie";
// import { userLogin } from "@/services/actions/userLogin";
import { storeToken } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationSchema = z.object({
  mobile: z
    .string()
    .min(11, "Must be 11 digits number")
    .max(11, "Must be 11 digits number"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userLogin] = useUserLoginMutation();
  const handleLogin = async (values: FieldValues) => {
    setLoading(true);
    try {
      const res = await userLogin(values).unwrap();
      console.log(res, "this isn");

      if (res?.data?.token) {
        storeToken({ accessToken: res?.data?.token });
        dispatch(setUser({ user: res.data, token: res.data.token }));
        dispatch(setPermissions(res.data.permissions));
        const a = { ...res.data };

        const { permissions, roles, ...rest } = a;
        await createCookie({
          name: "permissions",
          value: JSON.stringify(permissions),
          httpOnly: true,
          path: "/",
        });
        await createCookie({
          name: "user_data",
          value: JSON.stringify(rest),
          httpOnly: true,
          path: "/",
        });
        await createCookie({
          name: "auth_token",
          value: res.data.token,
          httpOnly: true,
          path: "/",
        });
        router.push(`/${res.data.user_type}/dashboard`);
        toast.success(res?.message || "Login successful!!");
      } else {
        // toast.error("Invalid credentials");
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.errors || "Invalid credentials");
    }
  };

  return (
    <>
      <div className="mx-auto mt-4 w-full max-w-md">
        <div className="mx-4 mt-6 rounded-md bg-rose-50 p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px] md:mx-0">
          <SportsFrom
            onSubmit={handleLogin}
            isReset={false}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              mobile: "",
              password: "",
            }}
          >
            <div className="mb-2 mt-2 text-center text-xl font-bold text-red-700 md:text-2xl">
              Login
            </div>
            <div className="mb-4">
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
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="cursor-pointer  text-red-700"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="btn w-full max-w-md rounded border-0 bg-red-700 text-white hover:bg-red-800"
              >
                {" "}
                Login{" "}
              </button>
            </div>
            <div className="f mt-4 flex justify-center font-medium text-black dark:text-white">
              Don’t have an account?
              <Link
                href="/auth/registration"
                className="cursor-pointer font-semibold text-red-700"
              >
                {" "}
                &nbsp; Register
              </Link>
            </div>
          </SportsFrom>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
