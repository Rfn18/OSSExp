"use client";




import { User } from "@/app/types/userType";
import DataTable from "@/components/ui/dataTable";
import { Pencil, Power } from "lucide-react";

type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  onEdit?: (row: T) => void;
  onActivate?: (row: T) => void;
};

export function EmployeeTable({
  data,
  onEdit,
  onActivate,
}: {
  data: User[];
  onEdit?: (row: User) => void;
  onActivate?: (row: User) => void;
}) {
  const columns: Column<User>[] = [
    {
      header: "ID",
      render: (row: User) => row.id,
    },
    {
      header: "User",
      render: (row: User) => (
        <div className="flex gap-4">
          {row.profile_picture ? (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/user/${row.profile_picture}`}
              className="w-10 h-10 object-cover object-center rounded-full"
            />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.name || "User")}&background=cce3de&color=03045e`}
              className="w-10 h-10 object-cover object-center rounded-full"
            />
          )}
        </div>
      ),
    },
    {
      header: "Role",
      render: (row: User) => row.role?.name,
    },
    {
      header: "Status",
      accessor: "is_active",
    },
    {
      header: "Aksi",
      render: (row: User) => (
        <>
          <button
            onClick={() => onEdit?.(row)}
            className="text-sm text-blue-dark px-2 py-2 cursor-pointer hover:bg-success/10 rounded transition"
          >
            <Pencil size={16} className="text-[#2f524a]" />
          </button>

          <button
            onClick={() => onActivate?.(row)}
            className="text-sm text-warning px-2 py-2 ml-2 cursor-pointer hover:bg-warning/10 rounded transition"
          >
            <Power size={16} className="text-red-500" />
          </button>
        </>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
