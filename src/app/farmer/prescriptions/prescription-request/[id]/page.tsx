"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import RequestMainComponet from "./RequestMainComponet";

const PrescriptionRequestPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <DefaultLayout>
           <RequestMainComponet batch_id={id}/>
        </DefaultLayout>
    );
}

export default PrescriptionRequestPage;