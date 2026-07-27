"use client";

import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Tag,
  FolderKanban,
  AlertTriangle,
  Search,
} from "lucide-react";
import { DashboardHeader } from "@/components/admin/dashboardHeader";
import { Button } from "@/components/ui/button";

// --- Types ---
type CategoryType = "event" | "doc";

type Category = {
  id: string;
  name: string;
  description?: string;
};

type ModalMode = "add" | "edit" | null;

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<CategoryType>("event");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Data
  const [eventCategories, setEventCategories] = useState<Category[]>([
    {
      id: "e1",
      name: "Sosial",
      description: "Kegiatan bertema sosial dan kepedulian",
    },
    {
      id: "e2",
      name: "Olahraga",
      description: "Kegiatan yang berkaitan dengan aktivitas fisik",
    },
    { id: "e3", name: "Akademik", description: "" },
    {
      id: "e4",
      name: "Keagamaan",
      description: "Peringatan hari besar dan kegiatan rohani",
    },
  ]);

  const [docCategories, setDocCategories] = useState<Category[]>([
    {
      id: "d1",
      name: "Apel Pembukaan",
      description: "Dokumentasi upacara pembukaan resmi",
    },
    {
      id: "d2",
      name: "Sambutan",
      description: "Sesi sambutan dari pihak penyelenggara",
    },
    {
      id: "d3",
      name: "Pembagian Hadiah",
      description: "Pemberian penghargaan kepada peserta",
    },
    { id: "d4", name: "Penutupan", description: "" },
    {
      id: "d5",
      name: "Sesi Foto Bersama",
      description: "Dokumentasi foto seluruh peserta",
    },
  ]);

  // Modal state
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );

  // Form state
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const activeCategories =
    activeTab === "event" ? eventCategories : docCategories;
  const setActiveCategories =
    activeTab === "event" ? setEventCategories : setDocCategories;

  const filteredCategories = activeCategories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // --- Handlers ---
  const openAddModal = () => {
    setEditingCategory(null);
    setFormName("");
    setFormDescription("");
    setModalMode("add");
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormName(category.name);
    setFormDescription(category.description || "");
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingCategory(null);
    setFormName("");
    setFormDescription("");
  };

  const handleSubmit = () => {
    if (!formName.trim()) return;

    if (modalMode === "add") {
      const newCategory: Category = {
        id: `${activeTab}-${Date.now()}`,
        name: formName.trim(),
        description: formDescription.trim() || undefined,
      };
      setActiveCategories((prev) => [...prev, newCategory]);
    } else if (modalMode === "edit" && editingCategory) {
      setActiveCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                name: formName.trim(),
                description: formDescription.trim() || undefined,
              }
            : c,
        ),
      );
    }
    closeModal();
  };

  const confirmDelete = (category: Category) => {
    setDeletingCategory(category);
  };

  const handleDelete = () => {
    if (!deletingCategory) return;
    setActiveCategories((prev) =>
      prev.filter((c) => c.id !== deletingCategory.id),
    );
    setDeletingCategory(null);
  };

  return (
    <div className="w-auto h-auto min-h-full font-sans text-gray-900 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <DashboardHeader
          title="Kategori"
          description="Kelola kategori event dan kategori dokumentasi"
        />
        <div className="w-full flex flex-col justify-end sm:items-end">
          <Button
            onClick={openAddModal}
            className="w-full sm:w-auto bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer"
          >
            <Plus size={16} /> Tambah Kategori
          </Button>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Segmented Tab */}
        <div className=" relative flex items-center bg-gray-100 rounded-xl p-1 w-full sm:w-[550px]">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-200 ease-out ${
              activeTab === "doc"
                ? "translate-x-[calc(100%+4px)]"
                : "translate-x-0"
            }`}
          />
          <button
            onClick={() => setActiveTab("event")}
            className={`cursor-pointer relative z-10 flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === "event" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <Tag size={15} /> Event Categories
          </button>
          <button
            onClick={() => setActiveTab("doc")}
            className={`cursor-pointer relative z-10 flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === "doc" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <FolderKanban size={15} /> Documentation Categories
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kategori..."
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
          />
        </div>
      </div>

      {/* Category count */}
      <p className="text-xs font-medium text-gray-400 mb-4">
        {filteredCategories.length} kategori{" "}
        {activeTab === "event" ? "event" : "dokumentasi"}
      </p>

      {/* Category List */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    {activeTab === "event" ? (
                      <Tag size={16} className="text-[#1e3a8a]" />
                    ) : (
                      <FolderKanban size={16} className="text-[#1e3a8a]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Action buttons — always visible per requirement */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEditModal(category)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                    title="Edit kategori"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => confirmDelete(category)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                    title="Hapus kategori"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p
                className={`text-xs leading-relaxed ${
                  category.description
                    ? "text-gray-500"
                    : "text-gray-300 italic"
                }`}
              >
                {category.description || "Tidak ada deskripsi"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          {activeTab === "event" ? (
            <Tag className="w-8 h-8 text-gray-300 mb-2" />
          ) : (
            <FolderKanban className="w-8 h-8 text-gray-300 mb-2" />
          )}
          <p className="text-sm text-gray-500">
            {searchQuery
              ? "Kategori tidak ditemukan"
              : `Belum ada kategori ${activeTab === "event" ? "event" : "dokumentasi"}`}
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                {modalMode === "add" ? "Tambah Kategori" : "Update Kategori"}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {activeTab === "event"
                  ? "Event Category"
                  : "Documentation Category"}
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nama Kategori <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Apel Pembukaan"
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Deskripsi{" "}
                  <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Tambahkan deskripsi singkat..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formName.trim()}
                className="px-5 py-2.5 bg-[#1e3a8a] hover:bg-[#172e6e] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                {modalMode === "add" ? "Tambah" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeletingCategory(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-2 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Hapus Kategori?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Kategori{" "}
                <span className="font-semibold text-gray-700">
                  "{deletingCategory.name}"
                </span>{" "}
                akan dihapus permanen dan tidak dapat dikembalikan.
              </p>
            </div>

            <div className="flex items-center gap-3 px-6 py-5 mt-2">
              <button
                onClick={() => setDeletingCategory(null)}
                className="flex-1 px-5 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
