"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import React from "react";
import BatchSummary from "../../../../components/batch-summary/BatchSummary";
import BatchReadyForm from "../BatchReadyForm";

const BatchReady = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <DefaultLayout>
      <h1 className="mb-4 text-2xl font-bold">Batch Make Ready</h1>
      <BatchSummary batchID={id}></BatchSummary>
      <BatchReadyForm batchID={id}></BatchReadyForm>
    </DefaultLayout>
  );
};

export default BatchReady;
