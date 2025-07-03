import React, { useState } from "react";
import { Edit, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface ShedTableProps {
  sheds: any[];
  onEdit: (shed: any) => void;
  onView: (shed: any) => void;
  onDelete: (shed: any) => void;
}

const ShedTable: React.FC<ShedTableProps> = ({
  sheds,
  onEdit,
  onView,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(sheds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSheds = sheds.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (sheds.length === 0) {
    return (
      <div className="rounded-xl bg-white shadow-sm dark:bg-white/10 dark:text-white/80">
        <div className="p-12 text-center">
          <div className="bg-gray-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <div className="bg-gray-300 h-8 w-8 rounded"></div>
          </div>
          <h3 className="text-gray-900 mb-2 text-lg font-medium">
            No sheds found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating your first shed.
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
          Sheds ({sheds.length})
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse divide-y divide-blue-300/40 dark:divide-blue-300/50">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Shed ID
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Location
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Created
              </th>
              <th className="text-gray-500 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white dark:bg-white/10 dark:text-white/80">
            {currentSheds.map((shed) => (
              <tr
                key={shed.id}
                className="hover:bg-gray-50 transition-colors duration-150 dark:hover:bg-white/20"
              >
                <td className="overflow-hidden whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                      <span className="text-sm font-medium text-blue-600">
                        {shed.name.slice(-2)}
                      </span>
                    </div>
                    <div className="text-gray-900 text-sm font-medium">
                      {shed.name}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-gray-900 text-sm">
                    {shed.district_name}
                  </div>
                  <div className="text-gray-500 text-sm">{shed.division}</div>
                </td>
                <td className="text-gray-500 whitespace-nowrap px-6 py-4 text-sm">
                  {shed.created_at
                    ? new Date(shed.created_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onView(shed)}
                      className="text-gray-400 rounded-lg p-2 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(shed)}
                      className="text-gray-400 rounded-lg p-2 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-600"
                      title="Edit shed"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(shed)}
                      className="text-gray-400 rounded-lg p-2 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                      title="Delete shed"
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
            Showing {startIndex + 1} to {Math.min(endIndex, sheds.length)} of{" "}
            {sheds.length} entries
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
                    ? "bg-blue-600 text-white"
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

export default ShedTable;
