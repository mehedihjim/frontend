"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SportsFrom from "../Froms/SportsFrom";
import SportsInput from "../Froms/SportsInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Pagination from "../pagination/Pagination";
import userProfileDefaultValues from "@/app/default_values/user_profile/userProfileDefault";
import { zodResolver } from "@hookform/resolvers/zod";
import userProfileValidationSchema from "@/app/valodators/user_profile/userProfileValidators";
import { BsExclamationCircle } from "react-icons/bs";
import Select from "../Froms/Select";
// API
import {
  useDistrictByDivisionIdQuery,
  useDivisionQuery,
  useUnionByUpzillaIdQuery,
  useUpzillaByDistrictIdQuery,
} from "@/redux/api/addressApi";
import { IDistrict, IDivision, IUnion, IUpzilla } from "@/types/address.type";
import PhotoPDFUploader from "../Froms/SportsPhotoPdf";
import userProfilePhotoValidationSchema from "@/app/valodators/user_profile/userProfilePhotoValidators";
import userPasswordDefaultValues from "@/app/default_values/user_profile/userPasswordDefault";
import userPasswordValidationSchema from "@/app/valodators/user_profile/userPasswordValidators";
import {
  useGetUsersByIdQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useProfilePhotoUpdateMutation
} from "@/redux/api/userApi";

const UserProfile = () => {
  // const [itemToDelete, setItemToDelete] = useState<number>(0);
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [profilePhotoResetForm, setProfilePhotoResetForm] = useState<((values: any) => void) | null>(null);
  const [profileSettingsResetForm, setProfileSettingsResetForm] = useState<((values: any) => void) | null>(null);
  const [passwordResetForm, setPasswordResetForm] = useState<((values: any) => void) | null>(null);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const userInfo  = localStorage.getItem('persist:auth')
  let user = [];
  if (userInfo) {
    const parsedOuter = JSON.parse(userInfo);
    // Parse the nested JSON strings
     user = JSON.parse(parsedOuter.user);

  }
  const [submitType, setSubmitType] = useState("create");
  const [selectedItem, setSelectedItem] = useState<Number>();
  const { data: userData } = useGetUsersByIdQuery(user?.id, {
    skip: !user?.id,
  });
  // console.log(userData?.data?.name);
  useEffect(() => {
    if (userData?.data){
      if (profileSettingsResetForm){
        profileSettingsResetForm({
          name: userData?.data?.name,
          mobile: userData?.data?.mobile,
          email: userData?.data?.email,
          bvc_registration_no: userData?.data?.bvc_registration_no,
          division_id: userData?.data?.division_id,
          district_id: userData?.data?.district_id,
          upzilla_id: userData?.data?.upzilla_id,
          union_id:userData?.data?.union_id,
          village: userData?.data?.village,
        })

        // Set the selected location values to trigger the cascading dropdowns
        if (userData?.data?.division_id) {
          setSelectedDivision(userData.data.division_id);
          setDistrictListCalled(false);
        }

        if (userData?.data?.district_id) {
          setSelectedDistrict(userData.data.district_id);
          setUpzillaListCalled(false);
        }

        if (userData?.data?.upzilla_id) {
          setSelectedUpzilla(userData.data.upzilla_id);
          setUnionListCalled(false);
        }
      }
    }
  }, [userData, profileSettingsResetForm]);
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
  const [updateApi] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [profilePhotoApi] = useProfilePhotoUpdateMutation();
  // Delete sports item
  const cleanUndefinedToNull = (obj:any) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, value === undefined ? null : value])
    );
  };
  const handleItemRemove = async (org_id: number) => {};
  const handleSubmit = async (values: FieldValues) => {
    const payload = cleanUndefinedToNull(values);
    let response = await updateApi({data:payload, user_id:userData?.data?.id
  }).unwrap();
    console.log(response);
    if (response.success) {
      toast.success("Profile Updated Successfully");
    } else {
      toast.error("Profile Update Failed");
    }
  };
  const handlePhotoSubmit = async (values: FieldValues) => {
      try {
        // Create a FormData object to properly handle file uploads
        const formData = new FormData();

        // Add the file to the FormData if it exists
        if (values.files && values.files.length > 0) {
          formData.append('image', values.files[0]);
        }

        let response = await profilePhotoApi(formData).unwrap();
        if (response.success) {
          toast.success("Profile Photo Updated Successfully");
          // Clear the uploaded image URL to show the updated image from the server
          setUploadedImageUrl(null);
        } else {
          toast.error(response.message || "Profile Photo Update Failed");
        }
      } catch (error: any) {
        toast.error(error.data?.message || "An error occurred while updating profile photo");
      }
  };
  const handlePasswordSubmit = async (values: FieldValues) => {
    try {
      const response = await changePassword(values).unwrap();
      if (response.success) {
        toast.success("Password changed successfully");
        if (passwordResetForm) {
          passwordResetForm({
            current_password: "",
            password: "",
            c_password: "",
          });
        }
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (error: any) {
      toast.error(error.data?.message || "An error occurred while changing password");
    }
  };

  // Determine the total number of pages
  // const totalPages = Math.ceil(organizationData?.data?.length / itemsPerPage);

  const closeDeleteSportsItemModal = () => {
    const modal = document.getElementById(
      "delete_organization_modal",
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

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

  // Profile Photo Upload

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const onUpdateFilesSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = event.target; // Cache the target
    if (target && target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImageUrl(e.target.result as string); // Assert result as string

          // Reset the form with the new file
          if (profilePhotoResetForm) {
            profilePhotoResetForm({
              files: [file]
            });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <>
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Profile Photo Upload Secton */}
          <div className="w-full p-2 sm:w-full md:basis-2/7">
            <SportsFrom
              resolver={zodResolver(userProfilePhotoValidationSchema)}
              defaultValues={{ files: [] }}
              onSubmit={handlePhotoSubmit}
              isReset={true}
              setInputValues={(reset) => setProfilePhotoResetForm(() => reset)}
            >
              <div className="rounded-lg px-4 py-1 pb-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                <div className="mb-6 mt-6">
                  <div className="table-headline mb-6 dark:text-white">
                    Upload Profile Photo
                  </div>
                </div>
                <div className="border-gray-300 relative h-full w-full overflow-hidden border-2 rounded-2xl text-center">
                  <img
                    src={
                      uploadedImageUrl || 
                      userData?.data?.image_url ||
                      "https://picsum.photos/seed/picsum/300/300"
                    }
                    alt="Profile Photo"
                    className="h-90 w-90 object-cover"
                  />
                  <label className="absolute bottom-0 left-0 w-full cursor-pointer bg-slate-800 bg-opacity-50 py-2
                  text-sm font-medium text-white">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      name="image"
                      onChange={onUpdateFilesSelected}
                    />
                  </label>
                </div>
                <div className="mt-4 text-right">
                  <button
                    type="submit"
                    className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                  >
                    Update Photo
                  </button>
                </div>
              </div>
            </SportsFrom>
          </div>

          <div className="w-full sm:w-full md:basis-5/7">
            <SportsFrom
              // resolver={zodResolver(userProfileValidationSchema)}
              defaultValues={userProfileDefaultValues()}
              onSubmit={handleSubmit}
              isReset={true}
              setInputValues={(reset) => setProfileSettingsResetForm(() => reset)}
            >
              <div className="m-2 rounded-lg p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                <div className="table-headline mb-6 dark:text-white">
                  {submitType === "create"
                    ? "Profile Settings"
                    : "Update Organization"}
                </div>
                <div className="rounded-md p-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Name <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="text"
                        name="mobile"
                        placeholder="Enter phone"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Email <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    {(userData?.data?.role_id === 5 ) && (
                      <div>
                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                          BVC Reg. No <span className="text-danger">*</span>
                        </label>
                        <SportsInput
                          type="text"
                          name="bvc_registration_no"
                          placeholder="Enter Reg. No"
                          style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                        />
                      </div>
                    )}

                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Division <span className="text-danger">*</span>
                      </label>
                      <Select
                        onChangeSelect={handleDivChange}
                        name="division_id"
                        style="select select-bordered w-full max-w-full bg-white dark:bg-black"
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
                        style="select select-bordered w-full max-w-full bg-white dark:bg-black"
                      >
                        <option defaultValue="">
                          Select your district{" "}
                        </option>
                        {districtByDivisionData?.map((data: IDistrict) => (
                          <option value={data.id} key={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Upzila <span className="text-danger">*</span>
                      </label>
                      <Select
                        name="upzilla_id"
                        onChangeSelect={handleUpzChange}
                        style="select select-bordered w-full max-w-full bg-white dark:bg-black"
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
                        style="select select-bordered w-full max-w-full bg-white dark:bg-black"
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
                        placeholder="Enter village"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Signature{" "}
                        <span className="label-text-alt text-orange-400">
                          (File size can not be larger than 5MB)
                        </span>
                      </label>
                      <PhotoPDFUploader
                        name="signature"
                        errors={error}
                        style="file-input file-input-ghost file-input-bordered w-full max-w-xs bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        old signature{" "}
                      </label>
                      <img
                        src={
                          userData?.data?.signature_url ||
                          "https://picsum.photos/seed/picsum/300/300"
                        }
                        alt="Profile Photo"
                        className="h-20 w-auto object-cover"
                      />
                    </div>

                  </div>
                  <div className="mt-4 text-right">
                    <button
                      type="submit"
                      className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                    >
                     Update
                    </button>
                  </div>
                </div>
              </div>
            </SportsFrom>
            <SportsFrom
              resolver={zodResolver(userPasswordValidationSchema)}
              defaultValues={userPasswordDefaultValues()}
              onSubmit={handlePasswordSubmit}
              isReset={true}
              setInputValues={(reset) => setPasswordResetForm(() => reset)}
            >
              <div className="m-2 rounded-lg p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                <div className="table-headline mb-6 dark:text-white">
                  Change Password
                </div>
                <div className="rounded-md p-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Old Password <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="password"
                        name="current_password"
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        New Password <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="password"
                        name="password"
                        errors={error}
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="password"
                        name="c_password"
                        errors={error}
                        style="input input-bordered w-full max-w-full bg-white dark:bg-black"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      type="submit"
                      className="btn btn-sm top-6 rounded border-none bg-sky-900 text-white hover:bg-sky-950"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </SportsFrom>
          </div>
        </div>
      </>
    </>
  );
};

export default UserProfile;
