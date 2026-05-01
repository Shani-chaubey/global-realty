import React from "react";
import Image from "next/image";

export default function VirtualTour({ url = "" }) {
  if (!url) return null;

  const isImage = /\.(jpg|jpeg|png|webp|gif|avif)(\?|$)/i.test(url);

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        360 Virtual Tour
      </div>
      <div className="image-wrap">
        {isImage ? (
          <Image
            alt="Virtual Tour"
            src={url}
            width={792}
            height={439}
            unoptimized
          />
        ) : (
          /* For non-image URLs (e.g. Matterport / iframe tours), show iframe */
          <iframe
            src={url}
            title="Virtual Tour"
            width={792}
            height={439}
            style={{ border: 0, width: "100%", borderRadius: 12 }}
            allowFullScreen
            loading="lazy"
          />
        )}
        <div className="box-icon">
          <a href={url} target="_blank" rel="noreferrer" style={{ display: "contents" }}>
            <div className="icons">
              <i className="icon-360" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
