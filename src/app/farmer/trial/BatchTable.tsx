import React, { useState } from "react";
import { Edit, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface BatchTableProps {
  batches: any[];
  onEdit: (batch: any) => void;
  onView: (batch: any) => void;
  onDelete: (batch: any) => void;
}

const BatchTable: React.FC<BatchTableProps> = ({
  batches,
  onEdit,
  onView,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(batches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBatches = batches.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  if (batches.length === 0) {
    return (
      <div className="rounded-xl bg-white shadow-sm dark:bg-white/10 dark:text-white/80">
        <div className="p-12 text-center">
          <div className="bg-gray-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <div className="bg-gray-300 h-8 w-8 rounded"></div>
          </div>
          <h3 className="text-gray-900 mb-2 text-lg font-medium">
            No batches found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating your first batch.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-white/10 dark:text-white/80">
      {/* Table Header */}
      <div className="border-b border-blue-300/40 px-6 py-4 dark:border-blue-300/20">
        <h3 className="text-gray-900 text-lg font-medium">
          Batches ({batches.length})
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse divide-y divide-blue-300/40 dark:divide-blue-300/50">
          <thead className="bg-gray-50 border-gray-200 border-b">
            <tr>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Batch Info
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Shed
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Hen Type
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Chicks
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Price/Unit
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Start Date
              </th>
              <th className="text-gray-500 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-white/10 dark:text-white/80">
            {currentBatches.map((batch) => (
              <tr
                key={batch.id}
                className="hover:bg-gray-50 transition-colors duration-150 dark:hover:bg-white/20"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                      <span className="text-sm font-medium text-emerald-600">
                        {batch.batch_number.slice(-2)}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-900 text-sm font-medium">
                        {batch.batch_number}
                      </div>
                      <div className="text-gray-500 text-sm">
                        ID: {batch.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-gray-900 text-sm">{batch.shed_name}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getHenTypeColor(batch.hen_type)}`}
                  >
                    {batch.hen_type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-gray-900 text-sm font-medium">
                    {batch.chick_number.toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-sm">
                    Total: ৳
                    {(batch.chick_number * batch.chick_price).toLocaleString()}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-gray-900 text-sm font-medium">
                    ৳{batch.chick_price}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(batch.status)}`}
                  >
                    {batch.status}
                  </span>
                </td>
                <td className="text-gray-500 whitespace-nowrap px-6 py-4 text-sm">
                  {new Date(batch.start_date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onView(batch)}
                      className="text-gray-400 rounded-lg p-2 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(batch)}
                      className="text-gray-400 rounded-lg p-2 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-600"
                      title="Edit batch"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(batch)}
                      className="text-gray-400 rounded-lg p-2 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                      title="Delete batch"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-gray-200 flex items-center justify-between border-t px-6 py-4">
          <div className="text-gray-700 text-sm">
            Showing {startIndex + 1} to {Math.min(endIndex, batches.length)} of{" "}
            {batches.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-400 hover:text-gray-600 p-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`rounded-lg px-3 py-1 text-sm ${
                  currentPage === page
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-400 hover:text-gray-600 p-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchTable;
