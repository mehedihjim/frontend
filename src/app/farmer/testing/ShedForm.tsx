"use client";
import React, { useState, useEffect } from "react";
import { X, Save, ArrowLeft } from "lucide-react";
import { useDivisionQuery } from "@/redux/api/addressApi";
import { useDistrictByDivisionIdQuery } from "@/redux/api/addressApi";
import { useUpzillaByDistrictIdQuery } from "@/redux/api/addressApi";
import { useUnionByUpzillaIdQuery } from "@/redux/api/addressApi";
import { useGetAllFarmersQuery } from "@/redux/api/userApi";
import type { Farmer, Division, District } from "@/types/shed.type";
import { useAppSelector } from "@/redux/hooks";

interface ShedFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ShedForm: React.FC<ShedFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const isFarmer = user?.user_type === "farmer";
  const [formData, setFormData] = useState({
    farmer_id: "",
    name: "",
    division_id: "",
    district_id: "",
    upzilla_id: "",
    union_id: "",
    address: "",
  });

  const [availableDistricts, setAvailableDistricts] = useState<any[]>([]);
  const [availableUpzillas, setAvailableUpzillas] = useState<any[]>([]);
  const [availableUnions, setAvailableUnions] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        farmer_id: initialData.farmer_id || "",
        name: initialData.name || "",
        division_id: initialData.division_id || "",
        district_id: initialData.district_id || "",
        upzilla_id: initialData.upzilla_id || "",
        union_id: initialData.union_id || "",
        address: initialData.address || "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (isFarmer && user?.id) {
      setFormData((prev) => ({
        ...prev,
        farmer_id: user.id.toString(),
      }));
    }
  }, [isFarmer, user?.id]);

  const { data: divisionData, isLoading: isDivLoading } = useDivisionQuery({});
  const { data: allFarmers, isLoading: allFarmersLoading } =
    useGetAllFarmersQuery({});

  const { data: districtData } = useDistrictByDivisionIdQuery(
    formData.division_id,
    {
      skip: !formData.division_id,
    },
  );

  const { data: upzillaData } = useUpzillaByDistrictIdQuery(
    formData.district_id,
    {
      skip: !formData.district_id,
    },
  );

  const { data: unionData } = useUnionByUpzillaIdQuery(formData.upzilla_id, {
    skip: !formData.upzilla_id,
  });

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.farmer_id) newErrors.farmer_id = "Please select a farmer";
    if (!formData.name) newErrors.name = "Shed name is required";
    if (!formData.division_id)
      newErrors.division_id = "Please select a division";
    if (!formData.district_id)
      newErrors.district_id = "Please select a district";
    if (!formData.upzilla_id) newErrors.upzilla_id = "Please select an upzilla";
    if (!formData.union_id) newErrors.union_id = "Please select a union";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // When division changes, update districts and reset district, upzilla, union fields
  useEffect(() => {
    if (districtData?.data) {
      setAvailableDistricts(districtData.data);
    } else {
      setAvailableDistricts([]);
    }
    setFormData((prev) => ({
      ...prev,
      district_id: "",
      upzilla_id: "",
      union_id: "",
    }));
  }, [districtData]);

  // When district changes, update upzillas and reset upzilla, union fields
  useEffect(() => {
    if (upzillaData?.data) {
      setAvailableUpzillas(upzillaData.data);
    } else {
      setAvailableUpzillas([]);
    }
    setFormData((prev) => ({
      ...prev,
      upzilla_id: "",
      union_id: "",
    }));
  }, [upzillaData]);

  // When upzilla changes, update unions and reset union field
  useEffect(() => {
    if (unionData?.data) {
      setAvailableUnions(unionData.data);
    } else {
      setAvailableUnions([]);
    }
    setFormData((prev) => ({
      ...prev,
      union_id: "",
    }));
  }, [unionData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const farmer = allFarmers?.data?.find(
        (f: Farmer) => f.id === parseInt(formData.farmer_id),
      );
      const division = divisionData?.data?.find(
        (d: Division) => d.id === parseInt(formData.division_id),
      );
      const district = availableDistricts.find(
        (d: District) => d.id === parseInt(formData.district_id),
      );

      onSubmit({
        ...formData,
        farmer: farmer?.name || "",
        division: division?.name || "",
        district: district?.name || "",
        district_name: district?.name || "",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
    // console.log(value, field);
  };

  return (
    <div className="border-gray-200 rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="border-gray-200 flex items-center justify-between border-b p-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
          >
            <ArrowLeft className="text-gray-600 h-5 w-5" />
          </button>
          <div>
            <h2 className="text-gray-900 text-xl font-bold">
              {initialData ? "Edit Shed" : "Create New Shed"}
            </h2>
            <p className="text-gray-600 text-sm">
              {initialData
                ? "Update shed information"
                : "Fill in the details to create a new shed"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Farmer Selection */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Farmer <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.farmer_id}
              onChange={(e) => handleChange("farmer_id", e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                errors.farmer_id ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isFarmer}
            >
              <option value="">Select Farmer</option>
              {allFarmers?.data?.map((farmer: any) => (
                <option key={farmer.id} value={farmer.id}>
                  {farmer.name}
                </option>
              ))}
            </select>
            {errors.farmer_id && (
              <p className="mt-1 text-xs text-red-500">{errors.farmer_id}</p>
            )}
          </div>

          {/* Shed Name */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Shed Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter shed number (e.g., SH-001)"
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Division */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Division <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.division_id}
              onChange={(e) => handleChange("division_id", e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                errors.division_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Division</option>
              {divisionData?.data?.map((division: Division) => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
            {errors.division_id && (
              <p className="mt-1 text-xs text-red-500">{errors.division_id}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              District <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.district_id}
              onChange={(e) => handleChange("district_id", e.target.value)}
              disabled={!formData.division_id}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                errors.district_id ? "border-red-500" : "border-gray-300"
              } ${!formData.division_id ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="">Select District</option>
              {availableDistricts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district_id && (
              <p className="mt-1 text-xs text-red-500">{errors.district_id}</p>
            )}
          </div>

          {/* Upzilla */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Upzilla <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.upzilla_id}
              onChange={(e) => handleChange("upzilla_id", e.target.value)}
              disabled={!formData.district_id}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                errors.upzilla_id ? "border-red-500" : "border-gray-300"
              } ${!formData.district_id ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="">Select Upzilla</option>
              {availableUpzillas.map((upzilla) => (
                <option key={upzilla.id} value={upzilla.id}>
                  {upzilla.name}
                </option>
              ))}
            </select>
            {errors.upzilla_id && (
              <p className="mt-1 text-xs text-red-500">{errors.upzilla_id}</p>
            )}
          </div>

          {/* Union */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Union <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.union_id}
              onChange={(e) => handleChange("union_id", e.target.value)}
              disabled={!formData.upzilla_id}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                errors.union_id ? "border-red-500" : "border-gray-300"
              } ${!formData.upzilla_id ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="">Select Union</option>
              {availableUnions.map((union) => (
                <option key={union.id} value={union.id}>
                  {union.name}
                </option>
              ))}
            </select>
            {errors.union_id && (
              <p className="mt-1 text-xs text-red-500">{errors.union_id}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter complete address"
              rows={3}
              className="border-gray-300 w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="border-gray-200 mt-8 flex justify-end space-x-3 border-t pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-700 border-gray-300 hover:bg-gray-50 rounded-lg border bg-white px-4 py-2 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
          >
            <Save className="mr-2 h-4 w-4" />
            {initialData ? "Update Shed" : "Create Shed"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShedForm;
