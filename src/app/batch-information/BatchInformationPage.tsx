import { useBatchInformationQuery } from "@/redux/api/batchApi";
import Image from "next/image";

const BatchInformationPage = ({ batchID }: any) => {
  const { data: batchInformation, isLoading: batchInformationLoading } =
    useBatchInformationQuery(batchID);

  return (
    <>
      <div>
        {/* Top Link */}
        <div className="text-end">
          <div>
            <span className="text-black dark:text-white">
              <small>
                Poulex:{" "}
                <a
                  className="text-blue-600 underline"
                  target="blank"
                  href="https://poulex.farm"
                >
                  https://poulex.farm
                </a>
              </small>
            </span>
          </div>
        </div>
        {/* Header Section */}
        <div>
          <div className="mx-auto flex flex-col items-center text-center">
            {/* Poulex Logo */}
            <Image
              className="mt-4"
              src={"/images/logo/poulex-logo.svg"}
              width={250}
              height={75}
              alt="profile"
            />
            <h1 className="text-sm text-black dark:text-white sm:text-lg md:text-xl">
              Rural Microenterprise Transformation Project (RMTP)
            </h1>
            <h2 className="text-xs  text-black dark:text-white sm:text-base md:text-lg">
              উপ-প্রকল্প : নিরাপদ পোল্ট্রি ও পোল্ট্রিজাত পণ্যের বাজার উন্নয়নে
              ভ্যালু চেইন
            </h2>
          </div>
        </div>
        {/* Batch Basic Information and QR Code section */}
        <div className="mt-2">
          <div className="flex justify-between">
            <div className="text-black dark:text-white">
              <h3>
                <span className="font-bold">Shed No:</span>{" "}
                {batchInformation?.data?.general_info?.shed_no}
              </h3>
              <h3>
                <span className="font-bold">Batch No:</span>{" "}
                {batchInformation?.data?.general_info?.batch_number}
              </h3>
              <h3>
                <span className="font-bold">Bird Type:</span>{" "}
                {batchInformation?.data?.general_info?.bird_type}
              </h3>
              <h3>
                <span className="font-bold">Bird Count:</span>{" "}
                {batchInformation?.data?.general_info?.bird_count}
              </h3>
              <h3>
                <span className="font-bold">Age:</span>{" "}
                {batchInformation?.data?.general_info?.age} days
              </h3>
              <h3>
                <span className="font-bold">Avg Weight:</span>{" "}
                {batchInformation?.data?.general_info?.average_weight} gm
              </h3>
              <h3>
                <span className="font-bold">Farm Location:</span>{" "}
                {batchInformation?.data?.general_info?.farm_location}
              </h3>
            </div>
            <div className="text-center">
              <Image
                className="mt-4"
                src={"/images/logo/qr.png"}
                width={115}
                height={75}
                alt="profile"
              />
              <button className="btn btn-success btn-sm mt-2 text-white">
                {" "}
                Download
              </button>
            </div>
          </div>
        </div>
        {/* Farmer and Farm's Basic Information */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    খামারির প্রাথমিক তথ্য
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className=" w-1/2 border border-slate-300 px-4 py-2">
                    নাম
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.name}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    জেলা
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.district}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    উপজেলা
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.upazila}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    ইউনিয়ন
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.union}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    গ্রাম
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.village}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    ফোন নাম্বার
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.mobile}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    শেড নং
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {" "}
                    {batchInformation?.data?.basic_info?.shed_number}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    ব্যাচ নং
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {" "}
                    {batchInformation?.data?.basic_info?.batch_number}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    কি ধরনের মুরগি পালন করেছেন?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.bird_type}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    শেডে বাচ্চা তোলার তারিখ
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.date_of_arrival}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    মুরগীর সংখ্যা
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.bird_count}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    বাচ্চার দর (প্রতি পিস)
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.basic_info?.chicks_price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Bio-Security Information */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    খামারে জৈব নিরাপত্তা ব্যবস্থাপনার তথ্য
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className=" w-1/2 border border-slate-300 px-4 py-2">
                    খামারে নিয়মিত জীবাণুনাশক স্প্রে করা হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bio_security_info
                      ?.sprayedDisinfectants === "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    মুরগির বাচ্চা তোলার আগে শেড ব্লিচিং পাউডার দিয়ে পরিষ্কার করা
                    হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bio_security_info
                      ?.bleachingCleaned === "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    ফিউমিগেশন করা হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bio_security_info?.isFumigation ===
                    "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    বাফার জোন ছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bio_security_info?.isBufferZone ===
                    "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    ফুটবাথ ছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bio_security_info?.isFootBaths ===
                    "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    খামারে প্রবেশের পূর্বে পা স্প্রে করা হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bio_security_info?.entrySpary ===
                    "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="w-1/2 border border-slate-300 px-4 py-2">
                    খামারে মৃত প্রাণী/মেয়াদ উত্তীর্ন ঔষধ, টীকা, ব্যবহৃত
                    সিরিঞ্জ/সরঞ্জাম ইত্যাদি পুঁতে/পুড়িয়ে ফেলার ব্যবস্থা রয়েছিল
                    কি?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bio_security_info?.isDeadAnimal ===
                    "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* DOC Buying Information */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    সুস্থ ও সবল (ইনব্রিডিং মুক্ত) ভালো সোর্স হতে একদিন বয়সী
                    বাচ্চা ক্রয়
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className=" w-1/2 border border-slate-300 px-4 py-2">
                    কোম্পানীর নাম
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.buy_health_info?.companyName}
                  </td>
                </tr>
                {batchInformation?.data?.buy_health_info?.isGovt && (
                  <tr className="bg-white dark:bg-slate-600">
                    <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                      সরকারি হ্যাচারি
                    </td>
                    <td className="w-1/2 border border-slate-300 px-6">
                      {batchInformation?.data?.buy_health_info?.isGovt ===
                      "true"
                        ? "হ্যাঁ"
                        : "না"}
                    </td>
                  </tr>
                )}
                {batchInformation?.data?.buy_health_info?.other && (
                  <tr className="bg-white dark:bg-slate-600">
                    <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                      অন্যান্য / লোকাল
                    </td>
                    <td className="w-1/2 border border-slate-300 px-6">
                      {batchInformation?.data?.buy_health_info?.other}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Ready Feed and Water Info */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    রেডি ফিড ও পানির তথ্য
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className=" w-1/2 border border-slate-300 px-4 py-2">
                    নিরাপদ রেডি ফিড ও পানির সরবরাহ করা হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.feed_and_water_info?.safeWater ===
                    "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    ফিড কোম্পানীর নাম
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {
                      batchInformation?.data?.feed_and_water_info
                        ?.foodCompanyName
                    }
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    পানি টেস্ট করা হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.feed_and_water_info
                      ?.isWaterTest === "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    পানি টেস্টের নাম
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {
                      batchInformation?.data?.feed_and_water_info
                        ?.waterTestMethod
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Pre-biotic and Pro-biotic Info */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    প্রিবায়োটিক ও প্রোবায়োটিক তথ্য
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    খামারে অ্যান্টিবায়োটিকের পরিবর্তে প্রিবায়োটিক ও প্রোবায়োটিক
                    ব্যবহার করা হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.prebiotic_info?.isPreBiotic ===
                    "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    কতদিন বয়সে দেওয়া হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {" "}
                    {batchInformation?.data?.prebiotic_info?.probioticsDays}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Antibiotic Info */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    অ্যান্টিবায়োটিক ব্যবহারের তথ্য
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    অ্যান্টিবায়োটিক ব্যবহারের পর উইথড্রল পিরিয়ড অনুসরণ করা
                    হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.antibiotic_info
                      ?.isWithdrwalFollow === "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    সর্বশেষ কত দিন বয়সে এন্টিবায়োটিক দেওয়া হয়েছিল ?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.antibiotic_info?.antibioticsDays}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* veterinary Info */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    প্রাণী চিকিৎসকের তথ্য
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    খামারে কি রেজিস্টার্ড প্রাণি চিকিৎসকের পরামর্শ গ্রহণ করা
                    হয়েছিল?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.veterinarian_info?.doctorAdvice ===
                    "true"
                      ? "হ্যাঁ"
                      : "না"}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    প্রেসক্রিপশনের ছবি
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6"> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Vaccination Info */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={3}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    ভ্যাক্সিন
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <th className=" w-1/4 border border-slate-300 px-4 py-2">
                    #
                  </th>
                  <th className=" w-1/4 border border-slate-300 px-4 py-2">
                    টিকা প্রদানের বয়স (দিন)
                  </th>
                  <th className=" w-2/4 border border-slate-300 px-4 py-2">
                    রোগের নাম
                  </th>
                </tr>
                {batchInformation?.data?.vaccine_info?.map(
                  (vaccine: any, index: number) => (
                    <tr className="bg-white dark:bg-slate-600" key={index}>
                      <td className="border border-slate-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-slate-300 px-4 py-2">
                        {vaccine?.age}
                      </td>
                      <td className="border border-slate-300 px-4 py-2">
                        {vaccine?.disease_name === "Other"
                          ? vaccine?.other
                          : vaccine?.disease_name}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Birds Weight Info */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    মুরগির ওজনের তথ্য
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    গড় ওজন
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bird_weight_info?.average_weight}
                    গ্রাম
                  </td>
                </tr>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    ওজন পরিমাপের সময় মুরগির বয়স?
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.bird_weight_info?.weight_count_age}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Waste Removal Management Info */}
        <div className="mt-2">
          <div className="relative overflow-x-auto">
            <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
              <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                <tr>
                  <th
                    colSpan={2}
                    scope="col"
                    className="rounded-e-lg px-6 py-3 text-center"
                  >
                    বর্জ্য অপসারণ ব্যবস্থাপনা
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-600">
                  <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                    বর্জ্য অপসারণ ব্যবস্থাপনার ধরন
                  </td>
                  <td className="w-1/2 border border-slate-300 px-6">
                    {batchInformation?.data?.waste_disposal_info?.wasteRemoval}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Broiler Info */}
        {batchInformation?.data?.general_info?.bird_type === "Broiler" && (
          <div className="mt-2">
            <div className="relative overflow-x-auto">
              <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
                <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                  <tr>
                    <th
                      colSpan={2}
                      scope="col"
                      className="rounded-e-lg px-6 py-3 text-center"
                    >
                      ব্রয়লার মুরগির তথ্য
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                      ব্রয়লারের প্রকৃত স্বাদ আনায়নে ৪০-৪২ দিন পর্যন্ত মুরগি
                      পালন করা হয়েছিল ?
                    </td>
                    <td className="w-1/2 border border-slate-300 px-6">
                      {batchInformation?.data?.broiler_chicken_info
                        ?.is40_42_days === "true"
                        ? "হ্যাঁ"
                        : "না"}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                      কতদিন বয়সে বিক্রয় করেছেন?
                    </td>
                    <td className="w-1/2 border border-slate-300 px-6">
                      {
                        batchInformation?.data?.broiler_chicken_info
                          ?.selling_age
                      }
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className="boreder-b w-1/2 border border-slate-300 px-4 py-2">
                      এফসিআর এর পরিবর্তে গ্রোথ চার্ট অনুসরণ করা হয়ে ছিল কি?
                    </td>
                    <td className="w-1/2 border border-slate-300 px-6">
                      {batchInformation?.data?.broiler_chicken_info
                        ?.isGrowth_chart_used === "true"
                        ? "হ্যাঁ"
                        : "না"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Growth Chart */}
        {batchInformation?.data?.broiler_chicken_info?.isGrowth_chart_used ===
          "true" && (
          <div className="mt-2">
            <div className="relative overflow-x-auto">
              <table className="w-full bg-red-100 text-left text-sm text-black dark:bg-red-500 dark:text-white rtl:text-right">
                <thead className="dark:bg-gray-700  text-base uppercase text-black dark:text-white">
                  <tr>
                    <th
                      colSpan={6}
                      scope="col"
                      className="rounded-e-lg px-6 py-3 text-center"
                    >
                      গ্রোথ চার্ট
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-slate-600">
                    <th className=" w-1/8 border border-slate-300 px-4 py-2">
                      Age(Week)
                    </th>
                    <th className=" w-2/8 border border-slate-300 px-4 py-2">
                      Feed Consumed Per Bird(KG)
                    </th>
                    <th className=" w-3/8 border border-slate-300 px-4 py-2">
                      Cumulative Feed Consumed(KG)
                    </th>
                    <th className=" w-2/8 border border-slate-300 px-4 py-2">
                      Average Body Weight Per Bird(KG)
                    </th>
                    <th className=" w-2/8 border border-slate-300 px-4 py-2">
                      Average Body Weight Gain Per Bird(KG)
                    </th>
                    <th className=" w-2/8 border border-slate-300 px-4 py-2">
                      অর্জিত ওজন(KG)
                    </th>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 1
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.167
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      0.167
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.185
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.185
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.7
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 2
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.375
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      0.542
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.465
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.280
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.8
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 3
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.65
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      1.192
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.943
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.478
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.9
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 4
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.945
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      2.137
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.524
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.581
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 5
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.215
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      3.352
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      2.191
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.667
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.1
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 6
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.434
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      4.786
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      2.857
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.666
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.2
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 7
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.593
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      6.379
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      3.506
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.649
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.3
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 8
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.691
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      8.070
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      4.111
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.605
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.4
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-600">
                    <td className=" w-1/8 border border-slate-300 px-4 py-2">
                      Week 9
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.715
                    </td>
                    <td className=" w-3/8 border border-slate-300 px-4 py-2">
                      9.785
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      4.649
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      0.538
                    </td>
                    <td className=" w-2/8 border border-slate-300 px-4 py-2">
                      1.5
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BatchInformationPage;
