"use client";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

// Adress Api's
import {
  useDistrictByDivisionIdQuery,
  useDistrictQuery,
  useDivisionQuery,
  useUnionByUpzillaIdQuery,
  useUpzillaByDistrictIdQuery,
} from "@/redux/api/addressApi";

// Validations
import shedCreateValidationShema from "@/app/valodators/shed/shedCreateValidator";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { BsExclamationCircle } from "react-icons/bs";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";

// Types
import Loading from "@/components/loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import shedCreateDefaultValues from "@/app/default_values/shed_create/shedCreateDefault";
import { IDistrict, IDivision, IUnion, IUpzilla } from "@/types/address.type";
import { useGetAllFarmersQuery } from "@/redux/api/userApi";
import {
  useCreateShedMutation,
  useDeleteShedMutation,
  useGetShedsQuery,
  useUpdateShedMutation,
} from "@/redux/api/shedApi";
import { IUser } from "@/types/user.type";
import { IShed } from "@/types/shed.type";
import { cookies } from "next/headers";

const ShedCreateForm = () => {
  // State variable to hold the values of input fields
  const [itemToSelect, setItemToSelect] = useState<number>(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [submitType, setSubmitType] = useState("create");
  const [selectedItem, setSelectedItem] = useState<Number>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState<any[]>([]);

  const [singleShedData, setSingleShedData] = useState<any>({});

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpzilla, setSelectedUpzilla] = useState("");
  const [districtListCalled, setDistrictListCalled] = useState(true);
  const [upzillaListCalled, setUpzillaListCalled] = useState(true);
  const [unionListCalled, setUnionListCalled] = useState(true);

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

  const { data: allFarmers, isLoading: allFarmersLoading } =
    useGetAllFarmersQuery({});

  const {
    data: shedsData,
    isLoading: shedsLoading,
    refetch,
  } = useGetShedsQuery({});

  const { data: districtData, isLoading: isDistrictLoading } = useDistrictQuery(
    {},
  );

  const [createShed] = useCreateShedMutation();
  const [updateShed] = useUpdateShedMutation();
  const [deleteShed] = useDeleteShedMutation();
  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );

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

  if (allFarmersLoading || isDistrictLoading) return <Loading></Loading>;

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
    if (submitType === "create") {
      try {
        const res = await createShed(values).unwrap();
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
      try {
        const res = await updateShed({
          data: values,
          shed_id: selectedItem,
        }).unwrap();
        if (res) {
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

  const handleItemEdit = (shedData: IShed) => {
    setSingleShedData(shedData);
    setSelectedItem(shedData.id);

    if (resetForm) {
      resetForm({
        farmer_id: shedData.farmer_id,
        name: shedData.name,
        division_id: shedData.division_id,
        district_id: shedData.district_id,
        upzilla_id: shedData.upzilla_id,
        union_id: shedData.union_id,
        address: shedData.address,
      });
    }

    setSubmitType("update");
  };

  // Determine the total number of pages
  const totalPages = Math.ceil(shedsData?.data?.length / itemsPerPage);

  // Pagination button click function
  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Delete Shed Api Call
  const handleItemRemove = async (shed_id: number) => {
    try {
      const res = await deleteShed(shed_id).unwrap();
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

  // View Item Functionality
  const handleItemView = (itemData: any) => {
    setItemToSelect(itemData.id as number);
    setSingleShedData(itemData);
    const modal = document.getElementById(
      "view_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  // Modal open/close functionality
  const openDeleteShedModal = (item_id: number) => {
    setItemToSelect(item_id);
    const modal = document.getElementById(
      "delete_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  const closeDeleteShedModal = () => {
    const modal = document.getElementById(
      "delete_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  const closeViewSportsOfficerModal = () => {
    const modal = document.getElementById(
      "view_shed_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  return (
    <>
      <SportsFrom
        resolver={zodResolver(shedCreateValidationShema)}
        defaultValues={shedCreateDefaultValues(singleShedData)}
        onSubmit={handleSubmit}
        isReset={true}
        setInputValues={(reset) => setResetForm(() => reset)}
      >
        <>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <div className="mb-6 mt-6">
                <div className="table-headline mb-6 dark:text-white">
                  Create Shed
                </div>
                <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Farmer <span className="text-danger">*</span>
                      </label>
                      <Select
                        name="farmer_id"
                        style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
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
                      className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                    >
                      {submitType === "create" ? "Add Shed" : "Edit Shed"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table section */}
            <div className="w-full sm:w-1/2">
              <div className="mb-6 mt-6">
                <div className="table-headline mb-6 dark:text-white">
                  Shed List
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
                        District
                      </th>
                      <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {shedsData?.data && (
                    <tbody>
                      {shedsData?.data.map((data: any) => (
                        <tr
                          key={data.id}
                          className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700"
                        >
                          <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                            {data.id}
                          </th>
                          <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                            {data.name}
                          </td>
                          <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                            {data.district_name}
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
                  {displayData?.length === 0 && (
                    <tbody>
                      <tr>
                        <td
                          colSpan={4}
                          className="p-5 text-center text-danger dark:text-rose-400"
                        >
                          No Data Found
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
              <Pagination
                data={shedsData?.data}
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
                  Shed Information
                </div>
                <div className="block w-full overflow-x-auto rounded">
                  <table className="w-full border-collapse items-center bg-transparent">
                    <tbody>
                      <tr>
                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                          ID:
                        </th>
                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                          {singleShedData?.id}
                        </td>
                      </tr>
                      <tr>
                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                          Shed:
                        </th>
                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                          {singleShedData?.name}
                        </td>
                      </tr>
                      <tr>
                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                          District:
                        </th>
                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                          {singleShedData?.district_name}
                        </td>
                      </tr>
                      <tr>
                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                          Address:
                        </th>
                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                          {singleShedData?.address}
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
        </>
      </SportsFrom>
    </>
  );
};

export default ShedCreateForm;
