"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SeoEditorProps {
  blogId: string;
}

export default function SeoEditor({ blogId }: SeoEditorProps) {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [robots, setRobots] = useState("");
  const [structuredData, setStructuredData] = useState("");

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing SEO data
  useEffect(() => {
    async function loadSeo() {
      try {
        const res = await fetch(`/api/blog/${blogId}`);

        if (!res.ok) throw new Error("Failed to load SEO");

        const post = await res.json();

        setMetaTitle(post.metaTitle || "");
        setMetaKeywords(post.metaKeywords || "");
        setMetaDescription(post.metaDescription || "");
        setCanonicalUrl(post.canonicalUrl || "");
        setOgTitle(post.ogTitle || "");
        setOgDescription(post.ogDescription || "");
        setOgImage(post.ogImage || "");
        setRobots(post.robots || "");
        setStructuredData(post.structuredData || "");
      } catch (err) {
        console.error(err);
        alert("Unable to load SEO data");
      } finally {
        setLoading(false);
      }
    }

    loadSeo();
  }, [blogId]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const res = await fetch(`/api/blog/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metaTitle,
          metaKeywords,
          metaDescription,
          canonicalUrl,
          ogTitle,
          ogDescription,
          ogImage,
          robots,
          structuredData,
        }),
      });

      if (!res.ok) throw new Error();

      alert("SEO Saved Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save SEO");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading SEO...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Leave blank to use post title"
          />
        </div>

        <div className="space-y-2">
          <Label>Meta Keywords</Label>
          <Input
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>

        <div className="space-y-2">
          <Label>Meta Description</Label>
          <textarea
            className="min-h-[120px] w-full rounded-md border border-slate-200 px-3 py-2"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Canonical URL</Label>
          <Input
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            placeholder="https://example.com/blog/post"
          />
        </div>

        <div className="space-y-2">
          <Label>OG Title</Label>
          <Input value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>OG Description</Label>
          <textarea
            className="min-h-[100px] w-full rounded-md border border-slate-200 px-3 py-2"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>OG Image</Label>
          <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Robots</Label>
          <Input
            value={robots}
            onChange={(e) => setRobots(e.target.value)}
            placeholder="index,follow"
          />
        </div>

        <div className="space-y-2">
          <Label>Structured Data (JSON-LD)</Label>

          <textarea
            className="min-h-[180px] w-full rounded-md border border-slate-200 px-3 py-2 font-mono text-sm"
            value={structuredData}
            onChange={(e) => setStructuredData(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-yellow-500 hover:bg-yellow-600"
        >
          {isSaving ? "Saving..." : "Save SEO"}
        </Button>
      </CardContent>
    </Card>
  );
}
