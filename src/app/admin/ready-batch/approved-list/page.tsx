import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ApprovedListTable } from "./ApprovedListTable";

const ApprovedPage = () => {
  return (
    <DefaultLayout>
        <ApprovedListTable />
    </DefaultLayout>
  );
}

export default ApprovedPage;