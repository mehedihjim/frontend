import Dashboard from "@/components/Dashboard/Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poulex",
  description: "This is Poulex",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard></Dashboard>
      </DefaultLayout>
    </>
  );
}
