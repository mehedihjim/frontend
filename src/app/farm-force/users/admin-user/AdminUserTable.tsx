"use clint";
import Error from "@/components/error/Error";
import Loading from "@/components/loading/Loading";
import { useGetAdminQuery } from "@/redux/features/users/usersApi";
import Link from "next/link";
import { FaPen } from "react-icons/fa6";

const AdminUserTable = () => {
  const {
    data: adminData,
    isLoading: adminIsLoading,
    error: adminError,
  } = useGetAdminQuery({});
  if (adminIsLoading) return <Loading></Loading>;
  if (adminError) return <Error></Error>;
  return (
    <div>
      <div className="mb-6 mt-6">
        <div className="table-headline mb-6 dark:text-white">
          <h3 className="text-xl font-semibold">Admin Users List</h3>
        </div>
      </div>

      <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
        <table className="w-full border-collapse items-center bg-transparent">
          {/* head */}
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                SN
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Name
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Mobile
              </th>
              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Email
              </th>

              <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          {adminData && (
            <tbody>
              {adminData?.data?.map((data: any, index: number) => (
                <tr
                  key={data.id}
                  className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700"
                >
                  <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-6 text-left align-middle text-xs">
                    {index + 1}
                  </th>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-6 text-left align-middle text-xs">
                    {data.name}
                  </td>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-6 text-left align-middle text-xs">
                    {data.mobile}
                  </td>
                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-6 text-left align-middle text-xs">
                    {data.email}
                  </td>

                  <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-6 text-left align-middle text-xs">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/users/admin-user/${data.id}`}
                        passHref
                        className="tooltip cursor-pointer text-sky-900
                        dark:text-slate-400"
                        data-tip="Edit"
                      >
                        <FaPen size={15} className="cursor-pointer" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {/* {currentItems.length === 0 && (
                    <tbody>
                      <tr>
                        <td
                          colSpan={4}
                          className="p-5 text-center text-danger dark:text-rose-400"
                        >
                          No Data Found
                        </td>
                      </tr>
                    </tbody>
                  )} */}
        </table>
      </div>
    </div>
  );
};

export default AdminUserTable;
