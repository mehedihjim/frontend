import PasswordChangeForm from "@/components/change-password/PasswordChangeForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ChangePassword = () => {
  return (
    <div className="h-screen bg-red-200/25">
      <DefaultLayout>
        <PasswordChangeForm />
      </DefaultLayout>
    </div>
  );
};

export default ChangePassword;
