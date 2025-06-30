"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import { PrescriptionListView } from "./PrescriptionListView";

const PrescriptionView = () => {
    const {id} = useParams<{id: string}>();
    
    return (
        <DefaultLayout>
            <PrescriptionListView prescription_id={id} />
        </DefaultLayout>
    );
};

export default PrescriptionView;