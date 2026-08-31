import { ExternalLink, Icon } from "@allondeveen-portfolio/ui";
import { clsx } from "clsx";
import { NavLink } from "react-router";

import { menuItemActive } from "./menuItem.css";

import type { Menu } from "./data";

import "./style.css";

export type MenuBlockProps = Menu;

export function Menu({ location, items, kind }: MenuBlockProps) {
  return (
    <nav
      aria-label={`${location[0].toUpperCase()}${location.slice(1)}`}
      className={clsx(kind, location)}
    >
      <ul className="inline">
        {items.map((item) => (
          <li key={item.order}>
            {item.externality == "external" ? (
              <ExternalLink href={item.location} className={item.icon !== undefined ? "icon" : ""}>
                {item.icon !== undefined && <Icon name={item.icon} />}
                {item.label}
              </ExternalLink>
            ) : (
              <NavLink
                to={item.location}
                className={({ isActive }) =>
                  isActive ? clsx(item.icon !== undefined ? "icon" : undefined, menuItemActive) : ""
                }
                end
              >
                {item.icon !== undefined && <Icon name={item.icon} />}
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
