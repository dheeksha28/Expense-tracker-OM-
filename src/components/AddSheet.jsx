import { useState, useRef, useEffect } from "react";
import { CATS } from "../utils/constants";

export default function AddSheet({ cards, today, onAdd, onClose }) {
  const titleRef = useRef(null);                        // direct access to the input
  const [f, setF] = useState({ title: "", amount: "", category: "Food", date: today, cardId: cards[0].id });
  const [errs, setErrs] = useState({});

  useEffect(() => { titleRef.current.focus(); }, []);   // focus once when the sheet opens

  // functional update + new object (no mutation)
  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }));

  const submit = () => {
    const e = {};
    if (!f.title.trim()) e.title = "Enter a title.";
    if (!f.amount || +f.amount <= 0) e.amount = "Amount must be greater than 0.";
    if (!f.date) e.date = "Pick a date.";
    setErrs(e);
    if (!Object.keys(e).length) {
      onAdd({ id: Date.now(), title: f.title.trim(), amount: +f.amount, category: f.category, date: f.date, cardId: +f.cardId });
    }
  };

  return (
    <div className="mask" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: 8 }}>Add expense</h2>

        <label>Title</label>
        <input ref={titleRef} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Dinner" />
        {errs.title && <p className="err">{errs.title}</p>}

        <label>Amount (₹)</label>
        <input type="number" value={f.amount} onChange={(e) => set("amount", e.target.value)} placeholder="450" />
        {errs.amount && <p className="err">{errs.amount}</p>}

        <label>Category</label>
        <select value={f.category} onChange={(e) => set("category", e.target.value)}>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>

        <label>Pay with</label>
        <select value={f.cardId} onChange={(e) => set("cardId", e.target.value)}>
          {cards.map((c) => <option key={c.id} value={c.id}>{c.network} •••• {c.number.slice(-4)}</option>)}
        </select>

        <label>Date</label>
        <input type="date" value={f.date} onChange={(e) => set("date", e.target.value)} />
        {errs.date && <p className="err">{errs.date}</p>}

        <button className="btn" onClick={submit}>Add expense</button>
      </div>
    </div>
  );
}