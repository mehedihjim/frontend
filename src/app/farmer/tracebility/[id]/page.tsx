"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/loading/Loading";
import { useGetRoleQuery } from "@/redux/features/role/rolesApi";
import { useParams } from "next/navigation";
import TracebilityForm from "../../../../components/tracebility-form/TracebilityForm";

const FarmerTracebility = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetRoleQuery(id);
  if (isLoading)
    return (
      <DefaultLayout>
        <Loading></Loading>
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      <div className="flex"></div>
      <TracebilityForm formID={id}></TracebilityForm>
    </DefaultLayout>
  );
};

export default FarmerTracebility;
