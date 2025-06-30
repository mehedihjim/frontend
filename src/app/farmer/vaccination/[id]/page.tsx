"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/loading/Loading";
import { useGetRoleQuery } from "@/redux/features/role/rolesApi";
import { useParams } from "next/navigation";
import { VaccinationManagement } from "../../../../components/vaccination/VaccinationManagement";
import BatchInformationPage from "../../../batch-information/BatchInformationPage";

const FarmerVaccination = () => {
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
      <VaccinationManagement batchID={id}></VaccinationManagement>
    </DefaultLayout>
  );
};

export default FarmerVaccination;
