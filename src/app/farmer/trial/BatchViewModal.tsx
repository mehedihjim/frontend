import React from "react";
import { X, Calendar, Hash, DollarSign, Users } from "lucide-react";

interface BatchViewModalProps {
  batch: any;
  onClose: () => void;
}

const BatchViewModal: React.FC<BatchViewModalProps> = ({ batch, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHenTypeColor = (henType: string) => {
    switch (henType) {
      case "Broiler":
        return "bg-orange-100 text-orange-800";
      case "Sonali":
        return "bg-yellow-100 text-yellow-800";
      case "Hybrid Layer":
        return "bg-purple-100 text-purple-800";
      case "Deshi":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalValue = batch.chick_number * batch.chick_price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white text-black shadow-xl dark:bg-[#313942] dark:text-white/80">
        {/* Header */}
        <div className="border-gray-200 flex items-center justify-between border-b border-slate-300 p-6 dark:border-slate-600">
          <div>
            <h2 className="text-gray-900 text-xl font-bold">Batch Details</h2>
            <p className="text-gray-600 mt-1 text-sm">
              Complete information about this batch
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
                  <Hash className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-lg font-semibold">
                    {batch.batch_number}
                  </h3>
                  <p className="font-medium text-emerald-600">
                    Batch ID: {batch.id}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(batch.status)}`}
                >
                  {batch.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Shed Information */}
            <div className="space-y-4">
              <h4 className="text-gray-900 border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wider dark:border-slate-600">
                Shed Information
              </h4>
              <div className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <div className="h-4 w-4 rounded bg-blue-600"></div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Shed</p>
                  <p className="text-gray-900 font-medium">{batch.shed_name}</p>
                </div>
              </div>
            </div>

            {/* Hen Type Information */}
            <div className="space-y-4">
              <h4 className="text-gray-900 border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wider dark:border-slate-600">
                Hen Type
              </h4>
              <div className="flex items-center">
                <Users className="text-gray-400 mr-3 h-5 w-5" />
                <div>
                  <p className="text-gray-600 text-sm">Type</p>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-sm font-semibold ${getHenTypeColor(batch.hen_type)}`}
                  >
                    {batch.hen_type}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity Information */}
            <div className="space-y-4">
              <h4 className="text-gray-900 border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wider dark:border-slate-600">
                Quantity Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="text-gray-400 mr-3 h-5 w-5" />
                  <div>
                    <p className="text-gray-600 text-sm">Number of Chicks</p>
                    <p className="text-gray-900 text-lg font-medium">
                      {batch.chick_number.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h4 className="text-gray-900 border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wider dark:border-slate-600">
                Financial Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <DollarSign className="text-gray-400 mr-3 h-5 w-5" />
                  <div>
                    <p className="text-gray-600 text-sm">Price per Chick</p>
                    <p className="text-gray-900 font-medium">
                      ৳{batch.chick_price}
                    </p>
                  </div>
                </div>
                <div className="ml-8">
                  <p className="text-gray-600 text-sm">Total Investment</p>
                  <p className="text-gray-900 text-lg font-bold">
                    ৳{totalValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Date Information */}
            <div className="space-y-4 md:col-span-2">
              <h4 className="text-gray-900 border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wider dark:border-slate-600">
                Timeline
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-3 h-5 w-5" />
                  <div>
                    <p className="text-gray-600 text-sm">Start Date</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(batch.start_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-3 h-5 w-5" />
                  <div>
                    <p className="text-gray-600 text-sm">Created Date</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(batch.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="md:col-span-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-gray-900 mb-2 font-medium">
                  Batch Summary
                </h5>
                <p className="text-gray-600 text-sm">
                  This batch contains{" "}
                  <strong>{batch.chick_number.toLocaleString()}</strong>{" "}
                  {batch.hen_type} chicks housed in shed{" "}
                  <strong>{batch.shed_name}</strong>. The batch was started on{" "}
                  <strong>
                    {new Date(batch.start_date).toLocaleDateString()}
                  </strong>{" "}
                  with a total investment of{" "}
                  <strong>৳{totalValue.toLocaleString()}</strong> at ৳
                  {batch.chick_price} per chick.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-slate-300 px-6 py-4 dark:border-slate-600">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-emerald-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchViewModal;
