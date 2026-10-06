"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import EditorToolbar from "./EditorToolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BlogEditor({ initialPost }: { initialPost: any }) {
  const router = useRouter();

  // Basic info
  const [title, setTitle] = useState(initialPost.title || "");
  const [slug, setSlug] = useState(initialPost.slug || "");
  const [status, setStatus] = useState(initialPost.status || "Draft");
  const [coverImage, setCoverImage] = useState(initialPost.coverImage || "");
  const [excerpt, setExcerpt] = useState(initialPost.excerpt || "");
  const [body, setBody] = useState(initialPost.body || "");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: body,
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
  });

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState(initialPost.metaTitle || "");
  const [metaKeywords, setMetaKeywords] = useState(initialPost.metaKeywords || "");
  const [metaDescription, setMetaDescription] = useState(initialPost.metaDescription || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialPost.canonicalUrl || "");
  const [ogTitle, setOgTitle] = useState(initialPost.ogTitle || "");
  const [ogDescription, setOgDescription] = useState(initialPost.ogDescription || "");
  const [ogImage, setOgImage] = useState(initialPost.ogImage || "");
  const [robots, setRobots] = useState(initialPost.robots || "");
  const [structuredData, setStructuredData] = useState(initialPost.structuredData || "");

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/blog/${initialPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, slug, status, coverImage, excerpt, body,
          metaTitle, metaKeywords, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImage, robots, structuredData
        })
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Post saved successfully!");
    } catch (err) {
      alert("Error saving post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blog/${initialPost.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/blog");
    } catch (err) {
      alert("Error deleting post");
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="A short summary of the post"
              />
            </div>
            {/* <div className="space-y-2">
              <Label>Body Content (HTML/Text)</Label>
              <textarea 
                className="flex min-h-[400px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                value={body} 
                onChange={e => setBody(e.target.value)} 
                placeholder="Write your post content here..."
              />
            </div> */}

            <div className="border rounded-lg overflow-hidden bg-white">
              <EditorToolbar editor={editor} />

              <EditorContent
                editor={editor}
                className="min-h-[500px] p-5 focus:outline-none"
              />
            </div>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input placeholder="Leave blank to use post title" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Meta Keyword</Label>
              <Input placeholder="Leave blank to use page Keyword" value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                value={metaDescription}
                onChange={e => setMetaDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Canonical URL</Label>
              <Input placeholder="https://www.example.com/blog/..." value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Custom JSON-LD / Scripts</Label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-mono ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                value={structuredData}
                onChange={e => setStructuredData(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <Button onClick={handleSave} disabled={isSaving || isDeleting} className="w-full">
              {isSaving ? "Saving..." : "Save Post"}
            </Button>
            <Button onClick={handleDelete} disabled={isSaving || isDeleting} variant="destructive" className="w-full mt-2">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={slug} onChange={e => setSlug(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Cover Image URL</Label>
              <Input value={coverImage} onChange={e => setCoverImage(e.target.value)} />
              {coverImage && (
                <div className="mt-2 relative w-full h-32 bg-slate-100 rounded overflow-hidden">
                  <img src={coverImage} alt="Cover Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
