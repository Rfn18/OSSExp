"use client";

import { useState } from "react";
import { User } from "@/app/types/userType";
import { DashboardHeader } from "@/components/admin/dashboardHeader";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import DataTable, { DataTableColumn } from "@/components/admin/table/dataTable";
import { ActionButton, StatusBadge } from "@/components/admin/table/tableParts";

const EMAIL_ADDRESS = "budi01@gmail.com";

export default function UserManage() {
  const userData: User[] = [
    {
      id: "1",
      name: "Budi Santoso",
      email: EMAIL_ADDRESS,
      role_id: "1",
      role: { id: "1", name: "Admin", guard_name: "web" },
      is_active: true,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [deletingRole, setDeletingRole] = useState<User | null>(null);

  const openEditUser = (row: User) => {
    console.log(row);
  };

  const filteredRoles = userData.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const columns: DataTableColumn<User>[] = [
    {
      key: "name",
      header: "Nama",
      render: (user) => (
        <button
          onClick={() => openEditUser(user)}
          className="flex items-center cursor-pointer gap-2.5 font-semibold text-gray-900 hover:text-[#1e3a8a] transition-colors"
        >
          {user.name}
        </button>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (user) => <span className="text-gray-500">{user.email}</span>,
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
          <Users size={12} /> {user.role?.name}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) =>
        user.is_active ? (
          <StatusBadge
            label="Aktif"
            dotColor="bg-green-500"
            badgeColor="bg-green-50 border border-green-100"
            textColor="text-green-700"
            pulse
          />
        ) : (
          <StatusBadge
            label="Tidak Aktif"
            dotColor="bg-red-500"
            badgeColor="bg-red-50 border border-red-100"
            textColor="text-red-700"
            pulse
          />
        ),
    },
    {
      key: "action",
      header: "Aksi",
      align: "right",
      render: (user) => (
        <div className="flex items-center justify-end gap-1">
          <ActionButton
            title="Edit role"
            color="gray"
            onClick={() => openEditUser(user)}
          >
            <Pencil size={14} />
          </ActionButton>
          <ActionButton
            title="Hapus role"
            color="red"
            onClick={() => setDeletingRole(user)}
          >
            <Trash2 size={14} />
          </ActionButton>
        </div>
      ),
    },
  ];

  const renderMobileCard = (user: User) => (
    <>
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <button
          onClick={() => openEditUser(user)}
          className="font-semibold text-gray-900 text-sm hover:text-[#1e3a8a] transition-colors truncate"
        >
          {user.name}
        </button>
        {user.is_active ? (
          <StatusBadge
            label="Aktif"
            dotColor="bg-green-500"
            badgeColor="bg-green-50 border border-green-100"
            textColor="text-green-700"
            pulse
          />
        ) : (
          <StatusBadge
            label="Tidak Aktif"
            dotColor="bg-red-500"
            badgeColor="bg-red-50 border border-red-100"
            textColor="text-red-700"
            pulse
          />
        )}
      </div>
      <div className="space-y-1.5 mb-3 text-xs text-gray-500">
        <p>{user.email}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
          <Users size={12} /> {user.role?.name}
        </span>
      </div>
      <div className="flex items-center gap-1 border-t border-gray-100 pt-3">
        <ActionButton
          title="Edit role"
          color="gray"
          onClick={() => openEditUser(user)}
        >
          <Pencil size={14} />
        </ActionButton>
        <ActionButton
          title="Hapus role"
          color="red"
          onClick={() => setDeletingRole(user)}
        >
          <Trash2 size={14} />
        </ActionButton>
      </div>
    </>
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <DashboardHeader
          title="User Manage"
          description="Kelola data pengguna di web OSSExp"
          isGreeting={false}
        />
        <div className="w-full flex flex-col justify-end sm:items-end">
          <Button className="w-full sm:w-auto bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer">
            <Plus size={16} /> Tambah User
          </Button>
        </div>
      </div>

      <DataTable<User>
        containerClassName="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        headerLeft={
          <p className="text-xs font-medium text-gray-400">
            {filteredRoles.length} role terdaftar
          </p>
        }
        headerAction={
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
        }
        columns={columns}
        data={filteredRoles}
        rowKey={(u) => u.id}
        renderMobileCard={renderMobileCard}
        emptyTitle="Tidak ada role yang ditemukan"
        emptyDescription=""
        emptyColSpan={5}
      />
    </>
  );
}
