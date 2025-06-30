"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { FieldValues } from "react-hook-form";
import { convertTimeToPlain } from "@/utils/convertTimeToPlain";
import { useAddDeviceControlMutation } from "@/redux/api/iotDeviceApi";
import { toast } from "sonner";

const states = ["OFF", "ON", "AUTO"] as const;
type StateType = (typeof states)[number];

const motorImageMap: Record<StateType, string> = {
  OFF: "/images/icon/sprinkler_bw.png",
  ON: "/images/icon/sprinkler_color.png",
  AUTO: "/images/icon/sprinkler_color.png",
};
const lightImageMap: Record<StateType, string> = {
  OFF: "/images/icon/lightbulb_bw.png",
  ON: "/images/icon/lightbulb_color.png",
  AUTO: "/images/icon/lightbulb_color.png",
};
const fanImageMap: Record<StateType, string> = {
  OFF: "/images/icon/fan_bw.png",
  ON: "/images/icon/fan_color.png",
  AUTO: "/images/icon/fan_color.png",
};

const DeviceControlBox = ({ deviceData }: any) => {
  console.log(deviceData, "device data");

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  const [currentMotorState, SetCurrentState] = useState<StateType>("OFF");
  const [currentLightState, SetCurrentLightState] = useState<StateType>("OFF");
  const [currentFanState, SetCurrentFanState] = useState<StateType>("OFF");

  const [tempThresholds, setTempThresholds] = useState<any>({});
  const [timeThresholds, setTimeThresholds] = useState<any>({});
  const [fanThresholds, setFanThresholds] = useState<any>({});

  const [triggerControl, setTriggerControl] = useState(false);

  const [deviceControl] = useAddDeviceControlMutation();

  const toggleMotorState = () => {
    SetCurrentState((prev) => {
      const currentIndex = states.indexOf(prev);
      const nextIndex = (currentIndex + 1) % states.length;
      return states[nextIndex];
    });
    setTriggerControl(true);
  };

  const toggleLightState = () => {
    SetCurrentLightState((prev) => {
      const currentIndex = states.indexOf(prev);
      const nextIndex = (currentIndex + 1) % states.length;
      return states[nextIndex];
    });
    setTriggerControl(true);
  };

  const toggleFanState = () => {
    SetCurrentFanState((prev) => {
      const currentIndex = states.indexOf(prev);
      const nextIndex = (currentIndex + 1) % states.length;
      return states[nextIndex];
    });
    setTriggerControl(true);
  };

  useEffect(() => {
    if (triggerControl) {
      handleDeviceControl();
      setTriggerControl(false); // reset trigger
    }
  }, [currentMotorState, currentLightState, currentFanState, triggerControl]);

  const handleMotorThresholdSubmit = async (values: FieldValues) => {
    setTempThresholds({
      motor_on: values.motor_on,
      motor_off: values.motor_off,
    });
    handleDeviceControl();
  };
  const handleLightThresholdSubmit = async (values: FieldValues) => {
    const lightOn = convertTimeToPlain(values?.light_on);
    const lightOff = convertTimeToPlain(values?.light_off);
    setTimeThresholds({
      light_on: lightOn,
      light_off: lightOff,
    });
    handleDeviceControl();
  };
  const handleFanThresholdSubmit = async (values: FieldValues) => {
    setFanThresholds({
      methane_threshold: values.methane_threshold,
      ammonia_threshold: values.ammonia_threshold,
    });
    handleDeviceControl();
  };

  const handleDeviceControl = async () => {
    console.log(tempThresholds, timeThresholds, fanThresholds);

    let payload = {
      device_id: deviceData?.device,
      motor_status: currentMotorState,
      light_status: currentLightState,
      fan_status: currentFanState,
      ...tempThresholds,
      ...timeThresholds,
      ...fanThresholds,
      token: "dXNzYmQubmV0",
    };
    console.log(payload, "pppp");

    try {
      const res = await deviceControl(payload).unwrap();
      if (res) {
        setError("");
        toast.success(res?.message || "Device Control Data Set Successfully!");
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
      <div className="rounded-sm bg-white p-2 dark:bg-slate-700">
        <h1 className="py-2 ps-4 text-xl font-bold text-red-700 dark:text-red-300">
          Device Control
        </h1>
        <div className="flex-cols flex justify-around px-4">
          <div className="p-2">
            <div
              className="cursor-pointer rounded-lg bg-rose-50 p-2 text-center shadow-md transition transition-transform duration-150 hover:shadow-lg active:scale-95 dark:bg-slate-800 sm:p-5"
              onClick={toggleMotorState}
            >
              <Image
                className="mt-4"
                src={motorImageMap[currentMotorState]}
                width={75}
                height={75}
                alt="profile"
              />
              <div className="mt-2 text-lg font-black lg:text-2xl">
                {currentMotorState === "ON" && (
                  <span className="text-green-900 dark:text-green-300">ON</span>
                )}
                {currentMotorState === "OFF" && (
                  <span className="text-slate-600 dark:text-slate-300">
                    OFF
                  </span>
                )}
                {currentMotorState === "AUTO" && (
                  <span className="text-orange-600 dark:text-orange-300">
                    AUTO
                  </span>
                )}
              </div>
            </div>
            <div className="mt-1 text-center text-base font-semibold text-red-700 dark:text-red-200 lg:text-lg">
              Sprinkler
            </div>
          </div>
          <div className="p-2">
            <div
              className="cursor-pointer rounded-lg bg-rose-50 p-2 text-center shadow-md transition transition-transform duration-150 hover:shadow-lg active:scale-95 dark:bg-slate-800 sm:p-5"
              onClick={toggleLightState}
            >
              <Image
                className="mt-4"
                src={lightImageMap[currentLightState]}
                width={75}
                height={75}
                alt="profile"
              />
              <div className="mt-2 text-lg font-black lg:text-2xl">
                {currentLightState === "ON" && (
                  <span className="text-green-900 dark:text-green-300">ON</span>
                )}
                {currentLightState === "OFF" && (
                  <span className="text-slate-600 dark:text-slate-300">
                    OFF
                  </span>
                )}
                {currentLightState === "AUTO" && (
                  <span className="text-orange-600 dark:text-orange-300">
                    AUTO
                  </span>
                )}
              </div>
            </div>
            <div className="mt-1 text-center text-base font-semibold text-red-700 dark:text-red-200 lg:text-lg">
              Light
            </div>
          </div>
          <div className="p-2">
            <div
              className="cursor-pointer rounded-lg bg-rose-50 p-2 text-center shadow-md transition transition-transform duration-150 hover:shadow-lg active:scale-95 dark:bg-slate-800 sm:p-5"
              onClick={toggleFanState}
            >
              <Image
                className="mt-4"
                src={fanImageMap[currentFanState]}
                width={75}
                height={75}
                alt="profile"
              />
              <div className="mt-2 text-lg font-black lg:text-2xl">
                {currentFanState === "ON" && (
                  <span className="text-green-900 dark:text-green-300">ON</span>
                )}
                {currentFanState === "OFF" && (
                  <span className="text-slate-600 dark:text-slate-300">
                    OFF
                  </span>
                )}
                {currentFanState === "AUTO" && (
                  <span className="text-orange-600 dark:text-orange-300">
                    AUTO
                  </span>
                )}
              </div>
            </div>
            <div className="mt-1 text-center text-base font-semibold text-red-700 dark:text-red-200 lg:text-lg">
              Fan
            </div>
          </div>
        </div>
      </div>
      {/* Set Automatic Threshold Params */}
      <div className="mt-2 rounded-sm bg-white p-2 dark:bg-slate-700">
        <h1 className="mb-2 py-2 ps-4 text-xl font-bold text-red-700 dark:text-red-300">
          Set Auto Threshold
        </h1>
        <div className="flex flex-col px-2 lg:px-4">
          <div className="px-2">
            <div className="mb-2 text-start text-base font-bold text-red-700">
              <span className="rounded-full bg-red-100 px-4 py-2">
                Sprinkler
              </span>
            </div>
            <SportsFrom onSubmit={handleMotorThresholdSubmit}>
              <div className="mb-2">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Motor ON
                      <span className="text-danger">*</span>
                    </label>
                    <SportsInput
                      type="text"
                      errors={error}
                      name="motor_on"
                      style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Motor OFF
                      <span className="text-danger">*</span>
                    </label>
                    <SportsInput
                      type="text"
                      errors={error}
                      name="motor_off"
                      style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                    />
                  </div>
                  {/* Button div positioned at the bottom */}
                  <div className="flex items-end sm:justify-start">
                    <button
                      className="btn btn-md w-1/2 border-0 bg-red-700 text-white hover:bg-red-800"
                      type="submit"
                    >
                      Set
                    </button>
                  </div>
                </div>
              </div>
            </SportsFrom>
          </div>
        </div>
        <div className="flex flex-col px-2 lg:px-4">
          <div className="px-2">
            <div className="mb-2 mt-2 text-start text-base font-bold text-red-700">
              <span className="rounded-full bg-red-100 px-4 py-2">Light</span>
            </div>
            <SportsFrom onSubmit={handleLightThresholdSubmit}>
              <div className="mb-2">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Light ON
                      <span className="text-danger">*</span>
                    </label>

                    <SportsInput
                      type="time"
                      errors={error}
                      name="light_on"
                      style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Light OFF
                      <span className="text-danger">*</span>
                    </label>

                    <SportsInput
                      type="time"
                      errors={error}
                      name="light_off"
                      style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                    />
                  </div>
                  {/* Button div positioned at the bottom */}
                  <div className="flex items-end sm:justify-start">
                    <button
                      className="btn btn-md w-1/2 border-0 bg-red-700 text-white hover:bg-red-800"
                      type="submit"
                    >
                      Set
                    </button>
                  </div>
                </div>
              </div>
            </SportsFrom>
          </div>
        </div>
        <div className="flex flex-col px-2 lg:px-4">
          <div className="px-2">
            <div className="mb-2 mt-2 text-start text-base font-bold text-red-700">
              <span className="rounded-full bg-red-100 px-4 py-2">Fan</span>
            </div>
            <SportsFrom onSubmit={handleFanThresholdSubmit}>
              <div className="mb-2">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Methane Limit
                      <span className="text-danger">*</span>
                    </label>
                    <SportsInput
                      type="text"
                      errors={error}
                      name="methane_threshold"
                      style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Ammonia Limit
                      <span className="text-danger">*</span>
                    </label>
                    <SportsInput
                      type="text"
                      errors={error}
                      name="ammonia_threshold"
                      style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                    />
                  </div>
                  {/* Button div positioned at the bottom */}
                  <div className="flex items-end sm:justify-start">
                    <button
                      className="btn btn-md w-1/2 border-0 bg-red-700 text-white hover:bg-red-800"
                      type="submit"
                    >
                      Set
                    </button>
                  </div>
                </div>
              </div>
            </SportsFrom>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceControlBox;
