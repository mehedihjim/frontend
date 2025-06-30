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
import { useGenerateIotDevicesMutation } from "@/redux/api/iotDeviceApi";

const AddDeviceForm = () => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );
  const [getFormValues, setFormValuesGetter] = useState<
    (() => FieldValues) | null
  >(null);
  const [generatedDevices, setGeneratedDevices] = useState<string[]>([]);

  const [generateIotDevice] = useGenerateIotDevicesMutation();

  const generateDevices = () => {
    if (!getFormValues) return;

    const { device_name, device_qty } = getFormValues();

    if (!device_name || !device_qty) {
      console.error("Device name or quantity missing");
      return;
    }

    const qty = parseInt(device_qty, 10);
    if (isNaN(qty) || qty <= 0) {
      console.error("Quantity must be a positive number");
      return;
    }

    const devices = Array.from({ length: qty }, (_, i) => {
      const serial = String(i + 1).padStart(3, "0"); // "001", "002", ...
      return `${device_name}-${serial}`;
    });

    // console.log("Generated Devices:", devices);
    setGeneratedDevices(devices); // Save to state
  };

  const resetGeneratedDevice = () => {
    setGeneratedDevices([]);
    if (resetForm) {
      resetForm({
        device_name: "",
        device_qty: "",
      });
    }
  };

  const handleSubmit = async (values: FieldValues) => {
    let payload = {
      model_name: values.device_name,
      iot_devices_name: generatedDevices,
    };
    try {
      const res = await generateIotDevice(payload).unwrap();
      if (res) {
        setError("");
        toast.success(res?.message || "Devices Added Successfully!");
        resetGeneratedDevice();
      } else {
        toast.error(res?.message);
        setError(res?.data || res?.error || "Something went wrong!");
      }
    } catch (err: any) {
      setError(err.errors);
    }
  };

  return (
    <>
      <>
        <SportsFrom
          // defaultValues={tracebilityDefaultValues(tracebilityData?.data)}
          onSubmit={handleSubmit}
          setInputValues={(reset, methods) => {
            setResetForm(() => reset);
            setFormValuesGetter(() => methods.getValues);
          }}
        >
          <div className="mb-6 mt-6">
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Model Name <span className="text-danger">*</span>
                </label>
                <SportsInput
                  type="text"
                  errors={error}
                  name="device_name"
                  style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Quantity <span className="text-danger">*</span>
                </label>
                <SportsInput
                  type="text"
                  errors={error}
                  name="device_qty"
                  style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                />
              </div>
            </div>
            <div className="text-right">
              <button
                className="w-1/8 btn btn-md border-0 bg-red-700 text-white hover:bg-red-800"
                onClick={generateDevices}
                type="button"
              >
                Generate
              </button>
            </div>
            {generatedDevices.length > 0 && (
              <div className="mb-4 mt-8">
                <h2 className="mb-2 text-lg font-semibold text-black dark:text-white">
                  Generated Devices:
                </h2>
                <ul className="text-gray-800 dark:text-gray-200 grid list-disc grid-cols-2 gap-2 pl-6 text-sm sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10">
                  {generatedDevices.map((serial, index) => (
                    <div key={serial}>
                      <Image
                        src={poulex_device_sprite}
                        alt="not found"
                        height={100}
                        width={100}
                        className="mb-1"
                      />
                      <span
                        className="mt-2 text-sm font-bold text-black dark:text-white"
                        key={index}
                      >
                        {serial}
                      </span>
                    </div>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 flex flex-row items-end justify-end gap-2 sm:justify-end">
              <button
                className="btn btn-md w-1/2 border-0 bg-red-700 text-white hover:bg-red-800"
                type="button"
                onClick={resetGeneratedDevice}
              >
                Reset
              </button>
              <button
                className="btn btn-md w-1/2 border-0 bg-green-800 text-white hover:bg-green-900"
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

export default AddDeviceForm;
