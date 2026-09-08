import type { SVGProps } from "react";
import type { IconName } from "@/config/site-config";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName | "arrow" | "arrow-down" | "menu" | "check" | "bulb" | "info" };

const paths: Record<IconProps["name"], React.ReactNode> = {
  factory: <><path d="M3 21h18M5 21V9l5 3V9l5 3V5h4v16"/><path d="M8 17h1m4 0h1m4 0h1"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M18 19c0 1.1-.9 2-2 2h-3m-9-7h3v5H5a1 1 0 0 1-1-1v-4Zm16 0h-3v5h2a1 1 0 0 0 1-1v-4Z"/></>,
  ruler: <><path d="m15 3 6 6L9 21l-6-6L15 3Z"/><path d="m14 6 2 2m-5 1 2 2m-5 1 2 2m-5 1 2 2"/></>,
  spark: <><path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z"/><path d="m5 16-.7 2.3L2 19l2.3.7L5 22l.7-2.3L8 19l-2.3-.7L5 16Zm14-1-.7 2.3-2.3.7 2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15Z"/></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
  arrow: <><path d="M19 12H5m6-6-6 6 6 6"/></>,
  "arrow-down": <><path d="M12 5v14m-6-6 6 6 6-6"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  bulb: <><path d="M9 18h6m-5 3h4"/><path d="M8.2 14.4A7 7 0 1 1 15.8 14.4C14.7 15.2 14 16.5 14 18h-4c0-1.5-.7-2.8-1.8-3.6Z"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></>,
  laser: (
    <>
      <path d="M10 2h4l1 5h-6l1-5z" />
      <line x1="12" y1="7" x2="12" y2="15" strokeWidth="2" />
      <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
      <path d="m8 14-2.5-1M16 14l2.5-1M9 18.5l-2 2M15 18.5l2 2" />
      <path d="M3 21h18" strokeWidth="2" />
    </>
  ),
  wood: (
    <>
      <ellipse cx="7.5" cy="12" rx="3.5" ry="6.5" />
      <ellipse cx="7.5" cy="12" rx="1.8" ry="3.2" />
      <circle cx="7.5" cy="12" r="0.75" fill="currentColor" />
      <path d="M7.5 5.5H18a3.5 6.5 0 0 1 0 13H7.5" />
      <path d="M11 9c1.5.5 2 1.5 2 3s-.5 2.5-2 3" />
    </>
  ),
  metal: (
    <>
      <path d="M4 3h16v3.5h-4.5v11H20V21H4v-3.5h4.5v-11H4V3z" />
      <line x1="9" y1="3" x2="9" y2="6.5" />
      <line x1="15" y1="3" x2="15" y2="6.5" />
      <line x1="9" y1="17.5" x2="9" y2="21" />
      <line x1="15" y1="17.5" x2="15" y2="21" />
    </>
  ),
  tree: <><path d="M12 22v-5"/><path d="M12 2a5 5 0 0 0-4.9 6A4 4 0 0 0 4 11.5a4 4 0 0 0 3 3.9A4.5 4.5 0 0 0 12 17a4.5 4.5 0 0 0 5-1.6 4 4 0 0 0 3-3.9 4 4 0 0 0-3.1-3.5A5 5 0 0 0 12 2z"/></>,
  layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
};

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
