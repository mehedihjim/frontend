"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import { PrescribeFrom } from "./PrescribeFrom";

const Prescribe = () => {
    const {id} = useParams<{id: string}>();
    return (
        <DefaultLayout>
            <PrescribeFrom pres_id={id} />
        </DefaultLayout>
    );
};

export default Prescribe;