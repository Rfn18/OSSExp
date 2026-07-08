"use client";

import { useState, ReactNode } from "react";
import { CalendarDays } from "lucide-react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  headerClassName?: string;
  cellClassName?: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  headerLeft?: ReactNode;
  containerClassName?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (item: T) => string | number;
  renderMobileCard: (item: T) => ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: ReactNode;
  emptyColSpan?: number;
  children?: ReactNode;
}

const alignClass: Record<"left" | "center" | "right", string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function DataTable<T>({
  title,
  subtitle,
  headerAction,
  headerLeft,
  containerClassName,
  columns,
  data,
  rowKey,
  renderMobileCard,
  emptyTitle = "Belum ada data",
  emptyDescription = "Data yang ditambahkan akan muncul di sini.",
  emptyIcon,
  emptyColSpan,
  children,
}: DataTableProps<T>) {
  const [hoveredKey, setHoveredKey] = useState<string | number | null>(null);
  const isEmpty = data.length === 0;
  const hasHeader = !!(headerLeft || title || headerAction);

  return (
    <div
      className={
        containerClassName ??
        "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6"
      }
    >
      {hasHeader && (
        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
          {headerLeft ?? (
            <div>
              {title && (
                <h2 className="text-base font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          )}
          {headerAction && (
            <div className="self-start sm:self-auto">{headerAction}</div>
          )}
        </div>
      )}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 first:px-5 py-3 text-[11px] font-semibold uppercase
                    tracking-wider text-gray-400 whitespace-nowrap
                    ${alignClass[col.align ?? "left"]} ${col.headerClassName ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td
                  colSpan={emptyColSpan ?? columns.length}
                  className="px-5 py-16 text-center"
                >
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    icon={emptyIcon}
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const key = rowKey(item);
                return (
                  <tr
                    key={key}
                    onMouseEnter={() => setHoveredKey(key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    className={`border-b border-gray-50 last:border-0 transition-colors duration-100
                      ${hoveredKey === key ? "bg-gray-50/70" : "bg-white"}`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 first:px-5 py-4 whitespace-nowrap
                          ${alignClass[col.align ?? "left"]} ${col.cellClassName ?? ""}`}
                      >
                        {col.render(item)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100">
        {isEmpty ? (
          <div className="px-5 py-16 text-center">
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
              icon={emptyIcon}
            />
          </div>
        ) : (
          data.map((item) => (
            <div
              key={rowKey(item)}
              className="px-5 py-4 hover:bg-gray-50/70 transition-colors duration-100"
            >
              {renderMobileCard(item)}
            </div>
          ))
        )}
      </div>

      {!isEmpty && children && (
        <div className="px-5 sm:px-6 py-3.5 bg-gray-50/50 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
        {icon ?? <CalendarDays size={18} className="text-gray-400" />}
      </div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      {description && <p className="text-xs text-gray-400">{description}</p>}
    </div>
  );
}
