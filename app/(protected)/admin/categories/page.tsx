"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Tag, FolderKanban, Search } from "lucide-react";
import { DashboardHeader } from "@/components/admin/dashboardHeader";
import { Button } from "@/components/ui/button";
import { type Category } from "@/app/types/eventType";
import useSWR, { mutate } from "swr";
import api from "@/app/services/api";
import CategoryFormModal, {
  type CategoryFormValues,
} from "@/components/shared/CategoryFormModal";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

type CategoryType = "event" | "doc";
type ModalMode = "add" | "edit" | null;

const ENDPOINT: Record<CategoryType, string> = {
  event: "/event-category",
  doc: "/doc-category",
};

function extractList(raw: any): Category[] {
  return raw?.data?.data ?? raw?.data ?? raw ?? [];
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<CategoryType>("event");
  const [searchQuery, setSearchQuery] = useState("");

  const endpoint = ENDPOINT[activeTab];
  const { data: raw, isLoading, error } = useSWR(endpoint, fetcher);
  const categories = extractList(raw);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const openAddModal = () => {
    setEditingCategory(null);
    setModalMode("add");
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingCategory(null);
  };

  const handleSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
      if (modalMode === "add") {
        await api.post(endpoint, {
          name: values.name,
          description: values.description || null,
        });
      } else if (modalMode === "edit" && editingCategory) {
        await api.put(`${endpoint}/${editingCategory.id}`, {
          name: values.name,
          description: values.description || null,
        });
      }
      mutate(endpoint);
      closeModal();
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal menyimpan kategori.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;
    setIsDeleting(true);
    try {
      await api.delete(`${endpoint}/${deletingCategory.id}`);
      mutate(endpoint);
      setDeletingCategory(null);
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal menghapus kategori.");
    } finally {
      setIsDeleting(false);
    }
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
        <div className="relative flex items-center bg-gray-100 rounded-xl p-1 w-full sm:w-[550px]">
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

      <p className="text-xs font-medium text-gray-400 mb-4">
        {filteredCategories.length} kategori{" "}
        {activeTab === "event" ? "event" : "dokumentasi"}
      </p>

      {/* Category List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-sm text-gray-400">
          Memuat kategori…
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 text-sm text-red-500">
          Gagal memuat data kategori.
        </div>
      ) : filteredCategories.length > 0 ? (
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

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEditModal(category)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                    title="Edit kategori"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeletingCategory(category)}
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

      <CategoryFormModal
        open={modalMode !== null}
        onOpenChange={(open) => !open && closeModal()}
        mode={modalMode ?? "add"}
        eyebrow={
          activeTab === "event" ? "Event Category" : "Documentation Category"
        }
        descriptionRequired={activeTab === "doc"}
        initialValues={
          editingCategory
            ? {
                name: editingCategory.name,
                description: editingCategory.description ?? "",
              }
            : undefined
        }
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deletingCategory !== null}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        title="Hapus Kategori?"
        description={`Kategori "${deletingCategory?.name}" akan dihapus permanen dan tidak dapat dikembalikan.`}
        confirmLabel="Ya, Hapus"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
