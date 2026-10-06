"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MediaLibrary from "@/components/media/MediaLibrary";

interface ServiceEditorProps {
  blogId: string;
}

export default function ServiceEditor({ blogId }: ServiceEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [service, setService] = useState({
    heading: "",
    paragraph: "",
    image: "",
  });

  const [openMedia, setOpenMedia] = useState(false);
  useEffect(() => {
    const loadService = async () => {
      try {
        const res = await fetch(`/api/blog-sections?blogId=${blogId}&section=service`);

        const data = await res.json();

        if (data.success && data.data) {
          setService({
            heading: data.data.content.heading || "",
            paragraph: data.data.content.paragraph || "",
            image: data.data.content.image || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadService();
  }, [blogId]);

  const saveService = async () => {
    try {
      setIsSaving(true);

      const res = await fetch("/api/blog-sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          section: "service",
          content: service,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to save service section.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Service Section</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Heading</Label>

            <Input
              value={service.heading}
              onChange={(e) =>
                setService({
                  ...service,
                  heading: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Paragraph</Label>

            <textarea
              className="min-h-[180px] w-full rounded-md border border-slate-200 px-3 py-2"
              value={service.paragraph}
              onChange={(e) =>
                setService({
                  ...service,
                  paragraph: e.target.value,
                })
              }
            />
          </div>
          {/* Hero Image */}
          <div className="space-y-2">
            <Label>Service Image</Label>

            <div className="flex gap-2">
              <Input value={service.image} readOnly placeholder="Select Service Image" />

              <button
                type="button"
                onClick={() => setOpenMedia(true)}
                className="rounded-md bg-black px-4 text-white transition hover:bg-gray-800"
              >
                Browse
              </button>
            </div>
          </div>
          <p className="text-xs text-red-500">
            Recommended Size: 1500 × 2000 px (Portrait Only) Upload portrait images only.
            Landscape images may be cropped.
          </p>

          {/* Preview */}
          {service.image && (
            <div className="relative h-56 w-full overflow-hidden rounded-lg border">
              <img
                src={service.image}
                alt="Service Preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <Button
              type="button"
              onClick={saveService}
              disabled={isSaving}
              className="w-full bg-yellow-500 text-white hover:bg-yellow-600"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Media Library */}
      <MediaLibrary
        open={openMedia}
        folder="blog"
        onClose={() => setOpenMedia(false)}
        onSelect={(url) => {
          setService({
            ...service,
            image: url,
          });

          setOpenMedia(false);
        }}
      />
    </>
  );
}
