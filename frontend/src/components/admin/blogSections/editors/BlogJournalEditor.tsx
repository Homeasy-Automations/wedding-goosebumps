"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MediaLibrary from "@/components/media/MediaLibrary";

interface BlogJournalEditorProps {
  blogId: string;
}

export default function BlogJournalEditor({ blogId }: BlogJournalEditorProps) {
  const [heading, setHeading] = useState("A Session Made for Two");
  const [paragraph, setParagraph] = useState(
    "Pre Wedding Photoshoot Capture the Chemistry Before the Big Day Your pre-wedding photoshoot is the perfect chance to pause, reflect, and celebrate your journey before tying the knot. At Goos It is the one afternoon on the calendar that belongs only to the couple."
  );

  const [authorName, setAuthorName] = useState("Ali Waris Khan");

  const [authorRole, setAuthorRole] = useState("Founder & Creative Director");

  const [authorImage, setAuthorImage] = useState("/about-page/slide2/Photo.jpg");
  const [openAuthorMedia, setOpenAuthorMedia] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

 useEffect(() => {
   const loadJournal = async () => {
     try {
       const res = await fetch(`/api/blog-sections?blogId=${blogId}&section=journal`);

       const data = await res.json();

       if (data.success && data.data) {
         setHeading(data.data.content.heading || "A Session Made for Two");

         setParagraph(
           data.data.content.paragraph ||
             "Pre Wedding Photoshoot Capture the Chemistry Before the Big Day..."
         );

         setAuthorName(data.data.content.authorName || "Ali Waris Khan");

         setAuthorRole(data.data.content.authorRole || "Founder & Creative Director");

         setAuthorImage(data.data.content.authorImage || "/about-page/slide2/Photo.jpg");
       }
     } catch (err) {
       console.error(err);
     } finally {
       setLoading(false);
     }
   };

   loadJournal();
 }, [blogId]);

 async function handleSave() {
   try {
     setSaving(true);

     const res = await fetch("/api/blog-sections", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         blogId,
         section: "journal",
         content: {
           heading,
           paragraph,
           authorName,
           authorRole,
           authorImage,
         },
       }),
     });

     const data = await res.json();

     if (!res.ok) {
       throw new Error(data.message);
     }

     alert(data.message);
   } catch (error) {
     console.error(error);
     alert("Failed to save Journal section.");
   } finally {
     setSaving(false);
   }
 }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Journal Section</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={heading} onChange={(e) => setHeading(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Paragraph</Label>

            <textarea
              className="min-h-[140px] w-full rounded-md border border-slate-200 px-3 py-2"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Author Name</Label>
            <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Author Role</Label>
            <Input value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Author Image</Label>

            <div className="flex gap-2">
              <Input value={authorImage} readOnly placeholder="Select Author Image" />

              <button
                type="button"
                onClick={() => setOpenAuthorMedia(true)}
                className="rounded-md bg-black px-4 text-white transition hover:bg-gray-800"
              >
                Browse
              </button>
            </div>
          </div>

          <p className="text-xs text-red-500">
            ⚠ Please upload only portrait images for the Author.
          </p>

          {authorImage && (
            <div className="relative h-72 w-56 overflow-hidden rounded-lg border">
              <img src={authorImage} alt="Author Preview" className="h-full w-full object-cover" />
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-yellow-500 hover:bg-yellow-600"
          >
            {saving ? "Saving..." : "Save Journal Section"}
          </Button>
        </CardContent>
      </Card>
      <MediaLibrary
        open={openAuthorMedia}
        folder="blog"
        onClose={() => setOpenAuthorMedia(false)}
        onSelect={(url) => {
          setAuthorImage(url);
          setOpenAuthorMedia(false);
        }}
      />
    </>
  );
}
