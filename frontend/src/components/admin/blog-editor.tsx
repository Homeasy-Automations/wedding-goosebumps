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
import BlogHeroEditor from "./blogSections/editors/BlogHeroEditor";
import ServiceEditor from "./blogSections/editors/ServiceEditor";
import KindwordsEditor from "./blogSections/editors/KindwordsEditor";
import SeoEditor from "./blogSections/editors/SeoEditor";
import BlogJournalEditor from "./blogSections/editors/BlogJournalEditor";

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

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/blog/${initialPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          status,
          coverImage,
          excerpt,
          body,
        }),
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

  const triggerClass = `
  relative
  px-6
  py-3
  text-sm
  font-serif
  font-medium
  uppercase
  tracking-widest
  text-slate-400
  bg-transparent
  rounded-none
  shadow-none
  transition-colors
  duration-300

  hover:text-slate-700

  data-[state=active]:text-[#E74694]
  data-[state=active]:bg-transparent
  data-[state=active]:shadow-none

  after:block
  after:content-['']
  after:h-[2px]
  after:w-8
  after:mx-auto
  after:bg-[#E74694]
  after:mt-1
  after:scale-x-0
  after:transition-transform
  data-[state=active]:after:scale-x-100
`;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="mb-8 flex w-full justify-start gap-2 rounded-none border-b border-slate-200 bg-transparent p-0">
            {" "}
            <TabsTrigger value="hero" className={triggerClass}>
              Hero
            </TabsTrigger>
            <TabsTrigger value="journal" className={triggerClass}>
              Journal
            </TabsTrigger>
            <TabsTrigger value="services" className={triggerClass}>
              Services
            </TabsTrigger>
            <TabsTrigger value="kindwords" className={triggerClass}>
              Kindwords
            </TabsTrigger>
            <TabsTrigger value="seo" className={triggerClass}>
              SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <BlogHeroEditor blogId={initialPost.id} initialTitle={title} />
          </TabsContent>

          <TabsContent value="journal">
            <BlogJournalEditor blogId={initialPost.id} />
          </TabsContent>

          <TabsContent value="services">
            <ServiceEditor blogId={initialPost.id} />
          </TabsContent>

          <TabsContent value="kindwords">
            <KindwordsEditor blogId={initialPost.id} />
          </TabsContent>
          <TabsContent value="seo">
            <TabsContent value="seo">
              <SeoEditor blogId={initialPost.id} />
            </TabsContent>
          </TabsContent>
        </Tabs>
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
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <Button onClick={handleSave} disabled={isSaving || isDeleting} className="w-full">
              {isSaving ? "Saving..." : "Save Post"}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isSaving || isDeleting}
              variant="destructive"
              className="mt-2 w-full"
            >
              <Trash2 className="mr-2 h-4 w-4" />
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
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
