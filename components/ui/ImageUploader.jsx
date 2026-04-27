"use client";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function ImageUploader({ value, onChange, folder = "proty", label = "Upload Image" }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("File too large. Max 5MB.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        onChange(data.data.url);
        toast.success("Image uploaded");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
      <div className="imgup-drop">
        {value ? (
          <div className="imgup-preview">
            <img src={value} alt="Uploaded" />
            <div className="imgup-controls">
              <button type="button" onClick={() => fileRef.current.click()} className="imgup-btn imgup-btn--change" disabled={uploading}>
                Change
              </button>
              <button type="button" onClick={() => onChange("")} className="imgup-btn imgup-btn--remove">
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => fileRef.current.click()} disabled={uploading} className="imgup-trigger">
            {uploading ? (
              <span className="imgup-trigger__text">Uploading...</span>
            ) : (
              <>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="imgup-trigger__text">{label}</span>
                <span className="imgup-trigger__hint">PNG, JPG up to 5MB</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
