import React, { useState, useEffect } from "react";
import { X, Save, ArrowLeft } from "lucide-react";

// Mock data for sheds - replace with your API data
const mockSheds = [
  { id: 1, name: "SH-001" },
  { id: 2, name: "SH-002" },
  { id: 3, name: "SH-003" },
  { id: 4, name: "SH-004" },
];

const henTypes = [
  { value: "Broiler", label: "Broiler" },
  { value: "Sonali", label: "Sonali" },
  { value: "Hybrid Layer", label: "Hybrid Layer" },
  { value: "Deshi", label: "Deshi" },
  { value: "Cockerel", label: "Cockerel" },
];

interface BatchFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const BatchForm: React.FC<BatchFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    shed_id: "",
    batch_number: "",
    hen_type: "",
    chick_number: "",
    chick_price: "",
    start_date: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        shed_id: initialData.shed_id || "",
        batch_number: initialData.batch_number || "",
        hen_type: initialData.hen_type || "",
        chick_number: initialData.chick_number || "",
        chick_price: initialData.chick_price || "",
        start_date: initialData.start_date || "",
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.shed_id) newErrors.shed_id = "Please select a shed";
    if (!formData.batch_number)
      newErrors.batch_number = "Batch number is required";
    if (!formData.hen_type) newErrors.hen_type = "Please select hen type";
    if (!formData.chick_number)
      newErrors.chick_number = "Number of chicks is required";
    if (!formData.chick_price)
      newErrors.chick_price = "Chick price is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";

    // Validate numeric fields
    if (formData.chick_number && isNaN(Number(formData.chick_number))) {
      newErrors.chick_number = "Must be a valid number";
    }
    if (formData.chick_price && isNaN(Number(formData.chick_price))) {
      newErrors.chick_price = "Must be a valid price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const shed = mockSheds.find((s) => s.id === parseInt(formData.shed_id));

      onSubmit({
        ...formData,
        shed_name: shed?.name || "",
        chick_number: parseInt(formData.chick_number),
        chick_price: parseFloat(formData.chick_price),
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
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
              {initialData ? "Edit Batch" : "Create New Batch"}
            </h2>
            <p className="text-gray-600 text-sm">
              {initialData
                ? "Update batch information"
                : "Fill in the details to create a new batch"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Shed Selection */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Shed <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.shed_id}
              onChange={(e) => handleChange("shed_id", e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 ${
                errors.shed_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Shed</option>
              {mockSheds.map((shed) => (
                <option key={shed.id} value={shed.id}>
                  {shed.name}
                </option>
              ))}
            </select>
            {errors.shed_id && (
              <p className="mt-1 text-xs text-red-500">{errors.shed_id}</p>
            )}
          </div>

          {/* Batch Number */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Batch Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.batch_number}
              onChange={(e) => handleChange("batch_number", e.target.value)}
              placeholder="Enter batch number (e.g., B-001)"
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 ${
                errors.batch_number ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.batch_number && (
              <p className="mt-1 text-xs text-red-500">{errors.batch_number}</p>
            )}
          </div>

          {/* Hen Type */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Hen Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.hen_type}
              onChange={(e) => handleChange("hen_type", e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 ${
                errors.hen_type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Hen Type</option>
              {henTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.hen_type && (
              <p className="mt-1 text-xs text-red-500">{errors.hen_type}</p>
            )}
          </div>

          {/* Number of Chicks */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Number of Chicks <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.chick_number}
              onChange={(e) => handleChange("chick_number", e.target.value)}
              placeholder="Enter number of chicks"
              min="1"
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 ${
                errors.chick_number ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.chick_number && (
              <p className="mt-1 text-xs text-red-500">{errors.chick_number}</p>
            )}
          </div>

          {/* Chick Price */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Price per Chick (৳) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.chick_price}
              onChange={(e) => handleChange("chick_price", e.target.value)}
              placeholder="Enter price per chick"
              min="0"
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 ${
                errors.chick_price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.chick_price && (
              <p className="mt-1 text-xs text-red-500">{errors.chick_price}</p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => handleChange("start_date", e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 ${
                errors.start_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.start_date && (
              <p className="mt-1 text-xs text-red-500">{errors.start_date}</p>
            )}
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
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-emerald-700"
          >
            <Save className="mr-2 h-4 w-4" />
            {initialData ? "Update Batch" : "Create Batch"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BatchForm;
