"use client";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
// Api's
import {
  useDistrictByDivisionIdQuery,
  useDistrictQuery,
  useDivisionQuery,
  useUnionByUpzillaIdQuery,
  useUpzillaByDistrictIdQuery,
} from "@/redux/api/addressApi";
// Validations
import addUserValidationSchema from "@/app/valodators/user/addUserValidator";
import { zodResolver } from "@hookform/resolvers/zod";
// Icons
import { BsExclamationCircle } from "react-icons/bs";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
// Types
import Loading from "@/components/loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import addUserDefaultValues from "@/app/default_values/user/addUserDefault";
import { IDistrict, IDivision, IUnion, IUpzilla } from "@/types/address.type";
import { IUser } from "@/types/user.type";
import ProfilePhotoUploader from "@/components/Froms/SportsProfileUpload";
import {
  useAddUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { formDataPayload } from "@/utils/modifyPayload";

const AddNewUser = () => {
  // State variable to hold the values of input fields
  const [itemToSelect, setItemToSelect] = useState<number>(0);
  const [singleUserData, setSingleUserData] = useState<IUser | null>(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState<any[]>([]);

  const [submitType, setSubmitType] = useState("create");
  const [selectedItem, setSelectedItem] = useState<Number>();

  const [singleOfficerData, setSingleOfficerData] = useState<IUser>({});

  const [userType, setUserType] = useState("");

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

  // All user data from API
  const {
    data: allUserData,
    isLoading: isAllUserDataLoading,
    refetch,
  } = useGetUsersQuery({});

  const { data: districtData, isLoading: isDistrictLoading } = useDistrictQuery(
    {},
  );

  const [AddUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
    null,
  );
  // Effect to respond to data changes
  useEffect(() => {
    if (singleUserData) {
      console.log();

      setSelectedDivision(singleUserData.division_id?.toString() || ""); // Convert to string or default to an empty string
      setDistrictListCalled(false);

      setSelectedDistrict(singleUserData.district_id?.toString() || "");
      setUpzillaListCalled(false);

      setSelectedUpzilla(singleUserData.upzilla_id?.toString() || "");
      setUnionListCalled(false);
    }
  }, [singleUserData]);

  if (isAllUserDataLoading || isDistrictLoading) return <Loading></Loading>;

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

  const handleUserTypeChange = (selectedValue: string) => {
    console.log(selectedValue, "selected value for user log");

    setUserType(selectedValue); // Update state based on selected value
    if (selectedValue === "doctor") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
    }
  };

  const handleSubmit = async (values: FieldValues) => {
    // Filter out undefined values

    if (submitType === "create") {
      try {
        const res = await AddUser({
          data: formDataPayload(values),
        }).unwrap();
        if (res) {
          setError("");
          refetch();
          toast.success(res?.message || "User added successfully");
        } else {
          toast.error(res?.message);
          setError(res?.data || res?.error || "Something went wrong!");
        }
      } catch (err: any) {
        setError(err.errors);
      }
    } else if (submitType === "update") {
      try {
        const res = await updateUser({
          data: values,
          user_id: selectedItem,
        }).unwrap();
        if (res) {
          if (resetForm) {
            resetForm({
              name: res.data.name,
              mobile: res.data.mobile,
              email: res.data.email,
              user_type: res.data.user_type,
              division_id: res.data.division_id,
              district_id: res.data.district_id,
              upzilla_id: res.data.upzilla_id,
              union_id: res.data.union_id,
              village: res.data.village,
              bvc_registration_no: res.data.bvc_registration_no,
            });
          }

          refetch();
          toast.success(res?.message || "Item updated successfully");
        } else {
          toast.error(res?.message);
          setError(res?.data || res?.error || "Something went wrong!");
          setLoading(false);
        }
      } catch (err: any) {
        console.log(err, "error");

        setError(err.errors);
        setLoading(false);
      }
    }
  };

  // Determine the data to display based on the current page

  // Determine the total number of pages
  const totalPages = Math.ceil(allUserData?.data?.length / itemsPerPage);

  // Pagination button click function
  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Delete Sports Officer Api Call
  const handleItemRemove = async (user_id: number) => {
    try {
      const res = await deleteUser(user_id).unwrap();
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
      closeDeleteUserModal();
    }
  };

  const handleItemEdit = (userData: IUser) => {
    setSingleUserData(userData);
    setSelectedItem(userData.id);

    if (userData.user_type === "doctor") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
    }

    if (resetForm) {
      resetForm({
        name: userData.name,
        mobile: userData.mobile,
        email: userData.email,
        user_type: userData.user_type,
        division_id: userData.division_id,
        district_id: userData.district_id,
        upzilla_id: userData.upzilla_id,
        union_id: userData.union_id,
        village: userData.village,
        bvc_registration_no: userData.bvc_registration_no,
      });
    }

    setSubmitType("update");
    console.log(submitType, "submit from edit");
  };

  // View Item Functionality
  const handleItemView = (itemData: IUser) => {
    setItemToSelect(itemData.id as number);
    setSingleOfficerData(itemData);
    const modal = document.getElementById(
      "view_sports_officer_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  // Modal open/close functionality
  const openDeleteUserModal = (item_id: number) => {
    setItemToSelect(item_id);
    const modal = document.getElementById(
      "delete_user_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  const closeDeleteUserModal = () => {
    const modal = document.getElementById(
      "delete_user_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  const closeViewSportsOfficerModal = () => {
    const modal = document.getElementById(
      "view_sports_officer_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  return (
    <>
      <SportsFrom
        resolver={zodResolver(addUserValidationSchema)}
        defaultValues={addUserDefaultValues(singleUserData)}
        onSubmit={handleSubmit}
        isReset={true}
        setInputValues={(reset) => setResetForm(() => reset)}
      >
        <>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <div className="mb-6 mt-6">
                <div className="table-headline mb-6 dark:text-white">
                  Add New User
                </div>
                <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Name <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="text"
                        errors={error}
                        name="name"
                        placeholder="Enter name"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="text"
                        errors={error}
                        name="mobile"
                        placeholder="Enter phone no"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Email <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="email"
                        name="email"
                        errors={error}
                        placeholder="Enter email"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
                      />
                    </div>
                    {submitType === "create" && (
                      <div>
                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                          Password <span className="text-danger">*</span>
                        </label>
                        <SportsInput
                          type="password"
                          errors={error}
                          name="password"
                          placeholder="Enter password"
                          style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
                        />
                      </div>
                    )}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        User Type
                      </label>
                      <Select
                        name="user_type"
                        style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                        onChangeSelect={handleUserTypeChange}
                      >
                        <option value="">Select user type</option>
                        <option value="admin">Admin</option>
                        <option value="farmer">Farmer</option>
                        <option value="farm-force">Farm Force</option>
                        <option value="feed-seller">Feed Seller</option>
                        <option value="doctor">Doctor</option>
                        <option value="buyer">Buyer</option>
                      </Select>
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
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Village <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="text"
                        name="village"
                        errors={error}
                        placeholder="Enter village"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black input-sm md:input-md"
                      />
                    </div>
                    {/* BVC Number When Doctor is Choosen */}
                    {isDoctor && (
                      <div>
                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                          BVC Registration Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <SportsInput
                          type="text"
                          name="bvc_registration_no"
                          style="input input-sm input-bordered w-full max-w-full bg-white md:input-md dark:bg-black"
                          placeholder="Enter BVC Reg No"
                        />
                      </div>
                    )}

                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Profile Photo{" "}
                        <span className="label-text-alt text-orange-400">
                          (File size can not be larger than 3MB)
                        </span>
                      </label>
                      <ProfilePhotoUploader
                        name="image"
                        style="file-input file-input-ghost file-input-bordered w-full max-w-xs bg-white dark:bg-black"
                      />
                    </div>
                    {isDoctor && (
                      <div>
                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                          Signature{" "}
                          <span className="label-text-alt text-orange-400">
                            (File size can not be larger than 3MB)
                          </span>
                        </label>
                        <ProfilePhotoUploader
                          name="signature"
                          style="file-input file-input-ghost file-input-bordered w-full max-w-xs bg-white dark:bg-black"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      type="submit"
                      className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                    >
                      {submitType === "create" ? "Add User" : "Update User"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table section */}
            <div className="w-full sm:w-1/2">
              <div className="mb-6 mt-6">
                <div className="table-headline mb-6 dark:text-white">
                  User List
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
                        User Name
                      </th>
                      <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                        User Type
                      </th>
                      <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {displayData && (
                    <tbody>
                      {displayData?.map((data: IUser) => (
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
                            {data.user_type}
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
                                    openDeleteUserModal(data.id as number)
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
                data={allUserData?.data}
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
          <dialog id="delete_user_modal" className="modal">
            <div className="modal-box bg-white dark:bg-black">
              <div className="mt-6 flex flex-col items-center text-center">
                <div className="text-lg font-bold">
                  <BsExclamationCircle
                    size={70}
                    className="text-rose-700 dark:text-rose-500"
                  />
                </div>
                <p className="mt-2 py-4 text-lg font-medium">
                  Are you sure you want to delete this user?
                </p>
              </div>
              <div className="modal-action">
                <div>
                  {/* if there is a button in form, it will close the modal */}
                  <div className="flex gap-1">
                    <button
                      onClick={closeDeleteUserModal}
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
          <dialog id="view_sports_officer_modal" className="modal">
            <div className="modal-box w-11/12 max-w-xl bg-white dark:bg-black">
              <div className="mt-6 overflow-x-auto">
                <div className="mb-6 text-center text-2xl font-semibold text-sky-950 dark:text-white">
                  User Short Information
                </div>
                <div className="block w-full overflow-x-auto rounded">
                  <table className="w-full border-collapse items-center bg-transparent">
                    <tbody>
                      <tr>
                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                          ID:
                        </th>
                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                          {singleOfficerData?.id}
                        </td>
                      </tr>
                      <tr>
                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                          Officer Name:
                        </th>
                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                          {singleOfficerData?.name}
                        </td>
                      </tr>
                      <tr>
                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                          Email:
                        </th>
                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                          {singleOfficerData?.email}
                        </td>
                      </tr>
                      <tr>
                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                          Mobile:
                        </th>
                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                          {singleOfficerData?.mobile}
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

export default AddNewUser;
