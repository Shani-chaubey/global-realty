"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";

const isImageUrl = (url) =>
  /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(url || "") || String(url || "").includes("firebasestorage.googleapis.com");

/**
 * @param {"api" | "firebase"} backend - Use `firebase` for team agents & career CMS (same bucket as admin dashboard). Default `api` uses /api/upload (Cloudinary).
 */
export default function ImageUploader({
  value,
  onChange,
  folder = "proty",
  label = "Upload Image",
  backend = "api",
  placeholder = "…or paste image URL",
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localPreview, setLocalPreview] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    return () => {
      if (localPreview.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const previewSrc = useMemo(() => localPreview || value || "", [localPreview, value]);

  const uploadApi = async (file) => {
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

  const uploadFirebase = async (file) => {
    if (localPreview.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    if (file.type.startsWith("image/")) {
      setLocalPreview(URL.createObjectURL(file));
    } else {
      setLocalPreview("");
    }
    setUploading(true);
    setProgress(0);
    try {
      const safeName = file.name.replace(/\s+/g, "-");
      const objectPath = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
      const storageRef = ref(storage, objectPath);
      const task = uploadBytesResumable(storageRef, file);
      const downloadURL = await new Promise((resolve, reject) => {
        task.on(
          "state_changed",
          (s) => setProgress(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
          reject,
          async () => resolve(await getDownloadURL(task.snapshot.ref))
        );
      });
      onChange(downloadURL);
      setLocalPreview("");
      toast.success("Uploaded to Firebase");
    } catch (err) {
      console.error(err);
      toast.error("Firebase upload failed");
      setLocalPreview("");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (backend === "firebase") await uploadFirebase(file);
    else await uploadApi(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (backend === "firebase") uploadFirebase(file);
      else uploadApi(file);
    }
  };

  if (backend === "api") {
    return (
      <div>
        <input ref={fileRef} type="file" accept="image/*" onChange={onPick} style={{ display: "none" }} />
        <div className="imgup-drop">
          {value ? (
            <div className="imgup-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Uploaded" />
              <div className="imgup-controls">
                <button type="button" onClick={() => fileRef.current?.click()} className="imgup-btn imgup-btn--change" disabled={uploading}>
                  Change
                </button>
                <button type="button" onClick={() => onChange("")} className="imgup-btn imgup-btn--remove">
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="imgup-trigger">
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

  /* ─── Firebase: preview when we have a URL or local blob ─── */
  if (previewSrc && !uploading && isImageUrl(previewSrc)) {
    return (
      <div className="imgup-drop">
        <div className="imgup-preview imgup-preview--firebase">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewSrc} alt="" />
          <div className="imgup-controls">
            <button type="button" onClick={() => fileRef.current?.click()} className="imgup-btn imgup-btn--change">
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setLocalPreview("");
              }}
              className="imgup-btn imgup-btn--remove"
            >
              Remove
            </button>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={onPick} style={{ display: "none" }} />
        <input type="text" className="ap-input" style={{ marginTop: "0.5rem" }} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </div>
    );
  }

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" onChange={onPick} style={{ display: "none" }} />
      <div
        className={`imgup-firebase-zone ${dragOver ? "imgup-firebase-zone--active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !uploading && fileRef.current?.click()}
        role="presentation"
      >
        {uploading ? (
          <div className="imgup-firebase-progress">
            <p className="imgup-firebase-progress__label">Uploading… {progress}%</p>
            <div className="imgup-firebase-progress__bar">
              <div className="imgup-firebase-progress__fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <>
            <svg className="imgup-firebase-zone__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="imgup-firebase-zone__title">{label}</span>
            <span className="imgup-firebase-zone__hint">Firebase Storage · drop, click, or paste URL below</span>
          </>
        )}
      </div>
      <input type="text" className="ap-input" style={{ marginTop: "0.5rem" }} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
