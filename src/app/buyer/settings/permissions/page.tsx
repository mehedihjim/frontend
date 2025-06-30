import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Permissions from "./Permissions";

const page = () => {
  return (
    <DefaultLayout>
      <div className="table-headline mb-2 dark:text-white">Roles</div>
      <Permissions role={{}}></Permissions>
    </DefaultLayout>
  );
};

export default page;
