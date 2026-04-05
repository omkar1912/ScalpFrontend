"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import {
  Settings,
  Image,
  Globe,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Upload,
} from "lucide-react";

interface Banner {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  enabled: boolean;
}

interface Sector {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  isActive: boolean;
  order: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

interface SettingsData {
  siteName: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  banners: {
    hero: Banner;
    secondary: Banner;
    cta: Banner;
  };
  sectors: Sector[];
}

const defaultSettings: SettingsData = {
  siteName: "ScrapVault",
  logo: "",
  favicon: "",
  contactEmail: "support@scrapvault.com",
  contactPhone: "",
  address: "",
  socialLinks: {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  },
  banners: {
    hero: {
      title: "",
      subtitle: "",
      image: "",
      ctaText: "",
      ctaLink: "",
      enabled: true,
    },
    secondary: {
      title: "",
      image: "",
      link: "",
      enabled: true,
    },
    cta: {
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      enabled: true,
    },
  },
  sectors: [],
};

export default function SiteSettings() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "banners" | "sectors" | "seo">("general");
  const [keywordInput, setKeywordInput] = useState("");
  const [newSector, setNewSector] = useState<Sector | null>(null);
  const [showAddSector, setShowAddSector] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response: any = await api.get("/settings");
      const data = response.data || response;
      setSettings({
        ...defaultSettings,
        ...data,
        banners: { ...defaultSettings.banners, ...data.banners },
        socialLinks: { ...defaultSettings.socialLinks, ...data.socialLinks },
        seo: { ...defaultSettings.seo, ...data.seo },
        sectors: data.sectors || [],
      });
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put("/settings", settings);
      alert("Settings saved successfully!");
    } catch (err: any) {
      console.error("Failed to save settings:", err);
      alert(err.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const updateBanner = (type: "hero" | "secondary" | "cta", field: string, value: any) => {
    setSettings({
      ...settings,
      banners: {
        ...settings.banners,
        [type]: {
          ...settings.banners[type],
          [field]: value,
        },
      },
    });
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !settings.seo.keywords.includes(keywordInput.trim())) {
      setSettings({
        ...settings,
        seo: {
          ...settings.seo,
          keywords: [...settings.seo.keywords, keywordInput.trim()],
        },
      });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setSettings({
      ...settings,
      seo: {
        ...settings.seo,
        keywords: settings.seo.keywords.filter((k) => k !== keyword),
      },
    });
  };

  const handleAddSector = () => {
    if (!newSector) return;
    const sectorWithSlug = {
      ...newSector,
      slug: newSector.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-"),
    };
    setSettings({
      ...settings,
      sectors: [...settings.sectors, sectorWithSlug],
    });
    setNewSector(null);
    setShowAddSector(false);
  };

  const removeSector = (index: number) => {
    setSettings({
      ...settings,
      sectors: settings.sectors.filter((_, i) => i !== index),
    });
  };

  const moveSector = (index: number, direction: "up" | "down") => {
    const newSectors = [...settings.sectors];
    if (direction === "up" && index > 0) {
      [newSectors[index], newSectors[index - 1]] = [newSectors[index - 1], newSectors[index]];
    } else if (direction === "down" && index < newSectors.length - 1) {
      [newSectors[index], newSectors[index + 1]] = [newSectors[index + 1], newSectors[index]];
    }
    setSettings({ ...settings, sectors: newSectors });
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "banners", label: "Banners", icon: Image },
    { id: "sectors", label: "Sectors", icon: Globe },
    { id: "seo", label: "SEO", icon: Globe },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage site configuration, banners, and sectors
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="border-b border-gray-100">
          <div className="flex gap-1 p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={settings.logo}
                    onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Favicon URL
                  </label>
                  <input
                    type="url"
                    value={settings.favicon}
                    onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["facebook", "twitter", "linkedin", "instagram", "youtube", "whatsapp"].map(
                    (social) => (
                      <div key={social}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {social}
                        </label>
                        <input
                          type="url"
                          value={settings.socialLinks[social as keyof typeof settings.socialLinks] || ""}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              socialLinks: {
                                ...settings.socialLinks,
                                [social]: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder={`https://${social}.com/...`}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "banners" && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Hero Banner</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.banners.hero.enabled}
                      onChange={(e) => updateBanner("hero", "enabled", e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Enabled</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={settings.banners.hero.title}
                    onChange={(e) => updateBanner("hero", "title", e.target.value)}
                    placeholder="Hero Title"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="text"
                    value={settings.banners.hero.subtitle}
                    onChange={(e) => updateBanner("hero", "subtitle", e.target.value)}
                    placeholder="Subtitle"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="url"
                    value={settings.banners.hero.image}
                    onChange={(e) => updateBanner("hero", "image", e.target.value)}
                    placeholder="Image URL"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="text"
                    value={settings.banners.hero.ctaText}
                    onChange={(e) => updateBanner("hero", "ctaText", e.target.value)}
                    placeholder="CTA Button Text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="text"
                    value={settings.banners.hero.ctaLink}
                    onChange={(e) => updateBanner("hero", "ctaLink", e.target.value)}
                    placeholder="CTA Link"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Secondary Banner</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.banners.secondary.enabled}
                      onChange={(e) => updateBanner("secondary", "enabled", e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Enabled</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={settings.banners.secondary.title}
                    onChange={(e) => updateBanner("secondary", "title", e.target.value)}
                    placeholder="Title"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="url"
                    value={settings.banners.secondary.image}
                    onChange={(e) => updateBanner("secondary", "image", e.target.value)}
                    placeholder="Image URL"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="text"
                    value={settings.banners.secondary.link}
                    onChange={(e) => updateBanner("secondary", "link", e.target.value)}
                    placeholder="Link"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">CTA Banner</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.banners.cta.enabled}
                      onChange={(e) => updateBanner("cta", "enabled", e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Enabled</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={settings.banners.cta.title}
                    onChange={(e) => updateBanner("cta", "title", e.target.value)}
                    placeholder="Title"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="text"
                    value={settings.banners.cta.subtitle}
                    onChange={(e) => updateBanner("cta", "subtitle", e.target.value)}
                    placeholder="Subtitle"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="text"
                    value={settings.banners.cta.buttonText}
                    onChange={(e) => updateBanner("cta", "buttonText", e.target.value)}
                    placeholder="Button Text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <input
                    type="text"
                    value={settings.banners.cta.buttonLink}
                    onChange={(e) => updateBanner("cta", "buttonLink", e.target.value)}
                    placeholder="Button Link"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "sectors" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Sectors</h3>
                <button
                  onClick={() => {
                    setNewSector({
                      name: "",
                      slug: "",
                      description: "",
                      icon: "",
                      image: "",
                      isActive: true,
                      order: settings.sectors.length,
                      seo: { metaTitle: "", metaDescription: "", keywords: [] },
                    });
                    setShowAddSector(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Sector
                </button>
              </div>

              {settings.sectors.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No sectors configured. Add a sector to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {settings.sectors.map((sector, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl"
                    >
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveSector(index, "up")}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSector(index, "down")}
                          disabled={index === settings.sectors.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{sector.name}</span>
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              sector.isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-gray-100 text-gray-500"
                            )}
                          >
                            {sector.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">{sector.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const updated = [...settings.sectors];
                            updated[index] = { ...sector, isActive: !sector.isActive };
                            setSettings({ ...settings, sectors: updated });
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          {sector.isActive ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => removeSector(index)}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddSector && newSector && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                      <h2 className="text-xl font-bold text-gray-900">Add Sector</h2>
                      <button
                        onClick={() => {
                          setShowAddSector(false);
                          setNewSector(null);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sector Name *
                        </label>
                        <input
                          type="text"
                          value={newSector.name}
                          onChange={(e) =>
                            setNewSector({ ...newSector, name: e.target.value })
                          }
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder="e.g., Metal Recycling"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={newSector.description}
                          onChange={(e) =>
                            setNewSector({ ...newSector, description: e.target.value })
                          }
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder="Brief description of the sector"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Icon
                          </label>
                          <input
                            type="text"
                            value={newSector.icon}
                            onChange={(e) =>
                              setNewSector({ ...newSector, icon: e.target.value })
                            }
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            placeholder="Icon class or URL"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                          </label>
                          <input
                            type="url"
                            value={newSector.image}
                            onChange={(e) =>
                              setNewSector({ ...newSector, image: e.target.value })
                            }
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newSector.isActive}
                          onChange={(e) =>
                            setNewSector({ ...newSector, isActive: e.target.checked })
                          }
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Active</span>
                      </label>
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          onClick={() => {
                            setShowAddSector(false);
                            setNewSector(null);
                          }}
                          className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddSector}
                          disabled={!newSector.name}
                          className="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium disabled:opacity-50"
                        >
                          Add Sector
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={settings.seo.metaTitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, metaTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="Site SEO title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={settings.seo.metaDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, metaDescription: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="Site SEO description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keywords
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {settings.seo.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded-lg"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    className="flex-grow px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    placeholder="Add keyword and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}