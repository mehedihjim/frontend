"use-client";

import { useState } from "react";
import Select from "../Froms/Select";
import SportsInput from "../Froms/SportsInput";
import { useFormContext } from "react-hook-form";
import Th from "../ui/table/Th";
import Td from "../ui/table/Td";

interface IFCR {
  row?: string | number;
  week?: string;
  feed?: string | number;
  cumulative?: string | number;
  weight?: string | number;
  gain?: string | number;
  name: string;
}

const TracebilityFormInputs = ({ batchData }: any) => {
  const { watch } = useFormContext();
  // Watch the value of "safeWater"
  const safeWater = watch("safeWater");
  // Watch the value of "isWaterTest"
  const isWaterTest = watch("isWaterTest");
  // Watch the value of "isPreBiotic"
  const isPreBiotic = watch("isPreBiotic");
  // Watch the value of "doctorAdvice"
  const doctorAdvice = watch("doctorAdvice");
  // Watch the value of "dlsRegistered"
  const dlsRegistered = watch("dlsRegistered");
  // Watch the value of "isGrowth_chart_used"
  const isGrowth_chart_used = watch("isGrowth_chart_used");

  const [otherDocSource, setOtherDocSource] = useState<boolean>(false);
  const [fcrData, setFcrData] = useState<IFCR[]>([
    {
      week: "Week 1",
      feed: "0.167",
      cumulative: "0.167",
      weight: "0.185",
      gain: "0.185",
      name: "growthWeekOne",
    },
    {
      week: "Week 2",
      feed: "0.375",
      cumulative: "0.542",
      weight: "0.465",
      gain: "0.280",
      name: "growthWeekTwo",
    },
    {
      week: "Week 3",
      feed: "0.65",
      cumulative: "1.192",
      weight: "0.943",
      gain: "0.478",
      name: "growthWeekThree",
    },
    {
      week: "Week 4",
      feed: "0.945",
      cumulative: "2.137",
      weight: "1.524",
      gain: "0.581",
      name: "growthWeekFour",
    },
    {
      week: "Week 5",
      feed: "1.215",
      cumulative: "3.352",
      weight: "2.191",
      gain: "0.667",
      name: "growthWeekFive",
    },
    {
      week: "Week 6",
      feed: "1.434",
      cumulative: "4.786",
      weight: "2.857",
      gain: "0.666",
      name: "growthWeekSix",
    },
    {
      week: "Week 7",
      feed: "1.593",
      cumulative: "6.379",
      weight: "3.506",
      gain: "0.649",
      name: "growthWeekSeven",
    },
    {
      week: "Week 8",
      feed: "1.691",
      cumulative: "8.070",
      weight: "4.111",
      gain: "0.605",
      name: "growthWeekEight",
    },
    {
      week: "Week 9",
      feed: "1.715",
      cumulative: "9.785",
      weight: "4.649",
      gain: "0.538",
      name: "growthWeekNine",
    },
  ]);

  const handleDocSourceChange = (selectedValue: string) => {
    if (selectedValue === "Other") {
      setOtherDocSource(true);
    } else {
      setOtherDocSource(false);
    }
  };
  return (
    <>
      {/*----------------------------------------------
                                Step - 1
           ------------------------------------------------*/}
      <div className="mb-3 mt-3">
        <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
          খামারে জৈব নিরাপত্তা ব্যবস্থাপনা
        </h4>

        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              ক. খামারে নিয়মিত জীবাণুনাশক স্প্রে করেন?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="sprayedDisinfectants"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="sprayedDisinfectants"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              খ. মুরগির বাচ্চা তোলার আগে শেড ব্লিচিং পাউডার দিয়ে পরিষ্কার
              করেছেন?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="bleachingCleaned"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="bleachingCleaned"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              গ. ফিউমিগেশন করেন?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isFumigation"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isFumigation"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              ঘ. বাফার জোন আছে?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isBufferZone"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isBufferZone"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              ঙ. ফুটবাথ আছে?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isFootBaths"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isFootBaths"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              চ. খামারে প্রবেশের পূর্বে পা স্প্রে করেন?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="entrySpary"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="entrySpary"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              ছ. খামারে মৃত প্রাণী/মেয়াদ উত্তীর্ন ঔষধ, টীকা, ব্যবহৃত
              সিরিঞ্জ/সরঞ্জাম ইত্যাদি পুঁতে/পুড়িয়ে ফেলার ব্যবস্থা রয়েছে কি?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isDeadAnimal"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isDeadAnimal"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
      </div>
      {/*----------------------------------------------
                                Step - 2
           ------------------------------------------------*/}
      <div className="mb-3 mt-3">
        <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
          সুস্থ ও সবল (ইনব্রিডিং মুক্ত) ভালো সোর্স হতে একদিন বয়সী বাচ্চা ক্রয়
        </h4>
        <div className="flex w-full flex-wrap">
          <div className="mt-3 w-full lg:w-1/3">
            <label className="mb-1 block font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              ক. কোম্পানীর নাম* <span className="text-danger">*</span>
            </label>
            <Select
              name="companyName"
              style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
              onChangeSelect={handleDocSourceChange}
            >
              <option defaultValue="">কোম্পানি নির্বাচন করুন</option>
              <option value="Government">সরকারি হ্যাচারি</option>
              <option value="Aftab">আফতাব হ্যাচারি</option>
              <option value="C P Bangladesh">সি পি বাংলাদেশ</option>
              <option value="EON">ইয়ন</option>
              <option value="Index">ইনডেক্স</option>
              <option value="Kazi Farms">কাজী ফার্মস</option>
              <option value="Nahar Agro">নাহার এগ্রো</option>
              <option value="Narish">নারিশ</option>
              <option value="Paragon">প্যারাগন</option>
              <option value="Provita">প্রভিটা</option>
              <option value="Quality">কোয়ালিটি</option>
              <option value="Other">অন্যান্য</option>
            </Select>
          </div>

          {otherDocSource && (
            <div className="mt-3 w-full lg:w-1/3">
              <label className="mb-1 block font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
                অন্যান্য / লোকাল
              </label>
              <SportsInput
                type="text"
                name="otherSource"
                style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
              />
            </div>
          )}
        </div>
      </div>
      {/*----------------------------------------------
                                Step - 3
           ------------------------------------------------*/}
      <div className="mb-3 mt-3">
        <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
          নিরাপদ ফিড ও পানি
        </h4>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              ক. নিরাপদ রেডি ফিড ও পানির সরবরাহ হয়?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="safeWater"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="safeWater"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        {safeWater === "true" && (
          <div className="mt-3 w-full lg:w-1/3">
            <label className="mb-1 block font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              ফিড কোম্পানীর নাম
            </label>
            <Select
              name="foodCompanyName"
              style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
            >
              <option defaultValue="">কোম্পানি নির্বাচন করুন</option>
              <option value="Aftab">আফতাব</option>
              <option value="Aman">আমান</option>
              <option value="Agata">আগাতা</option>
              <option value="C P Bangladesh">সিপি বাংলাদেশ</option>
              <option value="EON">ইয়ন</option>
              <option value="Index">ইনডেক্স</option>
              <option value="ACI Godrej">এসিআই গোদরেজ</option>
              <option value="Kazi Farms">কাজী ফার্মস</option>
              <option value="Nahar Agro">নাহার এগ্রো</option>
              <option value="Narish">নারিশ</option>
              <option value="New Hope">নিউ হোপ</option>
              <option value="Paragon">প্যারাগন</option>
              <option value="Provita">প্রভিটা</option>
              <option value="Quality">কোয়ালিটি</option>
              <option value="RRP">আরআরপি</option>
              <option value="Other">অন্যান্য</option>
            </Select>
          </div>
        )}
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              খ. পানি টেস্ট করা হয়েছে কি?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isWaterTest"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isWaterTest"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        {isWaterTest === "true" && (
          <div className="mt-3 w-full lg:w-1/3">
            <label className="mb-1 block font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              টেস্টের নাম
            </label>
            <Select
              name="waterTestMethod"
              style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
            >
              <option defaultValue="">নির্বাচন করুন</option>
              <option value="Litmus">লিটমাস</option>
              <option value="Ph">pH</option>
              <option value="Arsenic">আর্সেনিক</option>
              <option value="TDS">TDS</option>
              <option value="DO">DO</option>
              <option value="Clorin">ক্লোরিন</option>
              <option value="Other">অন্যান্য</option>
            </Select>
          </div>
        )}
      </div>
      {/*----------------------------------------------
                                Step - 4
       --------------------------------------------------*/}
      <div className="mb-3 mt-3">
        <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
          প্রিবায়োটিক ও প্রোবায়োটিক
        </h4>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              খামারে অ্যান্টিবায়োটিকের পরিবর্তে প্রিবায়োটিক ও প্রোবায়োটিক
              ব্যবহার করেন?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isPreBiotic"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isPreBiotic"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        <div className="flex w-full flex-wrap">
          {isPreBiotic === "true" && (
            <div className="mt-3 w-full lg:w-1/3">
              <label className="mb-1 block font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
                কত দিন বয়সে দিয়েছেন?
              </label>
              <SportsInput
                type="number"
                name="probioticsDays"
                style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
              />
            </div>
          )}
        </div>
      </div>
      {/*----------------------------------------------
                                Step - 5
       --------------------------------------------------*/}
      <div className="mb-3 mt-3">
        <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
          অ্যান্টিবায়োটিক
        </h4>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              অ্যান্টিবায়োটিক ব্যবহারের পর উইথড্রল পিরিয়ড অনুসরণ করেন?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isWithdrwalFollow"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isWithdrwalFollow"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        <div className="flex w-full flex-wrap">
          <div className="mt-3 w-full lg:w-1/3">
            <label className="mb-1 block font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              সর্বশেষ কত দিন বয়সে এন্টিবায়োটিক দিয়েছেন?
            </label>
            <SportsInput
              type="number"
              name="antibioticsDays"
              style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
            />
          </div>
        </div>
      </div>
      {/*----------------------------------------------
                                Step - 6
       --------------------------------------------------*/}
      <div className="mb-3 mt-3">
        <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
          চিকিৎসক
        </h4>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              খামারে রেজিস্টার্ড প্রাণি চিকিৎসকের পরামর্শ গ্রহণ করেন?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="doctorAdvice"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="doctorAdvice"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        {doctorAdvice === "true" && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="advicerType"
                  value="VS"
                  style="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  ক. VS
                </span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="advicerType"
                  value="ULO"
                  style="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  খ. ULO
                </span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="advicerType"
                  value="Both"
                  style="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  গ. উভয়ই
                </span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="advicerType"
                  value="Company_Doctor"
                  style="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  ঘ. কোম্পানির ভেটেরিনারি ডাক্তার
                </span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="advicerType"
                  value="Private_Practitioner"
                  style="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  ঙ. প্রাইভেট ভেট প্র্যাক্টিশনার
                </span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="advicerType"
                  value="GGAP_Trainer"
                  style="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  চ. GGAP এর মাস্টার ট্রেইনার
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
      {/*----------------------------------------------
                                Step - 7
       --------------------------------------------------*/}
      <div className="mb-3 mt-3">
        <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
          ডিএলএস -এ নিবন্ধন
        </h4>
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              ডিএলএস -এ খামার নিবন্ধন করেছেন?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="dlsRegistered"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="dlsRegistered"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
        {dlsRegistered === "true" && (
          <div className="flex w-full flex-wrap">
            <div className="mt-3 w-full lg:w-1/3">
              <label className="mb-1 block font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
                নিবন্ধন নং -
              </label>
              <SportsInput
                type="text"
                name="dlsRegiNo"
                style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
              />
            </div>
          </div>
        )}
        <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
          <div className="">
            <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
              খামারের পরিবেশ অধিদপ্তরের ছাড়পত্র গ্রহণ কার্যক্রম কি শুরু করা
              হয়েছে?
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isCertified"
                value="true"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-green-600">হ্যাঁ</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="isCertified"
                value="false"
                style="h-4 w-4 accent-red-500"
              />
              <span className="text-sm font-medium text-red-500">না</span>
            </label>
          </div>
        </div>
      </div>
      {/*----------------------------------------------
                                Step - 8
       --------------------------------------------------*/}
      <div className="mb-3 mt-3">
        <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
          বর্জ্য অপসারণ ব্যবস্থাপনা
        </h4>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="wasteRemoval"
                value="Direct_to_Farmer"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-black dark:text-white">
                ক. সরাসরি কাঁচা লিটার কৃষকের কাছে বিক্রি
              </span>
            </label>
          </div>
          <div>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="wasteRemoval"
                value="Compost_Production"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-black dark:text-white">
                খ. কম্পোস্ট উৎপাদন
              </span>
            </label>
          </div>
          <div>
            <label className="flex cursor-pointer items-center gap-1">
              <SportsInput
                type="radio"
                name="wasteRemoval"
                value="Compost_Plant"
                style="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm font-medium text-black dark:text-white">
                গ. কাঁচা লিটার কম্পোস্ট প্লান্টে বিক্রয়
              </span>
            </label>
          </div>
        </div>
      </div>
      {/*----------------------------------------------
                                Step - 9
       --------------------------------------------------*/}
      {batchData?.hen_type === "Broiler" && (
        <div className="mb-3 mt-3">
          <h4 className="rounded-md bg-red-600 p-2 text-center font-semibold text-white dark:bg-red-800">
            ব্রয়লার মুরগির ক্ষেত্রে
          </h4>
          <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
            <div className="">
              <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
                ক. ব্রয়লারের প্রকৃত স্বাদ আনায়নে ৪০-৪২ দিন পর্যন্ত মুরগী পালন
                করেছেন?
              </span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="is40_42_days"
                  value="true"
                  style="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-medium text-green-600">
                  হ্যাঁ
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="is40_42_days"
                  value="false"
                  style="h-4 w-4 accent-red-500"
                />
                <span className="text-sm font-medium text-red-500">না</span>
              </label>
            </div>
          </div>
          <div className="mt-2 flex justify-between rounded-lg bg-emerald-50 bg-opacity-50 p-3 shadow-sm dark:bg-slate-800">
            <div className="">
              <span className="text-xs font-medium text-black dark:text-white sm:text-sm md:text-base lg:text-lg">
                খ. FCR এর পরিবর্তে গ্রোথ চার্ট অনুসরন করেছেন?
              </span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="isGrowth_chart_used"
                  value="true"
                  style="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-medium text-green-600">
                  হ্যাঁ
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-1">
                <SportsInput
                  type="radio"
                  name="isGrowth_chart_used"
                  value="false"
                  style="h-4 w-4 accent-red-500"
                />
                <span className="text-sm font-medium text-red-500">না</span>
              </label>
            </div>
          </div>
          {isGrowth_chart_used === "true" && (
            <div className="mt-2 w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-start dark:border-slate-700">
                    <Th content={"Age (Week)"} />
                    <Th content={"Feed Consumed Per Bird (KG)"} />
                    <Th content={"Cumulative Feed Consumed (KG)"} />
                    <Th content={"Average Body Weight Per Bird (KG)"} />
                    <Th content={"Average Body Weight Gain Per Bird (KG)"} />
                    <Th content={"Gained Weight (KG)"} />
                  </tr>
                </thead>
                <tbody>
                  {fcrData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-200 dark:border-slate-700"
                    >
                      <Td content={row.week} />
                      <Td content={row.feed} />
                      <Td content={row.cumulative} />
                      <Td content={row.weight} />
                      <Td content={row.gain} />
                      <td>
                        <SportsInput
                          type="number"
                          name={row.name}
                          style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TracebilityFormInputs;
