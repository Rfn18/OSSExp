"use client";

import { User } from "@/app/types/userType";
import { DashboardHeader } from "@/components/admin/DashboardHeder";
import { EmployeeTable } from "@/components/admin/Table/ManagementTable";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Loading } from "@/components/ui/load";
import { Pencil, Plus, Search, ShieldCheck, Trash2, Users } from "lucide-react";
import { useState } from "react";

const EMAIL_ADDRESS = "rinofaster89@gmail.com";

export default function UserManage() {
  const handleInactivateUser = (row: any) => {
    console.log(row);
  };

  const userData: User[] = [
    {
      id: "1",
      name: "Budi Santoso",
      email: EMAIL_ADDRESS,
      role_id: "1",
      role: {
        id: "1",
        name: "Admin",
        guard_name: "web",
      },
      is_active: true,
    },
  ];

  const openEditUser = (row: any) => {
    console.log(row);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deletingRole, setDeletingRole] = useState<User | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredRoles = userData.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
                  Nama
                </th>
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Email
                </th>
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Role
                </th>
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Status
                </th>
                <th className="text-right font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openEditUser(user)}
                        className="flex items-center cursor-pointer gap-2.5 font-semibold text-gray-900 hover:text-[#1e3a8a] transition-colors"
                      >
                        {user.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
                        <Users size={12} /> {user.role?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.is_active ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Tidak Aktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditUser(user)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                          title="Edit role"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeletingRole(user)}
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
    </>
  );
}
