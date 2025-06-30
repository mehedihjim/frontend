"use-client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ExpenseComponent } from "./ExpenseComponent";


const Expense = () => {
  return (
    <DefaultLayout>
      <ExpenseComponent />
    </DefaultLayout>
  );
};

export default Expense;