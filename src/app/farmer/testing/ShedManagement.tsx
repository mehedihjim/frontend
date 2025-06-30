"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import ShedTable from "./ShedTable";
import ShedViewModal from "./ShedViewModal";
import ShedForm from "./ShedForm";
import DeleteConfirmModal from "./DeleteConfirmModa";

// Mock data for demonstration
const mockSheds = [
  {
    id: 1,
    name: "SH-001",
    farmer: "John Doe",
    farmer_id: 1,
    division: "Dhaka",
    division_id: 1,
    district: "Dhaka",
    district_id: 1,
    district_name: "Dhaka",
    upzilla: "Dhanmondi",
    upzilla_id: 1,
    union: "Ward 15",
    union_id: 1,
    address: "123 Main Street, Dhanmondi",
    created_at: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "SH-002",
    farmer: "Jane Smith",
    farmer_id: 2,
    division: "Chittagong",
    division_id: 2,
    district: "Chittagong",
    district_id: 2,
    district_name: "Chittagong",
    upzilla: "Kotwali",
    upzilla_id: 2,
    union: "Ward 5",
    union_id: 2,
    address: "456 Harbor Road, Kotwali",
    created_at: "2024-01-10",
    status: "active",
  },
];

const ShedManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingShed, setEditingShed] = useState<any>(null);
  const [viewingShed, setViewingShed] = useState<any>(null);
  const [deletingShed, setDeletingShed] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sheds, setSheds] = useState(mockSheds);

  const handleCreate = () => {
    setEditingShed(null);
    setShowForm(true);
  };

  const handleEdit = (shed: any) => {
    setEditingShed(shed);
    setShowForm(true);
  };

  const handleView = (shed: any) => {
    setViewingShed(shed);
  };

  const handleDelete = (shed: any) => {
    setDeletingShed(shed);
  };

  const confirmDelete = () => {
    if (deletingShed) {
      setSheds((prev) => prev.filter((shed) => shed.id !== deletingShed.id));
      setDeletingShed(null);
    }
  };

  const handleFormSubmit = (data: any) => {
    if (editingShed) {
      // Update existing shed
      setSheds((prev) =>
        prev.map((shed) =>
          shed.id === editingShed.id ? { ...shed, ...data } : shed,
        ),
      );
    } else {
      // Create new shed
      const newShed = {
        ...data,
        id: Math.max(...sheds.map((s) => s.id)) + 1,
        created_at: new Date().toISOString().split("T")[0],
        status: "active",
      };
      setSheds((prev) => [...prev, newShed]);
    }
    setShowForm(false);
    setEditingShed(null);
  };

  const filteredSheds = sheds.filter(
    (shed) =>
      shed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shed.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shed.district_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
              <button className="text-gray-700 hover:bg-gray-50 border-gray-100 inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200 dark:shadow-none">
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
              <button
                onClick={handleCreate}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
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
            {/* Search and Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="text-gray-400 absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
                  <input
                    type="text"
                    placeholder="Search sheds, farmers, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-gray-300 w-full rounded-lg border py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="text-gray-700 hover:bg-gray-50 border-gray-300 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium transition-colors duration-200">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="border-gray-200 rounded-xl border bg-white p-6 shadow-sm">
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
              <div className="border-gray-200 rounded-xl border bg-white p-6 shadow-sm">
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
              <div className="border-gray-200 rounded-xl border bg-white p-6 shadow-sm">
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
              <div className="border-gray-200 rounded-xl border bg-white p-6 shadow-sm">
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
