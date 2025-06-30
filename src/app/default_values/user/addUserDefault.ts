// Default value object for Zod validation
const addUserDefaultValues = (data: any) => {
  return {
    name: data?.name || "",
    mobile: data?.mobile || "",
    email: data?.email || "",
    user_type: data?.user_type || "",
    division_id: data?.division_id || "",
    district_id: data?.district_id || "",
    upazila_id: data?.upazila_id || "",
    union_id: data?.union_id || "",
    village: data?.village || "",
    bvc_registration_no: data?.bvc_registration_no || "",
  };
};

export default addUserDefaultValues;
