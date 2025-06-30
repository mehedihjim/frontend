import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one capital letter")
  .regex(/[a-z]/, "Must contain at least one small letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

export const validationSchema = z
  .object({
    // email: z.string().email("Please enter a valid email address!"),
    password: passwordSchema,
    mobile: z
      .string()
      .min(11, "Must be 11 digits number")
      .max(11, "Must be 11 digits number"),
    user_type: z.string().nonempty("User type is required"),
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
const RegistrationForm = () => {
  const router = useRouter();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [register] = useRegisterMutation();
  const handleSubmit = async (values: FieldValues) => {
    setLoading(true);
    try {
      const res = await register(values).unwrap();

      if (res?.success === true) {
        localStorage.setItem("regData", JSON.stringify(res.data));
        toast.success(res?.message || "Registration successful!!");
        router.push("/auth/otp");
      } else {
        toast.error(res?.message);
        setError(res?.data || res?.error || "Something went wrong!");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.errors);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto mb-auto w-full max-w-md">
        <div className="mx-4 my-6 rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px] md:mx-0">
          <SportsFrom
            onSubmit={handleSubmit}
            isReset={false}
            mode={"onChange"}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              email: "",
              password: "",
              mobile: "",
              c_password: "",
            }}
          >
            <div className="mb-2 mt-2 text-center text-xl font-bold text-sky-800 md:text-2xl">
              Registration
            </div>
            <div className="mb-2">
              <label className="mb-1 block inline-block text-sm font-medium text-black dark:text-white">
                Applicant Type
              </label>
              <Select
                name="user_type"
                style="select select-sm md:select-md select-bordered w-full max-w-md bg-white dark:bg-black"
              >
                <option disabled selected>
                  Select
                </option>
                <option value="mp">Honorable MP</option>
                <option value="institute">Educational Institution</option>
                <option value="club">Sports Club</option>
              </Select>
            </div>
            {/*     <div className="mb-4">
            <label className="mb-1 block inline-block text-sm font-medium text-black dark:text-white">
              Name
            </label>
            <SportsInput
              type="text"
              name="name"
              placeholder="Enter your name "
              style="input input-bordered w-full max-w-sm bg-white dark:bg-black"
            />
          </div> */}

            <div className="mb-2">
              <label className="mb-1 block inline-block text-sm font-medium text-black dark:text-white">
                Mobile No. <span className="text-danger">*</span>
              </label>
              <SportsInput
                type="tel"
                name="mobile"
                errors={error}
                placeholder="Enter your mobile no."
                style="input input-sm input-bordered w-full max-w-md bg-white dark:bg-black md:input-md"
              />
            </div>
            {/* <div className="mb-4">
          <div className="mb-2">
            <label className="mb-1 block inline-block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <SportsInput
              type="email"
              name="email"
              placeholder="Enter your email "
              style="input input-sm md:input-md input-bordered w-full max-w-sm bg-white dark:bg-black"
            />
          </div> */}
            <div className="mb-4"></div>
            <div className="mb-2">
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Password <span className="text-danger">*</span>
              </label>
              <SportsInput
                type="password"
                errors={error}
                name="password"
                placeholder="Enter your password"
                style="sm input-sm md:input-md input input-bordered w-full max-w-md bg-white dark:bg-black"
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <SportsInput
                type="password"
                name="c_password"
                errors={error}
                placeholder="Enter your confirm password"
                style="sm input-sm md:input-md input input-bordered w-full max-w-md bg-white dark:bg-black"
              />
            </div>
            <div>
              <button
                disabled={loading ? true : false}
                type="submit"
                className="btn w-full max-w-md rounded border-0 bg-sky-800 text-white hover:bg-sky-900"
              >
                {" "}
                Register{" "}
              </button>
            </div>
            <div className="f mb-4 mt-4 flex justify-center font-medium text-black dark:text-white">
              Already have an account?
              <Link
                href="/auth/login"
                passHref
                className="cursor-pointer font-semibold text-sky-800"
              >
                {" "}
                &nbsp; Login
              </Link>
            </div>
          </SportsFrom>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
