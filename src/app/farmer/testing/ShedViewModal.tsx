import React from "react";
import { X, MapPin, User, Calendar, Hash } from "lucide-react";

interface ShedViewModalProps {
  shed: any;
  onClose: () => void;
}

const ShedViewModal: React.FC<ShedViewModalProps> = ({ shed, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="border-gray-200 flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-gray-900 text-xl font-bold">Shed Details</h2>
            <p className="text-gray-600 mt-1 text-sm">
              Complete information about this shed
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
          >
            <X className="text-gray-500 h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info Card */}
          <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
            <div className="flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 text-lg font-semibold">
                  {shed.name}
                </h3>
                <p className="font-medium text-blue-600">Shed ID: {shed.id}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Farmer Information */}
            <div className="space-y-4">
              <h4 className="text-gray-900 border-gray-200 border-b pb-2 text-sm font-semibold uppercase tracking-wider">
                Farmer Information
              </h4>
              <div className="flex items-center">
                <User className="text-gray-400 mr-3 h-5 w-5" />
                <div>
                  <p className="text-gray-600 text-sm">Farmer Name</p>
                  <p className="text-gray-900 font-medium">{shed.farmer}</p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h4 className="text-gray-900 border-gray-200 border-b pb-2 text-sm font-semibold uppercase tracking-wider">
                Location Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="text-gray-400 mr-3 mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-gray-600 text-sm">Division</p>
                    <p className="text-gray-900 font-medium">{shed.division}</p>
                  </div>
                </div>
                <div className="ml-8">
                  <p className="text-gray-600 text-sm">District</p>
                  <p className="text-gray-900 font-medium">{shed.district}</p>
                </div>
                <div className="ml-8">
                  <p className="text-gray-600 text-sm">Upzilla</p>
                  <p className="text-gray-900 font-medium">
                    {shed.upzilla || "N/A"}
                  </p>
                </div>
                <div className="ml-8">
                  <p className="text-gray-600 text-sm">Union</p>
                  <p className="text-gray-900 font-medium">
                    {shed.union || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4 md:col-span-2">
              <h4 className="text-gray-900 border-gray-200 border-b pb-2 text-sm font-semibold uppercase tracking-wider">
                Complete Address
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900">
                  {shed.address || "No specific address provided"}
                </p>
              </div>
            </div>

            {/* Status & Date */}
            <div className="space-y-4">
              <h4 className="text-gray-900 border-gray-200 border-b pb-2 text-sm font-semibold uppercase tracking-wider">
                Status Information
              </h4>
              <div>
                <p className="text-gray-600 mb-2 text-sm">Current Status</p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    shed.status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {shed.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-gray-900 border-gray-200 border-b pb-2 text-sm font-semibold uppercase tracking-wider">
                Created Date
              </h4>
              <div className="flex items-center">
                <Calendar className="text-gray-400 mr-3 h-5 w-5" />
                <div>
                  <p className="text-gray-600 text-sm">Registration Date</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(shed.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-gray-200 bg-gray-50 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShedViewModal;
