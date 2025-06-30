import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { PreviousPrescriptionTable } from "./PreviousPrescriptionTable";


const PreviousPrescription = () => {

    return (
            <DefaultLayout>
               <PreviousPrescriptionTable routePrefix="/doctor/prescriptions/previous-prescription-list" />
            </DefaultLayout>
        )
};
export default PreviousPrescription;