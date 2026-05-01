import React from "react";
import Image from "next/image";

const iconByType = (type = "") => {
  const t = type.toLowerCase();
  if (t.includes("pdf")) return "/images/items/download-1.png";
  if (t.includes("doc") || t.includes("xls") || t.includes("ppt") || t.includes("txt")) return "/images/items/download-2.png";
  return "/images/items/download-1.png";
};

export default function Attachments({ attachments = [] }) {
  const docs = attachments.filter((a) => a?.url);
  if (!docs.length) return null;

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">File Attachments</div>
      <div className="row">
        {docs.map((att, i) => (
          <div className="col-sm-6" key={`${att.url}-${i}`}>
            <a href={att.url} target="_blank" rel="noreferrer" className="attachments-item">
              <div className="box-icon w-60">
                <Image alt="file" src={iconByType(att.fileType)} width={80} height={80} />
              </div>
              <span>{att.name || `Attachment ${i + 1}`}</span>
              <i className="icon icon-DownloadSimple" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
