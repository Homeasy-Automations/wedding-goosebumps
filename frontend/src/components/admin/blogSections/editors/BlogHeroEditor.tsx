"use client";

import { useState, useEffect } from "react";
import MediaLibrary from "@/components/media/MediaLibrary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogHeroEditorProps {
  blogId: string;
  initialTitle: string;
}

export default function BlogHeroEditor({ blogId, initialTitle }: BlogHeroEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const loadHero = async () => {
      try {
        const res = await fetch(`/api/blog-sections?blogId=${blogId}&section=hero`);

        const data = await res.json();

        if (data.success && data.data) {
          setHero({
            category: data.data.content.category || initialTitle,
            heroImage: data.data.content.heroImage || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadHero();
  }, [blogId, initialTitle]);

  const saveHero = async () => {
    try {
      setIsSaving(true);

      const res = await fetch("/api/blog-sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          section: "hero",
          content: hero,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to save hero section.");
    } finally {
      setIsSaving(false);
    }
  };
  const [hero, setHero] = useState({
    category: initialTitle,
    heroImage: "",
  });

  const [openMedia, setOpenMedia] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>

            <Input
              placeholder="PRE-WEDDING"
              value={hero.category}
              onChange={(e) =>
                setHero({
                  ...hero,
                  category: e.target.value,
                })
              }
            />
          </div>

          {/* Hero Image */}
          <div className="space-y-2">
            <Label>Hero Image</Label>

            <div className="flex gap-2">
              <Input value={hero.heroImage} readOnly placeholder="Select Hero Image" />

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
            ⚠ Please upload only landscape (16:9) images for the Hero Banner. Portrait images may
            appear cropped.
          </p>
          {/* Preview */}
          {hero.heroImage && (
            <div className="relative h-56 w-full overflow-hidden rounded-lg border">
              <img src={hero.heroImage} alt="Hero Preview" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="space-y-2">
            <Button
              type="button"
              onClick={saveHero}
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
          setHero({
            ...hero,
            heroImage: url,
          });

          setOpenMedia(false);
        }}
      />
    </>
  );
}
