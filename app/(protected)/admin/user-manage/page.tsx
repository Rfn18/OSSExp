"use client";

import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  AlertTriangle,
  MoveLeft,
  ShieldCheck,
  Users,
  Check,
} from "lucide-react";

// --- Types ---
type Role = {
  id: string;
  name: string;
  description?: string;
  userCount: number;
};

type PermissionAction = "create" | "read" | "update" | "delete";

type ModulePermission = {
  module: string;
  permissions: Record<PermissionAction, boolean>;
};

type ModalMode = "add" | "edit" | null;

const ACTIONS: { key: PermissionAction; label: string }[] = [
  { key: "read", label: "Read" },
  { key: "create", label: "Create" },
  { key: "update", label: "Update" },
  { key: "delete", label: "Delete" },
];

const MODULES = [
  "Events",
  "Categories",
  "Documentations",
  "User Management",
  "Role & Permission",
  "Notif Set",
];

function buildDefaultMatrix(fullAccess: boolean): ModulePermission[] {
  return MODULES.map((module) => ({
    module,
    permissions: {
      create: fullAccess,
      read: true,
      update: fullAccess,
      delete: fullAccess,
    },
  }));
}

export default function RolePermissionPage() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "r1",
      name: "Super Admin",
      description: "Akses penuh ke seluruh modul sistem",
      userCount: 1,
    },
    {
      id: "r2",
      name: "Admin Event",
      description: "Mengelola event dan kategori event",
      userCount: 2,
    },
    {
      id: "r3",
      name: "Admin Dokumentasi",
      description: "Mengelola dokumentasi dan galeri",
      userCount: 3,
    },
    {
      id: "r4",
      name: "Viewer",
      description: "Hanya dapat melihat data",
      userCount: 5,
    },
  ]);

  const [matrixByRole, setMatrixByRole] = useState<
    Record<string, ModulePermission[]>
  >({
    r1: buildDefaultMatrix(true),
    r2: buildDefaultMatrix(false),
    r3: buildDefaultMatrix(false),
    r4: buildDefaultMatrix(false).map((m) => ({
      module: m.module,
      permissions: { create: false, read: true, update: false, delete: false },
    })),
  });

  const [activeRole, setActiveRole] = useState<Role | null>(null);

  // Modal state (add/edit role)
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const filteredRoles = roles.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // --- Handlers: Role CRUD ---
  const openAddModal = () => {
    setEditingRole(null);
    setFormName("");
    setFormDescription("");
    setModalMode("add");
  };

  const openEditModal = (role: Role) => {
    setEditingRole(role);
    setFormName(role.name);
    setFormDescription(role.description || "");
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingRole(null);
  };

  const handleSubmit = () => {
    if (!formName.trim()) return;

    if (modalMode === "add") {
      const newId = `r-${Date.now()}`;
      const newRole: Role = {
        id: newId,
        name: formName.trim(),
        description: formDescription.trim() || undefined,
        userCount: 0,
      };
      setRoles((prev) => [...prev, newRole]);
      setMatrixByRole((prev) => ({
        ...prev,
        [newId]: buildDefaultMatrix(false),
      }));
    } else if (modalMode === "edit" && editingRole) {
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editingRole.id
            ? {
                ...r,
                name: formName.trim(),
                description: formDescription.trim() || undefined,
              }
            : r,
        ),
      );
    }
    closeModal();
  };

  const handleDeleteRole = () => {
    if (!deletingRole) return;
    setRoles((prev) => prev.filter((r) => r.id !== deletingRole.id));
    setMatrixByRole((prev) => {
      const next = { ...prev };
      delete next[deletingRole.id];
      return next;
    });
    setDeletingRole(null);
  };

  // --- Handlers: Navigate to detail ---
  const openDetail = (role: Role) => {
    setActiveRole(role);
    setView("detail");
  };

  const backToList = () => {
    setView("list");
    setActiveRole(null);
  };

  // --- Handlers: Permission matrix ---
  const togglePermission = (module: string, action: PermissionAction) => {
    if (!activeRole) return;
    setMatrixByRole((prev) => ({
      ...prev,
      [activeRole.id]: prev[activeRole.id].map((m) =>
        m.module === module
          ? {
              ...m,
              permissions: {
                ...m.permissions,
                [action]: !m.permissions[action],
              },
            }
          : m,
      ),
    }));
  };

  const toggleAllInModule = (module: string, checked: boolean) => {
    if (!activeRole) return;
    setMatrixByRole((prev) => ({
      ...prev,
      [activeRole.id]: prev[activeRole.id].map((m) =>
        m.module === module
          ? {
              ...m,
              permissions: {
                create: checked,
                read: checked,
                update: checked,
                delete: checked,
              },
            }
          : m,
      ),
    }));
  };

  // ============ DETAIL VIEW ============
  if (view === "detail" && activeRole) {
    const matrix = matrixByRole[activeRole.id] || [];

    return (
      <div className="w-auto h-auto min-h-full font-sans text-gray-900 pb-12">
        {/* Back */}
        <button
          onClick={backToList}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <MoveLeft size={16} strokeWidth={2.5} />
          Kembali ke Role & Permission
        </button>

        {/* Role Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={20} className="text-[#1e3a8a]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {activeRole.name}
              </h1>
              <p className="text-sm text-gray-500">
                {activeRole.description || "Tidak ada deskripsi"}
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full w-fit">
            <Users size={12} /> {activeRole.userCount} pengguna
          </span>
        </div>

        {/* Permission Matrix */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">
              Hak Akses Modul
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Atur akses Create, Read, Update, Delete untuk setiap modul
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                    Modul
                  </th>
                  {ACTIONS.map((a) => (
                    <th
                      key={a.key}
                      className="text-center font-semibold text-gray-500 text-xs uppercase tracking-wide px-4 py-3.5"
                    >
                      {a.label}
                    </th>
                  ))}
                  <th className="text-center font-semibold text-gray-500 text-xs uppercase tracking-wide px-4 py-3.5">
                    Semua
                  </th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => {
                  const allChecked = ACTIONS.every(
                    (a) => row.permissions[a.key],
                  );
                  return (
                    <tr
                      key={row.module}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                        {row.module}
                      </td>
                      {ACTIONS.map((a) => (
                        <td key={a.key} className="px-4 py-4 text-center">
                          <PermCheckbox
                            checked={row.permissions[a.key]}
                            onChange={() => togglePermission(row.module, a.key)}
                          />
                        </td>
                      ))}
                      <td className="px-4 py-4 text-center">
                        <PermCheckbox
                          checked={allChecked}
                          onChange={() =>
                            toggleAllInModule(row.module, !allChecked)
                          }
                          variant="all"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-gray-100">
            <button
              onClick={backToList}
              className="px-5 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              onClick={backToList}
              className="px-5 py-2.5 bg-[#1e3a8a] hover:bg-[#172e6e] text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ LIST VIEW ============
  return (
    <div className="w-auto h-auto min-h-full font-sans text-gray-900 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Role & Permission
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Kelola role dan hak akses tiap modul
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1e3a8a] hover:bg-[#172e6e] text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
        >
          <Plus size={16} /> Tambah Role
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <p className="text-xs font-medium text-gray-400">
            {filteredRoles.length} role terdaftar
          </p>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari role..."
              className="pl-10 pr-4 py-2 w-56 rounded-full border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Nama Role
                </th>
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Deskripsi
                </th>
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Pengguna
                </th>
                <th className="text-right font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openDetail(role)}
                        className="flex items-center gap-2.5 font-semibold text-gray-900 hover:text-[#1e3a8a] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <ShieldCheck size={14} className="text-[#1e3a8a]" />
                        </div>
                        {role.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {role.description || (
                        <span className="italic text-gray-300">
                          Tidak ada deskripsi
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
                        <Users size={12} /> {role.userCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(role)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                          title="Edit role"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeletingRole(role)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                          title="Hapus role"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-16">
                    <p className="text-sm text-gray-400">
                      Tidak ada role yang ditemukan
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                {modalMode === "add" ? "Tambah Role" : "Update Role"}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nama Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Admin Event"
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

              {modalMode === "add" && (
                <p className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3.5 py-2.5">
                  Hak akses modul bisa diatur setelah role dibuat, lewat halaman
                  detail role.
                </p>
              )}
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

      {/* Delete Confirmation Modal */}
      {deletingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeletingRole(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-2 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Hapus Role?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Role{" "}
                <span className="font-semibold text-gray-700">
                  "{deletingRole.name}"
                </span>{" "}
                akan dihapus permanen.{" "}
                {deletingRole.userCount > 0 && (
                  <span className="text-red-500 font-medium">
                    {deletingRole.userCount} pengguna masih menggunakan role
                    ini.
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 px-6 py-5 mt-2">
              <button
                onClick={() => setDeletingRole(null)}
                className="flex-1 px-5 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteRole}
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

// --- Permission Checkbox ---
function PermCheckbox({
  checked,
  onChange,
  variant = "default",
}: {
  checked: boolean;
  onChange: () => void;
  variant?: "default" | "all";
}) {
  return (
    <button
      onClick={onChange}
      className={`w-6 h-6 rounded-md border flex items-center justify-center mx-auto transition-colors ${
        checked
          ? variant === "all"
            ? "bg-gray-900 border-gray-900"
            : "bg-[#1e3a8a] border-[#1e3a8a]"
          : "bg-white border-gray-300 hover:border-gray-400"
      }`}
    >
      {checked && <Check size={14} className="text-white" strokeWidth={3} />}
    </button>
  );
}
