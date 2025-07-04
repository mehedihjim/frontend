import React from "react";
import { X, MapPin, User, Calendar, Hash } from "lucide-react";

interface ShedViewModalProps {
  shed: any;
  onClose: () => void;
}

const ShedViewModal: React.FC<ShedViewModalProps> = ({ shed, onClose }) => {
  console.log(shed);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white text-black shadow-xl dark:bg-[#313942] dark:text-white/80">
        {/* Header */}
        <div className="border-gray-200 flex items-center justify-between border-b border-slate-300 p-6 dark:border-slate-600">
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
          <div className="mb-6 rounded-lg border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-700">
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
              <h4 className="text-gray-900 border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wider dark:border-slate-600">
                Farmer Information
              </h4>
              <div className="flex items-center">
                <User className="text-gray-400 mr-3 h-5 w-5" />
                <div>
                  <p className="text-gray-600 text-sm">Farmer Name</p>
                  <p className="text-gray-900 font-medium">
                    {shed.farmer_name}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h4 className="text-gray-900 border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wider dark:border-slate-600">
                Location Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="text-gray-400 mr-3 mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-gray-600 text-sm">Division</p>
                    <p className="text-gray-900 font-medium">
                      {shed.division_name}
                    </p>
                  </div>
                </div>
                <div className="ml-8">
                  <p className="text-gray-600 text-sm">District</p>
                  <p className="text-gray-900 font-medium">
                    {shed.district_name}
                  </p>
                </div>
                <div className="ml-8">
                  <p className="text-gray-600 text-sm">Upzilla</p>
                  <p className="text-gray-900 font-medium">
                    {shed.upzilla_name || "N/A"}
                  </p>
                </div>
                <div className="ml-8">
                  <p className="text-gray-600 text-sm">Union</p>
                  <p className="text-gray-900 font-medium">
                    {shed.union_name || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4 md:col-span-2">
              <h4 className="text-gray-900 border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wider dark:border-slate-600">
                Complete Address
              </h4>
              <div className="bg-gray-50 rounded-lg p-1">
                <blockquote className="text-gray-900">
                  {shed.address || "No specific address provided"}
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-slate-300 px-6 py-4 dark:border-slate-600">
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
