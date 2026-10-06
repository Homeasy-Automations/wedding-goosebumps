"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SeoSettings() {
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/seo")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data || {});
        setIsLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save");
      alert("SEO Settings saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving SEO settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Global SEO Settings</h1>
      
      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Default Meta Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Meta Title</Label>
              <Input
                value={settings.defaultMetaTitle || ""}
                onChange={(e) => setSettings({ ...settings, defaultMetaTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Default Meta Keywords</Label>
              <Input
                value={settings.defaultMetaKeywords || ""}
                onChange={(e) => setSettings({ ...settings, defaultMetaKeywords: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Default Meta Description</Label>
              <Input
                value={settings.defaultMetaDesc || ""}
                onChange={(e) => setSettings({ ...settings, defaultMetaDesc: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Default OG Image URL</Label>
              <Input
                value={settings.defaultOgImage || ""}
                onChange={(e) => setSettings({ ...settings, defaultOgImage: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics & Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Google Analytics ID (GA4)</Label>
              <Input
                value={settings.gaId || ""}
                onChange={(e) => setSettings({ ...settings, gaId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Google Tag Manager ID</Label>
              <Input
                value={settings.gtmId || ""}
                onChange={(e) => setSettings({ ...settings, gtmId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Meta Pixel ID</Label>
              <Input
                value={settings.metaPixelId || ""}
                onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
