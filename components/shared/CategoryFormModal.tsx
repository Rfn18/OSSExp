"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface CategoryFormValues {
  name: string;
  description: string;
}

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  eyebrow?: string;
  namePlaceholder?: string;
  descriptionRequired?: boolean;
  initialValues?: CategoryFormValues;
  isSubmitting?: boolean;
  onSubmit: (values: CategoryFormValues) => void;
}

export default function CategoryFormModal({
  open,
  onOpenChange,
  mode,
  eyebrow,
  namePlaceholder = "Contoh: Apel Pembukaan",
  descriptionRequired = false,
  initialValues,
  isSubmitting = false,
  onSubmit,
}: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setName(initialValues?.name ?? "");
      setDescription(initialValues?.description ?? "");
      setTouched(false);
    }
  }, [open, initialValues]);

  const isNameValid = name.trim().length > 0;
  const isDescriptionValid =
    !descriptionRequired || description.trim().length > 0;
  const isFormValid = isNameValid && isDescriptionValid;

  const handleSubmit = () => {
    setTouched(true);
    if (!isFormValid) return;
    onSubmit({ name: name.trim(), description: description.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Kategori" : "Update Kategori"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {eyebrow && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {eyebrow}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nama Kategori <span className="text-red-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={namePlaceholder}
              autoFocus
            />
            {touched && !isNameValid && (
              <p className="text-xs text-red-500 mt-1.5">
                Nama kategori wajib diisi.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Deskripsi{" "}
              {descriptionRequired ? (
                <span className="text-red-500">*</span>
              ) : (
                <span className="text-gray-400 font-normal">(opsional)</span>
              )}
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tambahkan deskripsi singkat..."
              rows={3}
              className="resize-none"
            />
            {touched && !isDescriptionValid && (
              <p className="text-xs text-red-500 mt-1.5">
                Deskripsi wajib diisi untuk kategori dokumentasi.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan…" : mode === "add" ? "Tambah" : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
