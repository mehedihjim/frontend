"use client";
import React, { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import BatchTable from "./BatchTable";
import BatchForm from "./BatchForm";
import BatchViewModal from "./BatchViewModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

// Mock data for demonstration - replace with your API data
const mockBatches = [
  {
    id: 1,
    batch_number: "B-001",
    shed_id: 1,
    shed_name: "SH-001",
    hen_type: "Broiler",
    chick_number: 500,
    chick_price: 45.5,
    start_date: "2024-01-15",
    status: "active",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    batch_number: "B-002",
    shed_id: 2,
    shed_name: "SH-002",
    hen_type: "Sonali",
    chick_number: 300,
    chick_price: 52.0,
    start_date: "2024-01-10",
    status: "active",
    created_at: "2024-01-10",
  },
  {
    id: 3,
    batch_number: "B-003",
    shed_id: 1,
    shed_name: "SH-001",
    hen_type: "Hybrid Layer",
    chick_number: 400,
    chick_price: 48.75,
    start_date: "2024-01-05",
    status: "completed",
    created_at: "2024-01-05",
  },
];

const BatchManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState<any>(null);
  const [viewingBatch, setViewingBatch] = useState<any>(null);
  const [deletingBatch, setDeletingBatch] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [batches, setBatches] = useState(mockBatches);

  const handleCreate = () => {
    setEditingBatch(null);
    setShowForm(true);
  };

  const handleEdit = (batch: any) => {
    setEditingBatch(batch);
    setShowForm(true);
  };

  const handleView = (batch: any) => {
    setViewingBatch(batch);
  };

  const handleDelete = (batch: any) => {
    setDeletingBatch(batch);
  };

  const confirmDelete = () => {
    if (deletingBatch) {
      setBatches((prev) =>
        prev.filter((batch) => batch.id !== deletingBatch.id),
      );
      setDeletingBatch(null);
    }
  };

  const handleFormSubmit = (data: any) => {
    if (editingBatch) {
      // Update existing batch
      setBatches((prev) =>
        prev.map((batch) =>
          batch.id === editingBatch.id ? { ...batch, ...data } : batch,
        ),
      );
    } else {
      // Create new batch
      const newBatch = {
        ...data,
        id: Math.max(...batches.map((b) => b.id)) + 1,
        created_at: new Date().toISOString().split("T")[0],
        status: "active",
      };
      setBatches((prev) => [...prev, newBatch]);
    }
    setShowForm(false);
    setEditingBatch(null);
  };

  const filteredBatches = batches.filter(
    (batch) =>
      batch.batch_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.shed_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.hen_type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const activeBatches = batches.filter((b) => b.status === "active").length;
  const totalChicks = batches.reduce((sum, b) => sum + b.chick_number, 0);
  const avgPrice =
    batches.length > 0
      ? (
          batches.reduce((sum, b) => sum + b.chick_price, 0) / batches.length
        ).toFixed(2)
      : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="border-gray-200 border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-gray-900 text-2xl font-bold">
                Batch Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage poultry batches and track production cycles
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="border-gray-300 text-gray-700 hover:bg-gray-50 inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm font-medium transition-colors duration-200">
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
              <button
                onClick={handleCreate}
                className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Batch
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
                    placeholder="Search batches, sheds, or hen types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-gray-300 w-full rounded-lg border py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <button className="border-gray-300 text-gray-700 hover:bg-gray-50 inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm font-medium transition-colors duration-200">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="border-gray-200 rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="rounded-lg bg-emerald-100 p-2">
                    <div className="h-6 w-6 rounded bg-emerald-600"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm font-medium">
                      Total Batches
                    </p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {batches.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-gray-200 rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <div className="h-6 w-6 rounded bg-blue-600"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm font-medium">
                      Active Batches
                    </p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {activeBatches}
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
                      Total Chicks
                    </p>
                    <p className="text-gray-900 text-2xl font-bold">
                      {totalChicks.toLocaleString()}
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
                    <p className="text-gray-600 text-sm font-medium">
                      Avg. Price
                    </p>
                    <p className="text-gray-900 text-2xl font-bold">
                      ৳{avgPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Batches Table */}
            <BatchTable
              batches={filteredBatches}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />
          </>
        ) : (
          <BatchForm
            initialData={editingBatch}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingBatch(null);
            }}
          />
        )}
      </div>

      {/* Modals */}
      {viewingBatch && (
        <BatchViewModal
          batch={viewingBatch}
          onClose={() => setViewingBatch(null)}
        />
      )}

      {deletingBatch && (
        <DeleteConfirmModal
          shed={deletingBatch}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingBatch(null)}
        />
      )}
    </div>
  );
};

export default BatchManagement;
