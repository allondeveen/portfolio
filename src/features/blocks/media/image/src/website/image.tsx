import clsx from "clsx";

import type { Image } from "./data";

export type ImageProps = Image;

export function Image({ kind, image }: ImageProps) {
  if (image === undefined || image === null) {
    return <></>;
  }
  return (
    <picture className={clsx(kind)}>
      {image.sizes.map((value) => (
        <source
          key={`${value.height}-${value.width}`}
          srcSet={value.url}
          width={value.width}
          height={value.height}
          media={`(min-width: ${value.width}px)`}
        />
      ))}
      <img src={image.url} alt={image.alt} height={image.height} width={image.width} />
    </picture>
  );
}
