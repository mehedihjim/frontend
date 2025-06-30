"use client";

import batchCreateDefaultValues from "@/app/default_values/batch_create/batchCreateDefault";
import batchCreateValidation from "@/app/valodators/batch/batchCreateValidator";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import Pagination from "@/components/pagination/Pagination";
import {
  useCreatBatchMutation,
  useDeleteBatchMutation,
  useGetBatchQuery,
  useUpdateBatchMutation,
} from "@/redux/api/batchApi";
import { useGetShedsQuery } from "@/redux/api/shedApi";
import { Ibatch } from "@/types/batch";
import { IShed } from "@/types/shed.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { BsExclamationCircle } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye, FaPen } from "react-icons/fa6";
import { toast } from "sonner";

export default function BatchComponent() {
  const [submitType, setSubmitType] = useState("create");
  const [selectedItem, setSelectedItem] = useState<Number>();

  const [deleteBatch] = useDeleteBatchMutation();
  const [itemToSelect, setItemToSelect] = useState<number>(0);
  const [singleBatchData, setSingleShedData] = useState<any>({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState<any[]>([]);

  const [createBatch] = useCreatBatchMutation();
  const [updateBatch] = useUpdateBatchMutation();

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

  const {
    data: batchData,
    isLoading: batchLoading,
    refetch,
  } = useGetBatchQuery({});

  //shed list get

  const { data: shedList, isLoading: shedLoading } = useGetShedsQuery({});
  const shedData = shedList?.data;
  const handleItemEdit = (batchData: Ibatch) => {
    setSingleShedData(batchData);
    setSelectedItem(batchData.id);

    if (resetForm) {
      resetForm({
        batch_number: batchData.batch_number,
        shed_id: batchData.shed_id,
        hen_type: batchData.hen_type,
        chick_number: batchData.chick_number,
        chick_price: batchData.chick_price,
        start_date: batchData.start_date,
      });
    }

    setSubmitType("update");
  };
  const openDeleteShedModal = (item_id: number) => {
    setItemToSelect(item_id);
    const modal = document.getElementById(
      "delete_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };
  const totalPages = Math.ceil(batchData?.data?.length / itemsPerPage);

  const handleItemRemove = async (batch_id: number) => {
    try {
      const res = await deleteBatch(batch_id).unwrap();
      if (res) {
        refetch();
        toast.success(res?.message || "Officer deleted successfully");
      } else {
        toast.error(res?.message);
        setError(res?.data || res?.error || "Something went wrong!");
      }
    } catch (err: any) {
      setError(err.errors);
    } finally {
      closeDeleteShedModal();
    }
  };

  const closeDeleteShedModal = () => {
    const modal = document.getElementById(
      "delete_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  const handleItemView = (itemData: any) => {
    setItemToSelect(itemData.id as number);
    setSingleShedData(itemData);
    const modal = document.getElementById(
      "view_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  const closeViewSportsOfficerModal = () => {
    const modal = document.getElementById(
      "view_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  const handleSubmit = async (values: FieldValues) => {
    if (submitType === "create") {
      try {
        const res = await createBatch(values).unwrap();
        if (res) {
          setError("");
          refetch();
          toast.success(res?.message || "Shed created successfully");
        } else {
          toast.error(res?.message);
          setError(res?.data || res?.error || "Something went wrong!");
        }
      } catch (err: any) {
        setError(err.errors);
      }
    } else if (submitType === "update") {
      console.log(values);
      try {
        const res = await updateBatch({
          data: values,
          batch_id: selectedItem,
        }).unwrap();
        console.log(res);
        if (res) {
          if (resetForm) {
            resetForm({
              shed_id: res.data.shed_id,
              batch_number: res.data.batch_number,
              hen_type: res.data.hen_type,
              chick_number: res.data.chick_number,
              chick_price: res.data.chick_price,
              start_date: res.data.start_date,
            });
          }

          refetch();
          toast.success(res?.message || "Shed updated successfully");
        } else {
          toast.error(res?.message);
          setError(res?.data || res?.error || "Something went wrong!");
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.errors);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SportsFrom
        resolver={zodResolver(batchCreateValidation)}
        defaultValues={batchCreateDefaultValues(singleBatchData)}
        onSubmit={handleSubmit}
        isReset={true}
        setInputValues={(reset) => setResetForm(() => reset)}
      >
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <div className="mb-6 mt-6">
              <div className="table-headline mb-6 dark:text-white">
                Create Batch
              </div>
              <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Shed <span className="text-danger">*</span>
                    </label>
                    <Select
                      name="shed_id"
                      style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                    >
                      <option defaultValue="">Select Shed</option>
                      {shedList?.data.map((data: IShed) => (
                        <option value={data.id} key={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Batch Number
                    </label>
                    <SportsInput
                      type="text"
                      name="batch_number"
                      errors={error}
                      placeholder="Enter Batch Number"
                      style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                    />
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Hen Type
                    </label>
                    <Select
                      name="hen_type"
                      style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                    >
                      <option value="">Select Hen Type</option>
                      <option value="Sonali">Sonali</option>
                      <option value="Broiler">Broiler</option>
                      <option value="Hybrid Layer">Hybrid Layer</option>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Chick Number
                    </label>
                    <SportsInput
                      type="text"
                      name="chick_number"
                      errors={error}
                      placeholder="Enter Chicken Number"
                      style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                    />
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Chick Price
                    </label>
                    <SportsInput
                      type="text"
                      name="chick_price"
                      errors={error}
                      placeholder="Enter chicken price"
                      style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                    />
                  </div>
                  <div className="input-container">
                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <SportsInput
                      type="date"
                      name="start_date"
                      errors={error}
                      placeholder="Enter position"
                      style="input input-date-light input-bordered w-full max-w-full bg-white dark:bg-black dark:input-date-dark input-sm md:input-md"
                    />
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <button
                    type="submit"
                    className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                  >
                    {submitType === "create" ? "Add batch" : "Edit Batch"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Table section */}
          <div className="w-full sm:w-1/2">
            <div className="mb-6 mt-6 ">
              <div className="table-headline mb-6 dark:text-white">
                Batch List
              </div>
            </div>
            <div className="block w-full overflow-x-auto rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
              <table className="w-full border-collapse items-center bg-transparent">
                {/* head */}
                <thead>
                  <tr className="bg-slate-200 dark:bg-slate-800">
                    <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                      ID
                    </th>
                    <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                      Shed
                    </th>
                    <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                      Batch Number
                    </th>
                    <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                      Hen Type
                    </th>
                    {/* <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                        Chicken Number
                      </th>
                      <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                        Chicken Price
                      </th> */}
                    <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                      Batch Start Date
                    </th>
                    <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                {batchData?.data && (
                  <tbody>
                    {batchData?.data.map((data: any) => (
                      <tr
                        key={data.id}
                        className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700"
                      >
                        <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                          {data.id}
                        </th>
                        <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                          {data.shed_name}
                        </th>
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                          {data.batch_number}
                        </td>
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                          {data.hen_type}
                        </td>
                        {/* <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                            {data.chick_number}
                          </td>
                          <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                            {data.chick_price}
                          </td> */}
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                          {data.start_date}
                        </td>
                        <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                          <div className="flex gap-2">
                            <div
                              className="tooltip cursor-pointer text-sky-900 dark:text-slate-400"
                              data-tip="Edit"
                            >
                              <FaPen
                                onClick={() => handleItemEdit(data)}
                                size={15}
                                className="text-green"
                                data-tip="Edit"
                              />
                            </div>
                            <div
                              className="tooltip cursor-pointer text-green-700 dark:text-green-300"
                              data-tip="View"
                            >
                              <FaEye
                                onClick={() => handleItemView(data)}
                                size={15}
                                className="cursor-pointer"
                              />
                            </div>
                            {/* Delete Mdoal */}
                            <div
                              className="tooltip pe-2 text-rose-500 dark:text-rose-400"
                              data-tip="Delete"
                            >
                              <FaTrashAlt
                                className="cursor-pointer"
                                size={15}
                                onClick={() =>
                                  openDeleteShedModal(data.id as number)
                                }
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            <Pagination
              data={batchData?.data}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              totalPages={totalPages}
              setDisplayData={setDisplayData}
            ></Pagination>
          </div>
        </div>
        {/* Delete Sports Officer Modal */}
        <dialog id="delete_shed_modal" className="modal">
          <div className="modal-box bg-white dark:bg-black">
            <div className="mt-6 flex flex-col items-center text-center">
              <div className="text-lg font-bold">
                <BsExclamationCircle
                  size={70}
                  className="text-rose-700 dark:text-rose-500"
                />
              </div>
              <p className="mt-2 py-4 text-lg font-medium">
                Are you sure you want to delete this shed?
              </p>
            </div>
            <div className="modal-action">
              <div>
                {/* if there is a button in form, it will close the modal */}
                <div className="flex gap-1">
                  <button
                    onClick={closeDeleteShedModal}
                    type="button"
                    className="rounded-1 btn btn-sm border-0 bg-rose-800 text-white hover:bg-rose-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleItemRemove(itemToSelect as number)}
                    className="rounded-1 btn btn-sm border-0 bg-sky-900 text-white hover:bg-green-800"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
        {/* View Info Sports Officer Modal */}
        <dialog id="view_shed_modal" className="modal">
          <div className="modal-box w-11/12 max-w-xl bg-white dark:bg-black">
            <div className="mt-6 overflow-x-auto">
              <div className="mb-6 text-center text-2xl font-semibold text-sky-950 dark:text-white">
                Batch Information
              </div>
              <div className="block w-full overflow-x-auto rounded">
                <table className="w-full border-collapse items-center bg-transparent">
                  <tbody>
                    <tr>
                      <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                        ID:
                      </th>
                      <td className="text-sm font-semibold text-sky-950 dark:text-white">
                        {singleBatchData?.id}
                      </td>
                    </tr>
                    <tr>
                      <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                        Shed:
                      </th>
                      <td className="text-sm font-semibold text-sky-950 dark:text-white">
                        {singleBatchData?.shed_name}
                      </td>
                    </tr>
                    <tr>
                      <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                        Batch Number:
                      </th>
                      <td className="text-sm font-semibold text-sky-950 dark:text-white">
                        {singleBatchData?.batch_number}
                      </td>
                    </tr>
                    <tr>
                      <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                        Hen Type:
                      </th>
                      <td className="text-sm font-semibold text-sky-950 dark:text-white">
                        {singleBatchData?.hen_type}
                      </td>
                    </tr>
                    <tr>
                      <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                        Chicken Number:
                      </th>
                      <td className="text-sm font-semibold text-sky-950 dark:text-white">
                        {singleBatchData?.chick_number}
                      </td>
                    </tr>
                    <tr>
                      <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                        Chicken Price:
                      </th>
                      <td className="text-sm font-semibold text-sky-950 dark:text-white">
                        {singleBatchData?.chick_price}
                      </td>
                    </tr>
                    <tr>
                      <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                        Start Date:
                      </th>
                      <td className="text-sm font-semibold text-sky-950 dark:text-white">
                        {singleBatchData?.start_date}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-action">
              <div>
                {/* if there is a button in form, it will close the modal */}
                <div className="flex gap-1">
                  <button
                    onClick={closeViewSportsOfficerModal}
                    type="button"
                    className="rounded-1 btn btn-sm border-0 bg-rose-800 text-white hover:bg-rose-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </SportsFrom>
    </>
  );
}
function setError(arg0: any) {
  throw new Error("Function not implemented.");
}
