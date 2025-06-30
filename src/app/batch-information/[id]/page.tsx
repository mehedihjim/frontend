"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loading from "@/components/loading/Loading";
import { useGetRoleQuery } from "@/redux/features/role/rolesApi";
import { useParams } from "next/navigation";
import { VaccinationManagement } from "@/components/vaccination/VaccinationManagement";
import BatchInformationPage from "../BatchInformationPage";

const BatchInformation = () => {
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
      <BatchInformationPage batchID={id}></BatchInformationPage>
      {/* <VaccinationForm formID={id}></VaccinationForm> */}
    </DefaultLayout>
  );
};

export default BatchInformation;
