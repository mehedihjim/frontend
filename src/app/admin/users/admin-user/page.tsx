"use client";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/loading/Loading";
import { useGetRolesQuery } from "@/redux/features/role/rolesApi";
import { useCreateAdminUserMutation } from "@/redux/features/users/usersApi";
import { ISportsType } from "@/types/sportsType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import AdminUserTable from "./AdminUserTable";

const page = () => {
  const [errors, setErrors] = useState({});
  const { data, isLoading } = useGetRolesQuery({});
  const [createAdminUser] = useCreateAdminUserMutation();

  if (isLoading) <Loading></Loading>;
  const defaultValues = {
    name: "",
    role_id: "",
    email: "",
    mobile: "",
    password: "",
    c_password: "",
  };

  const ValidationSchema = z
    .object({
      name: z.string().nonempty("Name is required"),
      role_id: z.string().nonempty("Role is required"),
      email: z.string().nonempty("Email is required"),
      mobile: z.string().nonempty("Mobile is required"),
      password: z.string().nonempty("Password is required"),
      c_password: z
        .string()
        .nonempty("Confirm Password is required")
        .min(6, "Password must be at least 6 characters"),
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
  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await createAdminUser(values).unwrap();
    } catch (err: any) {
      setErrors(err.errors);
    }
  };
  return (
    <DefaultLayout>
      <>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full sm:w-2/5 xl:w-1/3">
            <SportsFrom
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(ValidationSchema)}
              isReset={false}
            >
              <div className="">
                <div className="mb-6 mt-6">
                  <div className="table-headline mb-6 dark:text-white">
                    Add Admin
                  </div>
                  <div className="grid grid-cols-1 gap-2 rounded-md p-4 shadow-[rgba(18,_112,_212,_0.2)_0px_3px_15px] md:grid-cols-1">
                    <div>
                      <div className="pb-3">
                        <label
                          htmlFor="name"
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                        >
                          Enter Name <span className="text-danger">*</span>
                        </label>
                        <SportsInput
                          type="text"
                          name="name"
                          errors={errors}
                          placeholder="Enter name"
                          style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                          Select Role <span className="text-danger">*</span>
                        </label>
                        <Select
                          name="role_id"
                          style="select select-bordered w-full max-w-full bg-white dark:bg-black"
                        >
                          <option defaultValue="">Select Role</option>
                          {data?.data?.map((data: ISportsType) => (
                            <option value={data.id} key={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Enter Email <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        errors={errors}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Enter Mobile Number <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        errors={errors}
                        type="text"
                        name="mobile"
                        placeholder="Enter sports item name"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Password <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        errors={errors}
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        errors={errors}
                        type="password"
                        name="c_password"
                        placeholder="Enter confirm password"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div className="mt-4 text-right">
                      <button
                        type="submit"
                        className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SportsFrom>
          </div>

          {/* Table section */}
          <div className="w-full sm:w-3/5 xl:w-2/3">
            <AdminUserTable />
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default page;
