"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const FALLBACK_IMAGES = [
  "/images/section/property-detail-3.jpg",
  "/images/section/property-detail-4.jpg",
  "/images/section/property-detail-5.jpg",
];

export default function Slider1({ images = [], title = "Property" }) {
  const displayImages =
    images?.length > 0
      ? images.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
      : FALLBACK_IMAGES.map((url) => ({ url, alt: title }));

  const primaryImg = displayImages[0];
  const sideImgs = displayImages.slice(1, 5);

  return (
    <section id="gallery-swiper-started" className="section-property-image">
      <div className="tf-container">
        <Gallery>
          <div className="row">
            <div className="col-12">
              <div className="wrap-image">
                <div className="image img-1">
                  <Item
                    original={primaryImg.url || FALLBACK_IMAGES[0]}
                    thumbnail={primaryImg.url || FALLBACK_IMAGES[0]}
                    width={1095}
                    height={771}
                  >
                    {({ ref, open }) => (
                      <a
                        onClick={open}
                        className="image-wrap relative d-block cursor-pointer"
                      >
                        <Image
                          ref={ref}
                          alt={primaryImg.alt || title}
                          src={primaryImg.url || FALLBACK_IMAGES[0]}
                          width={1095}
                          height={771}
                          className="w-full object-cover"
                          priority
                        />
                      </a>
                    )}
                  </Item>
                  {displayImages.length > 1 && (
                    <div className="tag-photos">
                      <span>{displayImages.length} Photos</span>
                    </div>
                  )}
                </div>

                {sideImgs.length > 0 && (
                  <div className="image-side">
                    {sideImgs.map((img, i) => (
                      <div key={i} className="image img-side">
                        <Item
                          original={img.url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                          thumbnail={img.url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                          width={540}
                          height={380}
                        >
                          {({ ref, open }) => (
                            <a
                              onClick={open}
                              className="image-wrap relative d-block cursor-pointer"
                            >
                              <Image
                                ref={ref}
                                alt={img.alt || `${title} ${i + 2}`}
                                src={img.url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                                width={540}
                                height={380}
                                className="w-full object-cover"
                              />
                            </a>
                          )}
                        </Item>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hidden items for remaining images */}
          {displayImages.slice(5).map((img, i) => (
            <Item
              key={i + 5}
              original={img.url}
              thumbnail={img.url}
              width={1095}
              height={771}
            >
              {({ ref }) => <span ref={ref} style={{ display: "none" }} />}
            </Item>
          ))}
        </Gallery>
      </div>
    </section>
  );
}
