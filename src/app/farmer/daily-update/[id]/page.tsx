"use client";

import { DailyUpdateManage } from "@/components/daily-update/dailyUpdateManage";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";

const DailyUpdate = () => {
    const { id } = useParams<{ id: string }>();
     return (
        <DefaultLayout>
          <div className="flex"></div>
            <DailyUpdateManage batchId={id}></DailyUpdateManage>
        </DefaultLayout>
      );
}
export default DailyUpdate;
