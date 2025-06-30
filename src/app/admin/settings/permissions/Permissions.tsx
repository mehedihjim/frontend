"use client";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import Td from "@/components/ui/table/Td";
import Th from "@/components/ui/table/Th";
import { useGetPermissionsQuery } from "@/redux/features/permission/permissionApi";
import {
  useAddRoleMutation,
  useGetRolesQuery,
  useUpdateRoleMutation,
} from "@/redux/features/role/rolesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import Select from "react-tailwindcss-select";
import { toast } from "sonner";
import { z } from "zod";

interface IResponse {
  success?: boolean;
  message?: string;
  data?: any;
  error?: any;
}
export const validationSchema = z.object({
  name: z.string().nonempty("Name is required"),
});
const Permissions = ({ role }: { role: any }) => {
  const [options, setOptions] = useState([]);

  const [animal, setAnimal] = useState<any[]>([]);
  const { data, isLoading, error } = useGetPermissionsQuery({});
  const [addRole] = useAddRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const { data: roles, refetch } = useGetRolesQuery({});
  useEffect(() => {
    if (data) {
      const formattedOptions = data.data.map((item: any) => ({
        label: item.name.toLocaleUpperCase(),
        value: item.id,
        disabled: false,
      }));

      setOptions(formattedOptions);
      // setAnimal([...formattedOptions]);
    }
    if (role?.data?.permissions) {
      const selectedOptions = role?.data?.permissions.map((item: any) => ({
        label: item.name.toLocaleUpperCase(),
        value: item.id,
        disabled: false,
      }));
      setAnimal(selectedOptions);
    }
  }, [data, role]);
  // useEffect(() => {
  //   setAnimal(role?.data?.permissions);
  // }, [role?.data?.permissions]);
  if (isLoading) return <div>Loading...</div>;
  const handleSubmit = async (values: FieldValues) => {
    values.permissions = animal.map((item) => item.value);
    try {
      const res: IResponse = role?.data?.id
        ? await updateRole({
            ...values,
            id: role.data.id,
          })
        : await addRole(values);
      if (res.success || res.data?.success) {
        toast.success(
          role?.data?.id
            ? "Role updated successfully"
            : "Role added successfully",
        );
        refetch();
      }
    } catch (e: any) {
      toast.error(e?.errors || "Something went wrong");
    }
  };
  const defaultValue = {
    name: role?.data?.name || "",

    // required_items: selectedOptions,
  };

  const handleChange = (value: any) => {
    setAnimal(value);
  };
  return (
    <div>
      <SportsFrom
        defaultValues={defaultValue}
        isReset={false}
        onSubmit={handleSubmit}
        resolver={zodResolver(validationSchema)}
      >
        <div>
          <div className="flex flex gap-5">
            <div className="mb-5 w-2/3  ">
              <div className="p-5 shadow-lg">
                <div className="flex">
                  <div className="text-xl  text-black">Add Role</div>
                  {role?.data?.id && (
                    <div className="flex flex-1 justify-end">
                      <Link
                        href={"/admin/settings/permissions"}
                        className="btn-s btn border-0 bg-sky-800 text-white"
                      >
                        <IoIosAddCircle />
                        Add New
                      </Link>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Enter Role Name <span className="text-danger">*</span>
                  </label>
                  <SportsInput
                    type="text"
                    name="name"
                    placeholder="Enter role name"
                    style="input input-date-light input-bordered w-full max-w-full bg-white dark:bg-black dark:input-date-dark input-md"
                  />
                </div>
                <label
                  className="mt-3 block pt-3 text-sm font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Select Permissions <span className="text-danger">*</span>
                </label>
                <div className="mt-2  rounded bg-white dark:bg-black ">
                  <Select
                    primaryColor=""
                    classNames={{
                      searchIcon: "hidden",
                      searchBox:
                        "px-5 py-3 w-full  bg-white dark:bg-black  rounded shadow-sm ",
                      menuButton(value) {
                        return "p-2 m-2 flex justify-between";
                      },
                      menu: "shadow-lg",
                      searchContainer: "border my-1 mx-4",
                    }}
                    value={animal}
                    isMultiple={true}
                    isSearchable={true}
                    placeholder="Select Permissions"
                    onChange={handleChange}
                    isClearable={animal?.length > 0 ? true : false}
                    formatOptionLabel={(data) => (
                      <p className="mb-1 bg-white p-2 dark:bg-black">
                        {data.label}
                      </p>
                    )}
                    options={options}
                  />
                </div>
                <div className="align-end mt-3  flex justify-end">
                  <button
                    className="btn btn-success  border-0 text-white"
                    type="submit"
                  >
                    {role?.data?.id ? "Update Role" : "Add Role"}
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-5 w-1/3 p-5 px-2 shadow-lg">
              <div className="text-xl text-black dark:text-white">
                Role List
              </div>
              <table className="w-full table-auto border-collapse px-2 ">
                <thead>
                  <tr className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700">
                    <Th content={"SN"}></Th>
                    <Th content={"ID"}></Th>
                    <Th content={"Name"}></Th>
                    <Th content={"Action"}></Th>
                  </tr>
                </thead>
                <tbody>
                  {roles?.data.map((item: any, index: number) => (
                    <tr
                      className={
                        role?.data?.id === item.id
                          ? "border-t border-[#eee] bg-slate-200 px-4 py-4 dark:border-strokedark dark:bg-slate-800"
                          : "border-t border-[#eee] px-4 py-4 dark:border-strokedark"
                      }
                      key={index}
                    >
                      <Td content={index + 1}></Td>
                      <Td content={item.id}></Td>
                      <Td content={item.name}></Td>
                      <th className=" px-4 py-4 dark:border-strokedark">
                        <Link
                          className="tooltip"
                          data-tip="Edit"
                          href={`/admin/settings/permissions/${item.id}`}
                        >
                          {" "}
                          <MdOutlineEdit />
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SportsFrom>
    </div>
  );
};

export default Permissions;
