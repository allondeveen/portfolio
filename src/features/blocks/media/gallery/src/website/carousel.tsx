"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { CSSProperties, PropsWithChildren } from "react";

export function GalleryCarousel({ children }: PropsWithChildren) {
  const trackId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [geometry, setGeometry] = useState({
    maxOffset: 0,
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
      const maxOffset = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

      setGeometry({
        maxOffset,
        bleedLeft: Math.max(0, bounds.left),
        bleedRight: Math.max(0, document.documentElement.clientWidth - bounds.right),
      });
      setOffset(viewport.scrollLeft);
    };

    const finishScroll = () => {
      targetRef.current = null;
    };
    viewport.addEventListener("scrollend", finishScroll);
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    observer.observe(track);
    observer.observe(viewport);
    for (const child of track.children) observer.observe(child);
    window.addEventListener("resize", measure);

    return () => {
      viewport.removeEventListener("scrollend", finishScroll);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  const move = (direction: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const maxOffset = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const first = track.firstElementChild?.getBoundingClientRect();
    if (!first) return;
    const positions = [
      0,
      ...Array.from(track.children, (child) =>
        Math.max(0, Math.min(maxOffset, child.getBoundingClientRect().left - first.left)),
      ),
      maxOffset,
    ];
    const current = targetRef.current ?? viewport.scrollLeft;
    const target =
      direction > 0
        ? (positions.find((position) => position > current + 1) ?? maxOffset)
        : (positions.reverse().find((position) => position < current - 1) ?? 0);
    targetRef.current = target;
    setGeometry((currentGeometry) => ({ ...currentGeometry, maxOffset }));
    viewport.scrollTo({
      left: target,
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
      <div className="gallery-carousel__content">
        <div
          className="gallery__carousel-viewport"
          ref={viewportRef}
          onPointerDown={() => {
            targetRef.current = null;
          }}
          onWheel={() => {
            targetRef.current = null;
          }}
          onScroll={(event) => {
            const viewport = event.currentTarget;
            setOffset(viewport.scrollLeft);
            if (
              targetRef.current !== null &&
              Math.abs(viewport.scrollLeft - targetRef.current) < 1
            ) {
              targetRef.current = null;
            }
          }}
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
            disabled={offset <= 1}
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
    </div>
  );
}
