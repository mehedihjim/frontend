"use client";
import { formatDate } from "@/utils/format_date";
import { formatTime } from "@/utils/format_time";
import React from "react";
import Image from "next/image";

const DeviceDataShow = ({ latestReading }: any) => {
  console.log(latestReading, "latest reading");

  return (
    <div className="rounded-sm bg-white p-2 dark:bg-slate-700">
      <div className="text-right">
        {latestReading && (
          <>
            <span className="text-green-700">
              Last Update: {formatTime(latestReading?.date)}
            </span>
            <br />
            <span className="text-green-700">
              Date: {formatDate(latestReading?.date)}
            </span>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mt-4"
            src={"/images/icon/temp_icon.png"}
            width={75}
            height={75}
            alt="profile"
          />
          <div className="mt-3 text-lg font-bold text-slate-800 dark:text-white lg:text-4xl">
            {latestReading?.temperature &&
              (() => {
                const value = parseFloat(latestReading.temperature);
                if (isNaN(value)) return null;
                return Number.isInteger(value) ? value : value.toFixed(1);
              })()}
            °C
          </div>
          <span className="text-center text-base text-black dark:text-white lg:text-lg">
            Temp.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mt-4"
            src={"/images/icon/ammonia_icon.png"}
            width={75}
            height={75}
            alt="profile"
          />
          <div className="mt-3 text-lg font-bold text-slate-800 dark:text-white lg:text-4xl">
            {latestReading?.ammonia_count &&
              (() => {
                const value = parseFloat(latestReading.ammonia_count);
                if (isNaN(value)) return null;
                return Number.isInteger(value) ? value : value.toFixed(2);
              })()}
          </div>
          <span className="text-center text-base text-black dark:text-white lg:text-lg">
            Ammonia Count
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mt-4"
            src={"/images/icon/methane_icon.png"}
            width={75}
            height={75}
            alt="profile"
          />
          <div className="mt-3 text-lg font-bold text-slate-800 dark:text-white lg:text-4xl">
            {latestReading?.methen_count &&
              (() => {
                const value = parseFloat(latestReading.methen_count);
                if (isNaN(value)) return null;
                return Number.isInteger(value) ? value : value.toFixed(2);
              })()}
          </div>
          <span className="text-center text-base text-black dark:text-white lg:text-lg">
            Methane Count
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mt-4"
            src={"/images/icon/humidity_icon.png"}
            width={75}
            height={75}
            alt="profile"
          />
          <div className="mt-3 text-lg font-bold text-slate-800 dark:text-white lg:text-4xl">
            {latestReading?.humidity &&
              (() => {
                const value = parseFloat(latestReading.humidity);
                if (isNaN(value)) return null;
                return Number.isInteger(value) ? value : value.toFixed(2);
              })()}
          </div>
          <span className="text-center text-base text-black dark:text-white lg:text-lg">
            Humidity
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mt-4"
            src={"/images/icon/smoke_icon.png"}
            width={75}
            height={75}
            alt="profile"
          />
          <div className="mt-3 text-lg font-bold text-slate-800 dark:text-white lg:text-4xl">
            {latestReading?.smoke_count &&
              (() => {
                const value = parseFloat(latestReading.smoke_count);
                if (isNaN(value)) return null;
                return Number.isInteger(value) ? value : value.toFixed(2);
              })()}
          </div>
          <span className="text-center text-base text-black dark:text-white lg:text-lg">
            Smoke Count
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviceDataShow;
