import { useState, useMemo } from "react";
import Item from "./Item";
import { CATS } from "../utils/constants";

const SORT_FUNCTIONS = {
  newest: (a, b) => b.date.localeCompare(a.date),
  oldest: (a, b) => a.date.localeCompare(b.date),
  amountLow: (a, b) => a.amount - b.amount,
  amountHigh: (a, b) => b.amount - a.amount,
};

export default function History({ expenses, onDelete }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // filtered + sorted list is DERIVED from expenses + searchText + selectedCategory + sortOrder
  const visibleExpenses = useMemo(() => {
    const search = searchText.toLowerCase();

    return expenses
      .filter((expense) => {
        const matchesSearch = expense.title.toLowerCase().includes(search);
        const matchesCategory =
          selectedCategory === "All" || expense.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort(SORT_FUNCTIONS[sortOrder]);
  }, [expenses, searchText, selectedCategory, sortOrder]);

  return (
    <>
      <div className="top">
        <h1>History</h1>
      </div>

      <div className="filters">
        <input
          placeholder="Search expenses…"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option>All</option>
          {CATS.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="amountLow">Amount: low to high</option>
          <option value="amountHigh">Amount: high to low</option>
        </select>
      </div>

      {!expenses.length ? (
        <div className="empty">No expenses yet. Tap + to add one.</div>
      ) : !visibleExpenses.length ? (
        <div className="empty">No expenses match your search or filter.</div>
      ) : (
        <div className="list">
          {visibleExpenses.map((expense) => (
            <Item key={expense.id} expense={expense} onDelete={onDelete} />
          ))}
        </div>
      )}
    </>
  );
}