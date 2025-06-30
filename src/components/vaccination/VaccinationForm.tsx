"use-client";
import SportsFrom from "@/components/Froms/SportsFrom";
import { FieldValues } from "react-hook-form";
import { useSingleBatchQuery } from "@/redux/api/batchApi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import tracebilityDefaultValues from "@/app/default_values/tracebility/tracebilityDefault";
import { useParams } from "next/navigation";
import SportsInput from "../Froms/SportsInput";
import Select from "../Froms/Select";
import {
  useAddVaccinationMutation,
  useSingleVaccinationQuery,
} from "@/redux/api/vaccinationApi";

const VaccinationForm = ({ batchID }: any) => {
  // Logged in user information from storage
  const { user } = useAppSelector((state) => state.auth);

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );
  const [otherDiseaseShow, setOtherDiseaseShow] = useState<boolean>(false);

  const { data: batchData, isLoading: batchDataLoading } =
    useSingleBatchQuery(batchID);
  const {
    data: vaccinationData,
    isLoading: vaccinationDataLoading,
    refetch,
  } = useSingleVaccinationQuery(batchID);

  const [addVaccine] = useAddVaccinationMutation();

  const handleDiseaseChange = (selectedValue: string) => {
    console.log(selectedValue, "selected value");

    if (selectedValue === "Other") {
      setOtherDiseaseShow(true);
    } else {
      setOtherDiseaseShow(false);
      if (resetForm) {
        resetForm((prevValues: any) => ({
          ...prevValues,
          otherVaccineName: "", // Reset the field value
        }));
      }
    }
  };

  const handleSubmit = async (values: FieldValues) => {
    console.log(values, "values");

    let payload = {
      batch_id: batchID,
      ...values,
    };
    try {
      const res = await addVaccine(payload).unwrap();
      if (resetForm) {
        resetForm({
          age: "",
          name: "",
          otherVaccineName: "",
        });
        refetch();
      }
      toast.success(res?.message || "Vaccination added successfully");

      // If otherDisease is true then set the state to false
      setOtherDiseaseShow((prev) => prev && false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add data");
    }
  };
  return (
    <>
      <SportsFrom
        // defaultValues={tracebilityDefaultValues(tracebilityData?.data)}
        onSubmit={handleSubmit}
        setInputValues={(reset) => setResetForm(() => reset)}
      >
        <div className="mb-6 mt-6">
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Age of Vaccination (Days) <span className="text-danger">*</span>
              </label>
              <SportsInput
                type="text"
                errors={error}
                name="age"
                placeholder="Bird age during vaccination"
                style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Disease Name <span className="text-danger">*</span>
              </label>
              <Select
                name="name"
                style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
                onChangeSelect={handleDiseaseChange}
              >
                <option defaultValue="">Select Disease</option>
                <option value="Ranikhet">Ranikhet</option>
                <option value="Gumboro">Gumboro</option>
                <option value="Pox">Pox</option>
                <option value="Mareks">Mareks</option>
                <option value="Bird_Flu">Bird Flu</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            {otherDiseaseShow && (
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Other Disease Name
                </label>
                <SportsInput
                  type="text"
                  errors={error}
                  name="otherVaccineName"
                  placeholder="Type the disease name"
                  style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                />
              </div>
            )}
            {/* Button div positioned at the bottom */}
            <div className="flex items-end justify-end sm:justify-start">
              <button
                className="btn btn-md w-1/2 border-0 bg-red-700 text-white hover:bg-red-800"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </SportsFrom>
    </>
  );
};

export default VaccinationForm;
