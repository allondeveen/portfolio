import { ArrowUpRight, ChevronRight } from "lucide-react";

import { Logo } from "../logo/logo";
import { GithubIcon } from "./brand/GithubIcon";
import { LinkedinIcon } from "./brand/LinkedInIcon";
import { ReactIcon } from "./brand/ReactIcon";
import { ReactRouterIcon } from "./brand/ReactRouterIcon";
import { TypeScriptIcon } from "./brand/TypeScriptIcon";

import type { IconName } from "./collect";
import type { IconProps } from "./iconProps";

export type IconComponentProps = IconProps & {
  name: IconName;
};

export function Icon({ name, ...props }: IconComponentProps) {
  switch (name) {
    case "arrow-up-right":
      return <ArrowUpRight aria-hidden="true" {...props} />;
    case "chevron-right":
      return <ChevronRight aria-hidden="true" {...props} />;
    case "logo":
      return <Logo {...props} />;
    case "github":
      return <GithubIcon {...props} />;
    case "linkedin":
      return <LinkedinIcon {...props} />;
    case "react":
      return <ReactIcon {...props} />;
    case "react-router":
      return <ReactRouterIcon {...props} />;
    case "typescript":
      return <TypeScriptIcon {...props} />;
    default:
      return <></>;
  }
}
