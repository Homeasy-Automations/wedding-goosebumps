"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PageEditor({ initialPage }: { initialPage: any }) {
  const [title, setTitle] = useState(initialPage.title || "");
  const [slug, setSlug] = useState(initialPage.slug || "");
  
  // SEO Fields
  const [metaTitle, setMetaTitle] = useState(initialPage.metaTitle || "");
  const [metaKeywords, setMetaKeywords] = useState(initialPage.metaKeywords || "");
  const [metaDescription, setMetaDescription] = useState(initialPage.metaDescription || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialPage.canonicalUrl || "");
  const [ogTitle, setOgTitle] = useState(initialPage.ogTitle || "");
  const [ogDescription, setOgDescription] = useState(initialPage.ogDescription || "");
  const [ogImage, setOgImage] = useState(initialPage.ogImage || "");
  const [robots, setRobots] = useState(initialPage.robots || "");
  const [structuredData, setStructuredData] = useState(initialPage.structuredData || ""); // Will be used for Custom SEO Scripts

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/pages/${initialPage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          slug,
          metaTitle,
          metaKeywords,
          metaDescription,
          canonicalUrl,
          ogTitle,
          ogDescription,
          ogImage,
          robots,
          structuredData
        })
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("SEO Metadata saved successfully!");
    } catch (err) {
      alert("Error saving page+++");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>SEO Meta Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input placeholder="Leave blank to use page title" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Meta Keyword</Label>
              <Input placeholder="Leave blank to use page Keyword" value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={metaDescription} 
                onChange={e => setMetaDescription(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>Canonical URL</Label>
              <Input placeholder="https://www.example.com/page" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Robots (e.g., index, follow)</Label>
              <Input placeholder="index, follow" value={robots} onChange={e => setRobots(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Graph (Social Sharing)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>OG Title</Label>
              <Input value={ogTitle} onChange={e => setOgTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>OG Description</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={ogDescription} 
                onChange={e => setOgDescription(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>OG Image URL</Label>
              <Input placeholder="https://www.example.com/image.jpg" value={ogImage} onChange={e => setOgImage(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom SEO Scripts & Structured Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Raw Scripts or JSON-LD</Label>
              <p className="text-xs text-gray-500">Paste your custom &lt;script&gt; tags, JSON-LD, or other head tags here.</p>
              <textarea 
                className="flex min-h-[150px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-mono ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={'<script type="application/ld+json">...</script>'}
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
            <CardTitle>Page Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={slug} disabled className="bg-gray-100" onChange={e => setSlug(e.target.value)} />
              <p className="text-xs text-gray-500">Slug cannot be changed for static pages.</p>
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="w-full">
              {isSaving ? "Saving..." : "Save SEO Metadata"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
