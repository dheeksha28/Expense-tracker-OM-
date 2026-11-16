import { useState, useMemo } from "react";
import Item from "./Item";
import { CATS } from "../utils/constants";

export default function History({ expenses, onDelete }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("new");

  // filtered + sorted list is DERIVED from expenses + search + cat + sort
  const shown = useMemo(() => {
    const by = {
      new: (a, b) => b.date.localeCompare(a.date),
      old: (a, b) => a.date.localeCompare(b.date),
      low: (a, b) => a.amount - b.amount,
      high: (a, b) => b.amount - a.amount,
    };
    return expenses
      .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) && (cat === "All" || e.category === cat))
      .sort(by[sort]);
  }, [expenses, search, cat, sort]);

  return (
    <>
      <div className="top"><h1>History</h1></div>

      <div className="filters">
        <input placeholder="Search expenses…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option>All</option>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
          <option value="low">Amount: low to high</option>
          <option value="high">Amount: high to low</option>
        </select>
      </div>

      {!expenses.length ? (
        <div className="empty">No expenses yet. Tap + to add one.</div>
      ) : !shown.length ? (
        <div className="empty">No expenses match your search or filter.</div>
      ) : (
        <div className="list">
          {shown.map((e) => <Item key={e.id} e={e} onDelete={onDelete} />)}
        </div>
      )}
    </>
  );
}