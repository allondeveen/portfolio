"use client";

import clsx from "clsx";

import type { EmbeddedVideo } from "./data";

import "./style.css";

export type EmbeddedVideoProps = EmbeddedVideo;

export function EmbeddedVideo({ coverImage, videoUrl }: EmbeddedVideoProps) {
  if (!coverImage) {
    return <iframe className={clsx("embedded-video")} src={videoUrl} />;
  }
  const playbackUrl = new URL(videoUrl);
  playbackUrl.searchParams.set("autoplay", "1");
  return (
    <iframe
      className={clsx("embedded-video")}
      allow={`autoplay ${playbackUrl.origin};`}
      srcDoc={`
        <style>
          body { margin: 0; }
          a { display: block; position: relative; height: 100vh; }
          img { display: block; width: 100%; height: 100%; object-fit: cover; }
          span {
            position: absolute;
            inset: 0;
            display: grid;
            place-items: center;
            color: white;
            font: 64px sans-serif;
            text-shadow: 0 2px 8px black;
          }
        </style>
        <a
          href='${playbackUrl}'
          target='_self'
          aria-label='Play video'
        >
          <img src='${coverImage.url}' alt='${coverImage.alt}'>
          <span aria-hidden='true'>▶</span>
        </a>
      `}
    />
  );
}
