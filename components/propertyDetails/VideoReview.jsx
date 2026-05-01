"use client";
import Image from "next/image";
import ModalVideo from "../common/ModalVideo";
import { useState } from "react";

const extractYouTubeId = (url = "") => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/i);
  return match?.[1] || null;
};

const extractVimeoId = (url = "") => {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(\d+)/i);
  return match?.[1] || null;
};

export default function VideoReview({ videoUrl = "", posterSrc = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  if (!videoUrl) return null;

  const ytId = extractYouTubeId(videoUrl);
  const vimeoId = extractVimeoId(videoUrl);

  // Thumbnail: use YouTube's CDN if available, else generic
  const youtubeThumb = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "";
  const fallbackThumb = posterSrc || "/images/section/property-detail.jpg";
  const thumbnail = !thumbFailed && youtubeThumb ? youtubeThumb : fallbackThumb;

  // Embed URL for ModalVideo
  const embedSrc = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1`
    : vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1`
    : videoUrl;

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">Video</div>
      <div className="widget-video style-1">
        <Image
          className="lazyload"
          alt="Property Video"
          src={thumbnail}
          width={792}
          height={446}
          style={{ width: "100%", height: "auto" }}
          onError={() => setThumbFailed(true)}
          unoptimized
        />
        <a
          onClick={() => setIsOpen(true)}
          className="popup-youtube"
          style={{ cursor: "pointer" }}
        >
          <i className="icon-play" />
        </a>
      </div>
      <ModalVideo
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        src={embedSrc}
      />
    </>
  );
}
