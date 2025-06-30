// ShedForm.tsx
"use client";
import React, { useEffect, useState } from "react";
// Shed's API
import {
  useCreateShedMutation,
  useUpdateShedMutation,
} from "@/redux/api/shedApi";
import { toast } from "sonner";
import SportsFrom from "@/components/Froms/SportsFrom";
import { FieldValues } from "react-hook-form";

// Validations
import { zodResolver } from "@hookform/resolvers/zod";
import shedCreateValidationShema from "@/app/valodators/shed/shedCreateValidator";
import shedCreateDefaultValues from "@/app/default_values/shed_create/shedCreateDefault";
import Select from "@/components/Froms/Select";
import SportsInput from "@/components/Froms/SportsInput";
import { IUser } from "@/types/user.type";
import { IDistrict, IDivision, IUnion, IUpzilla } from "@/types/address.type";
// User's API
import { useGetAllFarmersQuery } from "@/redux/api/userApi";
import {
  useDistrictByDivisionIdQuery,
  useDivisionQuery,
  useUnionByUpzillaIdQuery,
  useUpzillaByDistrictIdQuery,
} from "@/redux/api/addressApi";

export const ShedForm = ({
  refetch,
  singleShedData,
  setSingleShedData,
  handleItemEdit,
}: any) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  // Get All Farmer's List
  const { data: allFarmers, isLoading: allFarmersLoading } =
    useGetAllFarmersQuery({});

  const [formValues, setFormValues] = useState<any>({});
  const [submitType, setSubmitType] = useState<"create" | "update">("create");

  const [createShed] = useCreateShedMutation();
  const [updateShed] = useUpdateShedMutation();

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpzilla, setSelectedUpzilla] = useState("");
  const [districtListCalled, setDistrictListCalled] = useState(true);
  const [upzillaListCalled, setUpzillaListCalled] = useState(true);
  const [unionListCalled, setUnionListCalled] = useState(true);

  // Parse user info from localStorage safely
  let userDataParsed: any = {};

  try {
    const userInfo = localStorage.getItem("persist:auth");
    const parsedOuter = JSON.parse(userInfo ?? "{}");
    const userData = parsedOuter?.user;
    userDataParsed = JSON.parse(userData ?? "{}");
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
  }

  console.log(userDataParsed?.role_id, "user's role");

  // all division list from api
  const { data: divData, isLoading: isDivLoading } = useDivisionQuery({});
  const divisionData = divData?.data;

  // district list by division id
  const { data: disByDivData, isLoading: disByDivLoading } =
    useDistrictByDivisionIdQuery(selectedDivision, {
      skip: districtListCalled,
    });
  const districtByDivisionData = disByDivData?.data;

  // upzilla list by district id
  const { data: upzByDisData, isLoading: upzByDisLoading } =
    useUpzillaByDistrictIdQuery(selectedDistrict, { skip: upzillaListCalled });
  const upzillaByDistrictData = upzByDisData?.data;

  // union list by upzilla id
  const { data: uniByUpzData, isLoading: uniByUpzLoading } =
    useUnionByUpzillaIdQuery(selectedUpzilla, { skip: unionListCalled });
  const unionByUpzillaData = uniByUpzData?.data;

  useEffect(() => {
    if (singleShedData?.id) {
      if (resetForm) {
        resetForm({
          farmer_id: singleShedData.farmer_id,
          name: singleShedData.name,
          division_id: singleShedData.division_id,
          district_id: singleShedData.district_id,
          upzilla_id: singleShedData.upzilla_id,
          union_id: singleShedData.union_id,
          address: singleShedData.address,
        });
      }

      setSubmitType("update");
    }
  }, [singleShedData]);

  // Effect to respond to data changes
  useEffect(() => {
    if (singleShedData) {
      setSelectedDivision(singleShedData.division_id?.toString() || ""); // Convert to string or default to an empty string
      setDistrictListCalled(false);

      setSelectedDistrict(singleShedData.district_id?.toString() || "");
      setUpzillaListCalled(false);

      setSelectedUpzilla(singleShedData.upzilla_id?.toString() || "");
      setUnionListCalled(false);
    }
  }, [singleShedData]);

  const handleDivChange = (div_id: string) => {
    setSelectedDivision(div_id);
    setSelectedDistrict(div_id);
    setSelectedUpzilla(div_id);
    setDistrictListCalled(false);
  };

  const handleDisChange = (dis_id: string) => {
    setSelectedDistrict(dis_id);
    setSelectedUpzilla(dis_id);
    setUpzillaListCalled(false);
  };

  const handleUpzChange = (upz_id: string) => {
    setSelectedUpzilla(upz_id);
    setUnionListCalled(false);
  };

  const handleSubmit = async (values: FieldValues) => {
    console.log(values, "values");
    console.log(formValues, "form values");

    if (submitType === "create") {
      try {
        const res = await createShed(values).unwrap();
        toast.success(res?.message || "Shed created successfully");
        setFormValues({});
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to create shed");
      }
    } else if (submitType === "update") {
      try {
        const res = await updateShed({
          shed_id: singleShedData.id,
          data: values,
        }).unwrap();
        if (resetForm) {
          resetForm({
            farmer_id: res.data.farmer_id,
            name: res.data.name,
            division_id: res.data.division_id,
            district_id: res.data.district_id,
            upzilla_id: res.data.upzilla_id,
            union_id: res.data.union_id,
            address: res.data.address,
          });
        }
        setFormValues({});
        setSingleShedData(null);
        toast.success(res?.message || "Shed updated successfully");
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to update shed");
      }
    }
  };

  return (
    <SportsFrom
      resolver={zodResolver(shedCreateValidationShema)}
      defaultValues={shedCreateDefaultValues(singleShedData)}
      onSubmit={handleSubmit}
      isReset={true}
      setInputValues={(reset) => setResetForm(() => reset)}
    >
      <div className="mb-6 mt-6">
        <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Farmer <span className="text-danger">*</span>
              </label>
              <Select
                name="farmer_id"
                style="select select-bordered w-full max-w-xs bg-white dark:bg-black disabled:bg-slate-300 disabled:border-0 disabled:text-slate-800"
                disabled={userDataParsed?.role_id == 2}
              >
                <option defaultValue="">Select Farmer</option>
                {allFarmers?.data.map((data: IUser) => (
                  <option value={data.id} key={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Shed No <span className="text-danger">*</span>
              </label>
              <SportsInput
                type="text"
                errors={error}
                name="name"
                placeholder="Enter shed number"
                style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Division <span className="text-danger">*</span>
              </label>
              <Select
                onChangeSelect={handleDivChange}
                name="division_id"
                style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
              >
                <option defaultValue="">Select your division</option>
                {divisionData?.map((data: IDivision) => (
                  <option value={data.id} key={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                District <span className="text-danger">*</span>
              </label>
              <Select
                name="district_id"
                onChangeSelect={handleDisChange}
                style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
              >
                <option defaultValue="">Select your district</option>
                {districtByDivisionData?.map((data: IDistrict) => (
                  <option value={data.id} key={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Upazilla <span className="text-danger">*</span>
              </label>
              <Select
                name="upzilla_id"
                onChangeSelect={handleUpzChange}
                style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
              >
                <option defaultValue="">Select your upzilla</option>
                {upzillaByDistrictData?.map((data: IUpzilla) => (
                  <option value={data.id} key={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Union <span className="text-danger">*</span>
              </label>
              <Select
                name="union_id"
                style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
              >
                <option defaultValue="">Select your union</option>
                {unionByUpzillaData?.map((data: IUnion) => (
                  <option value={data.id} key={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Address
              </label>
              <SportsInput
                type="text"
                name="address"
                errors={error}
                placeholder="Enter address"
                style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
              />
            </div>
          </div>
          <div className="mt-4 text-right">
            <button
              type="submit"
              className="btn btn-sm top-6 rounded border-none bg-red-700 text-white hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900"
            >
              {submitType === "create" ? "Add Shed" : "Edit Shed"}
            </button>
          </div>
        </div>
      </div>
    </SportsFrom>
  );
};
