"use client";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import DataTable from "@/components/ui/DataTable";
import ImageUploader from "@/components/ui/ImageUploader";
import api from "@/lib/axios";

const EMPTY = { title: "", subtitle: "", backgroundImage: "", ctaText: "Explore Properties", ctaLink: "/properties", order: 0, isActive: true };

export default function AdminHeroSlides() {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useSWR("/cms/hero");

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (r) => { setEditing(r); setForm({ title: r.title, subtitle: r.subtitle || "", backgroundImage: r.backgroundImage || "", ctaText: r.ctaText, ctaLink: r.ctaLink, order: r.order, isActive: r.isActive }); setModal(true); };

  const handleSave = async () => {
    if (!form.title) { toast.error("Title required"); return; }
    setSaving(true);
    try {
      editing ? await api.put(`/cms/hero/${editing._id}`, form) : await api.post("/cms/hero", form);
      toast.success(editing ? "Updated" : "Created");
      mutate("/cms/hero");
      setModal(false);
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;
    await api.delete(`/cms/hero/${id}`);
    toast.success("Deleted");
    mutate("/cms/hero");
  };

  const columns = [
    { key: "order", label: "Order" },
    { key: "backgroundImage", label: "Image", render: (r) => r.backgroundImage ? <img src={r.backgroundImage} className="ap-thumb" /> : "—" },
    { key: "title", label: "Title" },
    { key: "ctaText", label: "CTA Text" },
    { key: "isActive", label: "Active", render: (r) => r.isActive ? <span className="ap-check">✓</span> : <span className="ap-cross">✗</span> },
    { key: "actions", label: "Actions", render: (r) => (
      <div className="ap-btn-row">
        <button onClick={() => openEdit(r)} className="ap-btn-edit">Edit</button>
        <button onClick={() => handleDelete(r._id)} className="ap-btn-delete">Delete</button>
      </div>
    )},
  ];

  return (
    <div className="ap-page-body">
      <div className="ap-header">
        <h1 className="ap-title">Hero Slides</h1>
        <button onClick={openAdd} className="ap-btn-primary">+ Add Slide</button>
      </div>
      <div className="admin-card" style={{ overflow: "hidden" }}>
        <DataTable columns={columns} data={data?.data} loading={isLoading} />
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? "Edit Slide" : "Add Slide"} size="lg">
        <div className="ap-form-stack">
          <div><label className="ap-label">Title *</label><input className="ap-input" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></div>
          <div><label className="ap-label">Subtitle</label><input className="ap-input" value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} /></div>
          <div><label className="ap-label">Background Image</label><ImageUploader value={form.backgroundImage} onChange={(url) => setForm((p) => ({ ...p, backgroundImage: url }))} folder="proty/hero" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div><label className="ap-label">CTA Text</label><input className="ap-input" value={form.ctaText} onChange={(e) => setForm((p) => ({ ...p, ctaText: e.target.value }))} /></div>
            <div><label className="ap-label">CTA Link</label><input className="ap-input" value={form.ctaLink} onChange={(e) => setForm((p) => ({ ...p, ctaLink: e.target.value }))} /></div>
          </div>
          <div><label className="ap-label">Order</label><input type="number" className="ap-input" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} /></div>
          <label className="ap-checkbox-row"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} /><span className="ap-checkbox-label">Active</span></label>
          <div className="ap-form-footer">
            <button onClick={() => setModal(false)} className="ap-btn-cancel">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="ap-btn-save">{saving ? "Saving..." : "Save"}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
