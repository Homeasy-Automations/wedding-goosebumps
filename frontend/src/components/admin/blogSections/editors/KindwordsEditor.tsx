"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MediaLibrary from "@/components/media/MediaLibrary";

interface KindwordsEditorProps {
  blogId: string;
}

export default function KindwordsEditor({ blogId }: KindwordsEditorProps) {
  const [openMedia, setOpenMedia] = useState(false);
  const [openMediaBig, setOpenMediaBig] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [kindWords, setKindwords] = useState({
    heading: "",
    subheading: "",
    paragraph: "",
    smallImage: "",
    bigImage: "",
  });
    const SECTION_NAME = "kindWords";
     useEffect(() => {
       const loadKindwords = async () => {
         try {
           const res = await fetch(`/api/blog-sections?blogId=${blogId}&section=${SECTION_NAME}`);

           const data = await res.json();

           if (data.success && data.data) {
             setKindwords({
               heading: data.data.content.heading || "",
               subheading: data.data.content.subheading || "",
               paragraph: data.data.content.paragraph || "",
               smallImage: data.data.content.smallImage || "",
               bigImage: data.data.content.bigImage || "",
             });
           }
         } catch (err) {
           console.error(err);
         }
       };

       loadKindwords();
     }, [blogId]);

  const saveKindwords = async () => {
    try {
      setIsSaving(true);

      const res = await fetch("/api/blog-sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          section: SECTION_NAME,
          content: kindWords,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to save kindWords section.");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Kindwords Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Heading</Label>

            <Input
              value={kindWords.heading}
              onChange={(e) =>
                setKindwords({
                  ...kindWords,
                  heading: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Sub Heading</Label>

            <Input
              value={kindWords.subheading}
              onChange={(e) =>
                setKindwords({
                  ...kindWords,
                  subheading: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Paragraph</Label>

            <textarea
              className="min-h-[180px] w-full rounded-md border border-slate-200 px-3 py-2"
              value={kindWords.paragraph}
              onChange={(e) =>
                setKindwords({
                  ...kindWords,
                  paragraph: e.target.value,
                })
              }
            />
          </div>

          {/* Small Image */}
          <p className="text-xs text-red-500">
            Recommended Size: 1500 × 2000 px (Portrait Only) Upload portrait images only. Landscape
            images may be cropped.
          </p>
          <div className="space-y-2">
            <Label>Small Image</Label>

            <div className="flex gap-2">
              <Input value={kindWords.smallImage} readOnly placeholder="Select Small Image" />

              <button
                type="button"
                onClick={() => setOpenMedia(true)}
                className="rounded-md bg-black px-4 text-white transition hover:bg-gray-800"
              >
                Browse
              </button>
              {/* <Button
                type="button"
                onClick={saveKindwords}
                disabled={isSaving}
                className="bg-yellow-500 text-white hover:bg-blue-600"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button> */}
            </div>
          </div>
          {/* Preview */}
          {kindWords.smallImage && (
            <div className="relative h-56 w-full overflow-hidden rounded-lg border">
              <img
                src={kindWords.smallImage}
                alt="Hero Preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Big Image */}
          <div className="space-y-2">
            <Label>Large Image</Label>

            <div className="flex gap-2">
              <Input value={kindWords.bigImage} readOnly placeholder="Select Large Image" />

              <button
                type="button"
                onClick={() => setOpenMediaBig(true)}
                className="rounded-md bg-black px-4 text-white transition hover:bg-gray-800"
              >
                Browse
              </button>
            </div>
          </div>
          {/* Preview */}
          {kindWords.bigImage && (
            <div className="relative h-56 w-full overflow-hidden rounded-lg border">
              <img
                src={kindWords.bigImage}
                alt="Kindwords Preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <Button
              type="button"
              onClick={saveKindwords}
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
          setKindwords({
            ...kindWords,
            smallImage: url,
          });

          setOpenMedia(false);
        }}
      />
      <MediaLibrary
        open={openMediaBig}
        folder="blog"
        onClose={() => setOpenMediaBig(false)}
        onSelect={(url) => {
          setKindwords({
            ...kindWords,
            bigImage: url,
          });

          setOpenMediaBig(false);
        }}
      />
    </>
  );
}
