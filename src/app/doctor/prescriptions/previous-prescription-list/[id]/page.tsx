"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import { PreviousPrescriptionView } from "./PreviousPrescription";

const PrescriptionView = () => {
    const {id} = useParams<{id: string}>();
    
    return (
        <DefaultLayout>
            <PreviousPrescriptionView prescription_id={id} />
        </DefaultLayout>
    );
};

export default PrescriptionView;