const ICON_PATHS = {
  // expense categories
  Food: "M7 3v6a2 2 0 004 0V3M9 3v18M17 21V3c-2.2 1.4-3.5 4-3.5 7 0 2 1.3 3 3.5 3",
  Travel: "M3 17v-3.5l2-5A2 2 0 016.9 7h10.2A2 2 0 0119 8.5l2 5V17zM3 13.5h18M3 17v2.5M21 17v2.5M7 15h.01M17 15h.01",
  Shopping: "M5 8h14l-1 12H6zM9 8V6.5a3 3 0 016 0V8",
  Entertainment: "M3 5h18v14H3zM7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4",
  Bills: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  Other: "M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8",

  // navigation tabs
  home: "M3 11l9-8 9 8M5 9.5V20h5v-6h4v6h5V9.5",
  cards: "M3 6h18v12H3zM3 10h18M7 15h3",
  stats: "M5 20V11M12 20V4M19 20v-6",
  history: "M12 7v5l3 2M3 12a9 9 0 109-9 9 9 0 00-7 3.5M3 4v3.5h3.5",
  plus: "M12 5v14M5 12h14",

  // device types
  mobile: "M8 3h8a1.5 1.5 0 011.5 1.5v15A1.5 1.5 0 0116 21H8a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 018 3zM11 18h2",
  tablet: "M5 4h14a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 0119 20H5a1.5 1.5 0 01-1.5-1.5v-13A1.5 1.5 0 015 4zM11 17h2",
  desktop: "M3 5h18v11H3zM8 20h8M12 16v4",
};

export default function Icon({ name, size = 22, strokeWidth = 1.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}