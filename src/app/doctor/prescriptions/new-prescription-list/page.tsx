import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { PrescriptionTable } from "./PrescriptionTable";

const NewPrescriptionList = () => {

    return (
            <DefaultLayout>
               <PrescriptionTable routePrefix="/doctor/prescriptions/new-prescription-list" />
            </DefaultLayout>
        )
};
export default NewPrescriptionList;