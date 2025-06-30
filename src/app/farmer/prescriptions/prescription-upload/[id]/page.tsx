"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import MainComponent from "./MainComponent";

const PrescriptionCreate = () => {
    const { id } = useParams<{ id: string }>();
    return (
            <DefaultLayout>
               <MainComponent batchId={id}></MainComponent>
            </DefaultLayout>
    );
};

export default PrescriptionCreate;