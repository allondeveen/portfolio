import type { IconProps } from "../iconProps";

export function ReactIcon(props: IconProps) {
  return (
    <svg viewBox="-11.5 -10.232 23 20.463" aria-hidden={true} {...props}>
      <circle r="2.05" fill="currentcolor" />
      <g fill="none" stroke="currentcolor">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}
