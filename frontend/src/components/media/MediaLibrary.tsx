"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MediaImage {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

interface MediaLibraryProps {
  open: boolean;
  folder: string;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaLibrary({ open, folder, onClose, onSelect }: MediaLibraryProps) {
  const [images, setImages] = useState<MediaImage[]>([]);
  const [selected, setSelected] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleting, setDeleting] = useState("");

  useEffect(() => {
    if (open) {
      loadImages();
    }
  }, [open]);

  async function loadImages() {
    setLoading(true);

    try {
      const res = await fetch(`/api/media?folder=${folder}`);

      const data = await res.json();

      if (data.success) {
        setImages(data.images);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(name: string) {
    if (!confirm("Delete this image?")) return;

    setDeleting(name);

    try {
      const res = await fetch("/api/media", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folder,
          name,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (selected.endsWith(name)) {
          setSelected("");
        }

        loadImages();
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeleting("");
    }
  }

  async function uploadImage(file: File) {
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        await loadImages();

        setSelected(data.url);
      }
    } catch (err) {
      console.error(err);

      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] w-[95vw] !max-w-7xl flex-col rounded-xl border bg-white p-0 shadow-2xl">
        <DialogHeader className="border-b p-6">
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between border-b p-6">
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) uploadImage(file);
            }}
          />
        </div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Loading Images...
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            No images found.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
              {images.map((img) => (
                <div
                  key={img.name}
                  onClick={() => setSelected(img.url)}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl border-4 transition-all ${
                    selected === img.url
                      ? "border-blue-600"
                      : "border-transparent hover:border-gray-300"
                  } `}
                >
                  <Image
                    src={img.url}
                    alt={img.name}
                    width={300}
                    height={300}
                    className="aspect-square w-full object-cover"
                  />
                  <button
                    type="button"
                    disabled={deleting === img.name}
                    onClick={(e) => {
                      e.stopPropagation();

                      deleteImage(img.name);
                    }}
                    className="absolute top-2 right-2 z-10 rounded-full bg-red-600 p-2 text-white opacity-0 transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deleting === img.name ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 border-t p-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            disabled={!selected}
            onClick={() => {
              onSelect(selected);

              onClose();
            }}
          >
            Insert Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
