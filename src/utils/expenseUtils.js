// 1240 -> "₹1,240"
export const inr = (n) => "₹" + n.toLocaleString("en-IN");

// "2026-11-06" -> "06 Nov 2026"
export const fmt = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// Date -> "2026-11-11" using the LOCAL date (not UTC)
export const toDateStr = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// "2026-11" -> "November 2026"
export const monthLabel = (m) =>
  new Date(+m.slice(0, 4), +m.slice(5) - 1, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });