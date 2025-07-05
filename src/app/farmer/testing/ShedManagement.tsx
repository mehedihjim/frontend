"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import ShedTable from "./ShedTable";
import ShedViewModal from "./ShedViewModal";
import ShedForm from "./ShedForm";
import DeleteConfirmModal from "./DeleteConfirmModal";
import {
  useGetShedsQuery,
  useCreateShedMutation,
  useUpdateShedMutation,
  useDeleteShedMutation,
} from "@/redux/api/shedApi";

interface Shed {
  id: number;
  name: string;
  farmer: string;
  farmer_id: number;
  division: string;
  division_id: number;
  district: string;
  district_id: number;
  district_name: string;
  upzilla: string;
  upzilla_id: number;
  union: string;
  union_id: number;
  address: string;
  created_at: string;
  status: string;
}

const ShedManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingShed, setEditingShed] = useState<Shed | null>(null);
  const [viewingShed, setViewingShed] = useState<Shed | null>(null);
  const [deletingShed, setDeletingShed] = useState<Shed | null>(null);
  const [deleteShed] = useDeleteShedMutation();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: shedsData, isLoading, error, refetch } = useGetShedsQuery({});
  const sheds: Shed[] = shedsData?.data || [];
  console.log("Sheds data:", sheds);

  const [createShed] = useCreateShedMutation();
  const [updateShed] = useUpdateShedMutation();

  const handleCreate = () => {
    setEditingShed(null);
    setShowForm(true);
  };

  const handleEdit = (shed: Shed) => {
    setEditingShed(shed);
    setShowForm(true);
  };

  const handleView = (shed: Shed) => {
    setViewingShed(shed);
  };

  const handleDelete = (shed: Shed) => {
    setDeletingShed(shed);
  };

  const confirmDelete = async () => {
    if (deletingShed) {
      try {
        await deleteShed(deletingShed.id).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete shed:", error);
      } finally {
        setDeletingShed(null);
      }
    }
  };

  const handleFormSubmit = async (data: Partial<Shed>) => {
    console.log("Form submitted with data:", data); // Log the form data
    try {
      if (editingShed) {
        await updateShed({ data, shed_id: editingShed.id }).unwrap();
      } else {
        console.log("Creating new shed");
        await createShed(data).unwrap();
      }
      refetch();
      setShowForm(false);
      setEditingShed(null);
    } catch (error) {
      console.error("Shed submission error:", error);
    }
  };

  const filteredSheds = sheds.filter((shed) => {
    const matchesSearch =
      (shed.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shed.farmer || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shed.district_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-black/90 dark:text-white/80">
                Shed Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and organize livestock sheds efficiently
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="text-gray-700 hover:bg-gray-50 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200 dark:bg-white/10 dark:text-white">
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
              <button
                onClick={handleCreate}
                className="inline-flex items-center rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-red-900"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Shed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!showForm ? (
          <>
            {/* Search and Filter Button Row */}
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="text-gray-400 absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
                  <input
                    type="text"
                    placeholder="Search sheds, farmers, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-gray-300 text-gray-900 dark:placeholder-gray-400 w-full rounded-lg bg-white py-3 pl-10 pr-4 shadow-inner transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:text-white"
                  />
                </div>
              </div>
            </div>
            {/* =====Stats Cards==== */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-white/10 dark:text-white/80">
                <div className="flex items-center">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <div className="h-6 w-6 rounded bg-blue-600"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm font-medium">
                      Total Sheds
                    </p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {sheds.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-white/10 dark:text-white/80">
                <div className="flex items-center">
                  <div className="rounded-lg bg-emerald-100 p-2">
                    <div className="h-6 w-6 rounded bg-emerald-600"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm font-medium">
                      Active Sheds
                    </p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {sheds.filter((s) => s.status === "active").length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-white/10 dark:text-white/80">
                <div className="flex items-center">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <div className="h-6 w-6 rounded bg-orange-600"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm font-medium">
                      Districts
                    </p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {new Set(sheds.map((s) => s.district)).size}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-white/10 dark:text-white/80">
                <div className="flex items-center">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <div className="h-6 w-6 rounded bg-purple-600"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm font-medium">Farmers</p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {new Set(sheds.map((s) => s.farmer)).size}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Sheds Table */}
            <ShedTable
              sheds={filteredSheds}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />
          </>
        ) : (
          <ShedForm
            initialData={editingShed}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingShed(null);
            }}
          />
        )}
      </div>

      {/* Modals */}
      {viewingShed && (
        <ShedViewModal
          shed={viewingShed}
          onClose={() => setViewingShed(null)}
        />
      )}

      {deletingShed && (
        <DeleteConfirmModal
          shed={deletingShed}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingShed(null)}
        />
      )}
    </div>
  );
};

export default ShedManagement;
