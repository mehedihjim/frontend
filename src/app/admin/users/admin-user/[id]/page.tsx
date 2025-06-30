"use client";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/loading/Loading";
import { useGetRolesQuery } from "@/redux/features/role/rolesApi";
import {
  useGetSingleAdminUserQuery,
  useUpdateAdminUserMutation,
} from "@/redux/features/users/usersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import AdminUserTable from "../AdminUserTable";
import { IoIosAddCircle } from "react-icons/io";

const UpdateAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: userData,
    isLoading: userLoading,
    error,
  } = useGetSingleAdminUserQuery(id);
  const { data, isLoading } = useGetRolesQuery({});
  const [updateAdminUser] = useUpdateAdminUserMutation();
  const [errors, setErrors] = useState({});
  if (isLoading || userLoading) return <Loading></Loading>;
  const findRole = data?.data?.find((data: any) => {
    if (data.name === userData?.data?.roles[0]) {
      return data;
    }
  });
  const defaultValues = {
    name: userData?.data?.name,
    role_id: findRole.id,
    email: userData?.data?.email,
    mobile: userData?.data?.mobile,
  };
  const ValidationSchema = z.object({
    name: z.string().nonempty("Name is required"),
    role_id: z.coerce.number({
      required_error: "Role is required",
      invalid_type_error: "Role must be a number",
    }),
    email: z.string().nonempty("Email is required"),
    mobile: z.string().nonempty("Mobile is required"),
  });
  const handleSubmit = async (values: any) => {
    try {
      const res = await updateAdminUser({ id: id, ...values }).unwrap();
      if (res.success) {
        toast.success(res?.message);
      }
    } catch (error: any) {
      setErrors(error.errors);
    }
  };

  return (
    <div>
      <DefaultLayout>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full sm:w-2/5 xl:w-1/3">
            <div className="mb-6 mt-6 flex items-center justify-between">
              <div className="table-headline mb-6 dark:text-white">
                <h3 className="text-xl font-semibold">Update Admin User</h3>
              </div>
              <div className="table-headline mb-6 dark:text-white">
                <Link
                  href={`/admin/users/admin-user`}
                  className="btn btn-sm border-0 bg-sky-800 text-white"
                >
                  <IoIosAddCircle />
                  Add New
                </Link>
              </div>
            </div>
            <SportsFrom
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(ValidationSchema)}
              isReset={false}
            >
              <div className="">
                <div className="mb-6 mt-6">
                  <div className="grid grid-cols-1 gap-2 rounded-md p-4 shadow-[rgba(18,_112,_212,_0.2)_0px_3px_15px] md:grid-cols-1">
                    <div>
                      <div className="pb-3">
                        <label
                          htmlFor="name"
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                        >
                          Enter Name
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
                          Select Role
                        </label>
                        <Select
                          name="role_id"
                          style="select select-bordered w-full max-w-full bg-white dark:bg-black"
                        >
                          {data?.data?.map((data: any) => (
                            <option value={data.id} key={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Enter Email
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
                        Enter Mobile Number
                      </label>
                      <SportsInput
                        errors={errors}
                        type="text"
                        name="mobile"
                        placeholder="Enter sports item name"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>

                    <div className="mt-4 text-right">
                      <button
                        type="submit"
                        className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SportsFrom>
          </div>
          <div className="w-full sm:w-3/5 xl:w-2/3">
            <AdminUserTable />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default UpdateAdmin;
