import { Logo } from "../logo/logo";
import { GithubIcon } from "./brand/GithubIcon";
import { LinkedinIcon } from "./brand/LinkedInIcon";

import type { IconName } from "./collect";
import type { IconProps } from "./iconProps";

export type IconComponentProps = IconProps & {
  name: IconName;
};

export function Icon({ name, ...props }: IconComponentProps) {
  switch (name) {
    case "github":
      return <GithubIcon {...props} />;
    case "linkedin":
      return <LinkedinIcon {...props} />;
    case "logo":
      return <Logo {...props} />;
    default:
      return <></>;
  }
}
