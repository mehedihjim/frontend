"use client";
import Loading from "@/components/loading/Loading";
import Td from "@/components/ui/table/Td";
import Th from "@/components/ui/table/Th";
import { useGetActivityTableQuery } from "@/redux/features/activityTable/activityTableApi";
import { useRoleWiseUserQuery } from "@/redux/features/users/usersApi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CsvDownloader from "react-csv-downloader";
import { useReactToPrint } from "react-to-print";

const ActivityTable = () => {
  const [date, setDate] = useState<string>("");
  const [userType, setUserType] = useState<string>("admin");
  const [user, setUser] = useState<string>("");
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false); // New state to control search

  // Queries for different user types
  const { data, isLoading } = useRoleWiseUserQuery(userType);

  const [params, setParams] = useState({});

  const {
    data: activity,
    isLoading: activityLoading,
    refetch,
  } = useGetActivityTableQuery(params);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Activity Log`,
    removeAfterPrint: true,
    content: () => contentToPrint.current,
  });

  useEffect(() => {
    if (triggerSearch) {
      setParams({
        ...params,
        date: date,
        user_id: user,
      });
      refetch(); // Refetch data when search is triggered
      setTriggerSearch(false);
    }
  }, [triggerSearch, refetch]);

  if (activityLoading) return <Loading />;
  let formattedData: any = [];
  (activity?.data || []).forEach((item: any) => {
    formattedData.push({
      cell1: item?.log_name,
      cell2: item?.description,
      cell3: item?.created_at,
      cell4: JSON.stringify(item?.properties || {}),
    });
  });

  const handleSearch = () => {
    setTriggerSearch(true);
  };

  const columns = [
    { id: "cell1", displayName: "Log Name" },
    { id: "cell2", displayName: "Description" },
    { id: "cell3", displayName: "Time" },
    { id: "cell4", displayName: "Details" },
  ];

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSetUser = (e: ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value);
  };

  const dataWithEmptyRow = [...formattedData];

  return (
    <div>
      <div className="mt-4 font-semibold">Most Played Sports</div>
      <div className="mb-2 mt-2 flex justify-between">
        <div className="flex flex-row gap-2">
          {/* Date input */}
          <div className="input-container w-50 flex-auto">
            <label
              htmlFor="from_date"
              className="mb-1 block text-sm font-medium text-black dark:text-white"
            >
              From
            </label>
            <input
              type="date"
              name="from_date"
              value={date}
              onChange={handleDate}
              className="input-date-light dark:input-date-dark input input-xs input-bordered w-full max-w-full bg-white dark:bg-black"
            />
          </div>

          {/* User type dropdown */}
          <div className="input-container w-50 flex-auto">
            <label
              htmlFor="user_type"
              className="mb-1 block text-sm font-medium text-black dark:text-white"
            >
              User Type
            </label>
            <select
              name="user_type"
              id="user_type"
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setUser("");
                setTriggerSearch(false);
              }}
              className="input input-xs input-bordered w-full max-w-full bg-white dark:bg-black"
            >
              <option value="admin">Admin</option>
              <option value="institute">institute</option>
              <option value="club">Club</option>
              {/* <option value="mp">MP</option> */}
              <option value="sports-officer">Sports Officer</option>
            </select>
          </div>

          {/* User dropdown */}
          <div className="input-container w-50 flex-auto">
            <label
              htmlFor="user"
              className="mb-1 block text-sm font-medium text-black dark:text-white"
            >
              Select User
            </label>
            <select
              name="user"
              id="user"
              value={user}
              onChange={handleSetUser}
              className="input input-xs input-bordered w-full max-w-full bg-white dark:bg-black"
            >
              <option value="">Select User</option>
              {
                data?.data?.map((data: any) => (
                  <option value={data.id} key={data.id}>
                    {data.name}
                  </option>
                ))}
              
            </select>
          </div>

          {/* Search button */}
          <div className="input-container w-50 flex-auto justify-center">
            <button
              className="btn btn-xs rounded border-sky-900 bg-transparent text-sky-900 hover:bg-sky-900 hover:text-white dark:border-0 dark:bg-sky-800 dark:text-white dark:hover:bg-sky-900"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Print and CSV buttons */}
        <div className="flex place-items-center items-end gap-1">
          <div>
            <button
              className="btn btn-xs rounded border-sky-900 bg-transparent text-sky-900 hover:bg-sky-900 hover:text-white dark:border-0 dark:bg-sky-800 dark:text-white dark:hover:bg-sky-900"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
          <CsvDownloader
            filename="most_demandable_items_report"
            extension=".csv"
            separator=","
            columns={columns}
            datas={dataWithEmptyRow}
            title="Most Demandable Items Report"
          >
            <button className="btn btn-xs me-2 rounded border-sky-900 bg-transparent text-sky-900 hover:bg-sky-900 hover:text-white dark:border-0 dark:bg-sky-800 dark:text-white dark:hover:bg-sky-900">
              CSV
            </button>
          </CsvDownloader>
        </div>
      </div>

      <hr className="mb-3 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />

      <div className="overscroll-y-auto overscroll-x-auto p-3 shadow-lg">
        <table
          ref={contentToPrint}
          className="w-full table-auto overscroll-y-auto overscroll-x-auto px-2"
        >
          <thead>
            <tr className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700">
              <Th content={"Log Name"}></Th>
              <Th content={"Description"}></Th>
              <Th content={"Time"}></Th>
              <Th content={"Details"}></Th>
            </tr>
          </thead>

          <tbody>
            {formattedData.map((item: any, index: number) => (
              <tr
                key={index}
                className="border-t border-slate-300 dark:border-meta-4"
              >
                <Td content={item.cell1}></Td>
                <Td content={item.cell2}></Td>
                <Td content={item.cell3}></Td>
                <Td className="whitespace-wrap" content={item.cell4}></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
