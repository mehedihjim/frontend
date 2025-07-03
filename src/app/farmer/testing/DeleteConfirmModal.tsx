import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
  shed: any;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  shed,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="border-gray-200 flex items-center justify-between border-b p-6">
          <div className="flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-gray-900 text-lg font-semibold">
              Confirm Delete
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
          >
            <X className="text-gray-500 h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete the shed{" "}
            <strong>{shed.name}</strong>? This action cannot be undone.
          </p>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex">
              <AlertTriangle className="mr-2 mt-0.5 h-5 w-5 text-red-400" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Warning</h4>
                <p className="mt-1 text-sm text-red-700">
                  This will permanently remove all shed data and cannot be
                  recovered.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-gray-200 flex justify-end space-x-3 border-t px-6 py-4">
          <button
            onClick={onCancel}
            className="text-gray-700 border-gray-300 hover:bg-gray-50 rounded-lg border bg-white px-4 py-2 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
          >
            Delete Shed
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
