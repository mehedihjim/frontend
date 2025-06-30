// Parse user info from localStorage safely
let userDataParsed: any = {};

try {
  const userInfo = localStorage.getItem("persist:auth");
  const parsedOuter = JSON.parse(userInfo ?? "{}");
  const userData = parsedOuter?.user;
  userDataParsed = JSON.parse(userData ?? "{}");
} catch (error) {
  console.error("Failed to parse user data from localStorage:", error);
}

// Default values for Zod validation
const shedCreateDefaultValues = (data: any) => {
  return {
    name: data?.name || "",
    farmer_id: data?.farmer_id || userDataParsed?.id || "",
    division_id: data?.division_id || "",
    district_id: data?.district_id || "",
    upazila_id: data?.upazila_id || "",
    union_id: data?.union_id || "",
    address: data?.address || "",
  };
};

export default shedCreateDefaultValues;
