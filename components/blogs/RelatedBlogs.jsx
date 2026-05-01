"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";

export default function RelatedBlogs({ currentId, categoryId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!categoryId) {
      setPosts([]);
      return;
    }
    const url = `/api/blogs?limit=6&status=published&category=${categoryId}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        const filtered = (d.data || []).filter((p) => p._id !== String(currentId));
        setPosts(filtered.slice(0, 3));
      })
      .catch(() => {});
  }, [currentId, categoryId]);

  if (!posts.length) return null;

  return (
    <section className="section-related-posts" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <h4 className="heading">Related posts</h4>
            <Swiper
              dir="ltr"
              className="swiper style-pagination sw-layout"
              breakpoints={{
                0: { slidesPerView: 1 },
                575: { slidesPerView: 2 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 40 },
              }}
              modules={[Pagination]}
              pagination={{ el: ".spd1" }}
            >
              {posts.map((post) => (
                <SwiperSlide className="swiper-slide" key={post._id}>
                  <div className="blog-article-item style-2 hover-img">
                    <div className="image-wrap">
                      <Link href={`/blog-details/${post.slug || post._id}`}>
                        <Image
                          className="lazyload"
                          alt={post.title}
                          width={600}
                          height={396}
                          src={post.featuredImage || "/images/blog/blog-details.jpg"}
                          style={{ width: "100%", height: 220, objectFit: "cover" }}
                          unoptimized
                        />
                      </Link>
                      {post.category?.name && (
                        <div className="box-tag">
                          <div className="tag-item text-4 text_white fw-6">{post.category.name}</div>
                        </div>
                      )}
                    </div>
                    <div className="article-content">
                      <div className="time">
                        <div className="icons"><i className="icon-clock" /></div>
                        <p className="fw-5">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </p>
                      </div>
                      <h4 className="title">
                        <Link href={`/blog-details/${post.slug || post._id}`} className="line-clamp-2">
                          {post.title}
                        </Link>
                      </h4>
                      <Link href={`/blog-details/${post.slug || post._id}`} className="tf-btn-link">
                        <span>Read More</span>
                        <i className="icon-circle-arrow" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-pagination sw-pagination-layout text-center d-lg-none d-block mt-20 spd1" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
