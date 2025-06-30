import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { PrescriptionTableList } from "./PrescriptionTableList";


const PrescriptionList = () => {
    return (
            <DefaultLayout>
               <PrescriptionTableList routePrefix="/farmer/prescriptions/prescription-list"/>
            </DefaultLayout>
        )
};
export default PrescriptionList;