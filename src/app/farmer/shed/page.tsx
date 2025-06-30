"use-client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ShedCreateForm from "./ShedCreateForm";
import { ShedManagement } from "./ShedManagement";

const Shed = () => {
  return (
    <DefaultLayout>
      {/* <ShedCreateForm></ShedCreateForm> */}
      <ShedManagement></ShedManagement>
    </DefaultLayout>
  );
};

export default Shed;
