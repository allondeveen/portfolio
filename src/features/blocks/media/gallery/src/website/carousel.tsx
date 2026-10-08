"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { CSSProperties, PropsWithChildren } from "react";

export function GalleryCarousel({ children }: PropsWithChildren) {
  const trackId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [geometry, setGeometry] = useState({
    maxOffset: 0,
    step: 0,
    bleedLeft: 0,
    bleedRight: 0,
  });

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!root || !track || !viewport) return;

    const measure = () => {
      const bounds = root.getBoundingClientRect();
      const first = track.firstElementChild?.getBoundingClientRect();
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const maxOffset = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

      setGeometry({
        maxOffset,
        step: first ? first.width + gap : 0,
        bleedLeft: Math.max(0, bounds.left),
        bleedRight: Math.max(0, document.documentElement.clientWidth - bounds.right),
      });
      setOffset(viewport.scrollLeft);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    observer.observe(track);
    observer.observe(viewport);
    for (const child of track.children) observer.observe(child);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  const move = (direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({
      left: Math.max(
        0,
        Math.min(geometry.maxOffset, viewport.scrollLeft + direction * geometry.step),
      ),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <div
      ref={rootRef}
      className="gallery"
      data-layout="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image gallery"
      style={
        {
          "--carousel-bleed-left": `${geometry.bleedLeft}px`,
          "--carousel-bleed-right": `${geometry.bleedRight}px`,
        } as CSSProperties
      }
    >
      <div
        className="gallery__carousel-viewport"
        ref={viewportRef}
        onScroll={(event) => setOffset(event.currentTarget.scrollLeft)}
      >
        <div ref={trackRef} id={trackId} className="gallery__carousel-track">
          {children}
        </div>
      </div>
      <div className="gallery__carousel-controls">
        <button
          type="button"
          aria-label="Previous images"
          aria-controls={trackId}
          disabled={offset <= 0}
          onClick={() => move(-1)}
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next images"
          aria-controls={trackId}
          disabled={offset >= geometry.maxOffset - 1}
          onClick={() => move(1)}
        >
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
