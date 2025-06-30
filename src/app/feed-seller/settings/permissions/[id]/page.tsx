"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/loading/Loading";
import { useGetRoleQuery } from "@/redux/features/role/rolesApi";
import { useParams } from "next/navigation";
import Permissions from "../Permissions";

const EditRole = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetRoleQuery(id);
  if (isLoading)
    return (
      <DefaultLayout>
        <div className="table-headline mb-2 dark:text-white">Permissions</div>
        <Loading></Loading>
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      <div className="flex">
        <div className="table-headline mb-2 dark:text-white">Roles</div>
        {/* //blacklist */}
      </div>
      <Permissions role={data}></Permissions>
    </DefaultLayout>
  );
};

export default EditRole;
