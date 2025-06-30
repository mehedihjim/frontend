"use client";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useGetAllFarmersQuery } from "@/redux/api/userApi";
import { IUser } from "@/types/user.type";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import Image from "next/image";
import poulex_device_sprite from "../../../../public/images/logo/poulex_sprite.png";
import { useGetShedByFarmerQuery } from "@/redux/api/shedApi";
import {
  useAddIotDevciesMutation,
  useGetIotDevicesByShedQuery,
} from "@/redux/api/shedDataApi";
import { toast } from "sonner";
import {
  useGetAllIotDeviceModelQuery,
  useGetDeviceByModelQuery,
} from "@/redux/api/iotDeviceApi";

const AssignDeviceForm = () => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  // Get All Farmer's List
  const { data: allFarmers, isLoading: allFarmersLoading } =
    useGetAllFarmersQuery({});

  // Farmer Select
  const [selectedFarmer, setSelectedFarmer] = useState("");
  // Shed Select
  const [selectedShed, setSelectedShed] = useState("");
  const [shedListCalled, setShedListCalled] = useState(true);

  // Get All Device Models
  const { data: allDeviceModels, isLoading: allDeviceModelsLoading } =
    useGetAllIotDeviceModelQuery({});
  // Model Select
  const [selectedModel, setSelectedModel] = useState("");
  // Device Select
  const [selectedDevice, setSelectedDevice] = useState("");
  const [deviceListCalled, setDeviceListCalled] = useState(true);

  // Device Assign to Farmer API
  const [addIotDevices] = useAddIotDevciesMutation();

  const { data: shedListByFarmerID, isLoading: shedListByFarmerIDLoading } =
    useGetShedByFarmerQuery(selectedFarmer, {
      skip: shedListCalled,
    });

  const { data: deviceListByModelID, isLoading: deviceListByModelIDLoading } =
    useGetDeviceByModelQuery(selectedModel, {
      skip: deviceListCalled,
    });

  useEffect(() => {
    if (selectedFarmer) {
      setShedListCalled(false); // Allow query to fire
    }
  }, [selectedFarmer]);

  useEffect(() => {
    if (selectedModel) {
      setDeviceListCalled(false); // Allow query to fire
    }
  }, [selectedModel]);

  const handleSubmit = async (values: FieldValues) => {
    let payload = {
      farmer_id: values.farmer_id,
      shed_id: values.shed_id,
      device_id: values.device_id,
    };
    try {
      const res = await addIotDevices(payload).unwrap();
      if (res) {
        setError("");
        toast.success(res?.message || "Device assigned to farmer!");
        if (resetForm) {
          resetForm({
            farmer_id: "",
            shed_id: "",
            device_model: "",
            device_id: "",
          });
        }
      } else {
        toast.error(res?.message);
        setError(res?.data || res?.error || "Something went wrong!");
      }
    } catch (err: any) {
      setError(err.errors);
    }
  };

  const handleFarmerChange = (farmer_id: string) => {
    setSelectedFarmer(farmer_id);
  };

  const handleModelChange = (model_id: string) => {
    setSelectedModel(model_id);
  };

  return (
    <>
      <>
        <SportsFrom
          // defaultValues={tracebilityDefaultValues(tracebilityData?.data)}
          onSubmit={handleSubmit}
          setInputValues={(reset, methods) => {
            setResetForm(() => reset);
          }}
        >
          <div className="mb-6 mt-6">
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Farmer <span className="text-danger">*</span>
                </label>
                <Select
                  name="farmer_id"
                  onChangeSelect={handleFarmerChange}
                  style="select select-bordered w-full max-w-xs bg-white dark:bg-black disabled:bg-slate-300 disabled:border-0 disabled:text-slate-800"
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
                  Shed <span className="text-danger">*</span>
                </label>
                <Select
                  name="shed_id"
                  style="select select-bordered w-full max-w-xs bg-white dark:bg-black disabled:bg-slate-300 disabled:border-0 disabled:text-slate-800"
                >
                  <option defaultValue="">Select Shed</option>
                  {shedListByFarmerID?.data.map((data: IUser) => (
                    <option value={data.id} key={data.id}>
                      {data.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Device Model <span className="text-danger">*</span>
                </label>
                <Select
                  name="device_model"
                  onChangeSelect={handleModelChange}
                  style="select select-bordered w-full max-w-xs bg-white dark:bg-black disabled:bg-slate-300 disabled:border-0 disabled:text-slate-800"
                >
                  <option defaultValue="">Select Device Model</option>
                  {allDeviceModels?.data.map((data: any) => (
                    <option value={data.id} key={data.id}>
                      {data.model_name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Device Name <span className="text-danger">*</span>
                </label>
                <Select
                  name="device_id"
                  style="select select-bordered w-full max-w-xs bg-white dark:bg-black disabled:bg-slate-300 disabled:border-0 disabled:text-slate-800"
                >
                  <option defaultValue="">Select Device Name</option>
                  {deviceListByModelID?.data.map((data: any) => (
                    <option value={data.id} key={data.id}>
                      {data.device_name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="mt-0 flex flex-row items-end justify-end gap-2 sm:justify-end">
              <button
                className="btn btn-md w-1/4 border-0 bg-green-800 text-white hover:bg-green-900"
                type="submit"
              >
                ADD
              </button>
            </div>
          </div>
        </SportsFrom>
      </>
    </>
  );
};

export default AssignDeviceForm;
