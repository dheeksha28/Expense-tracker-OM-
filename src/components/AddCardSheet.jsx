import { useState, useRef, useEffect } from "react";

export default function AddCardSheet({ holder, onAdd, onClose }) {
  const ref = useRef(null);
  const [f, setF] = useState({ holder, number: "", expiry: "", network: "Visa", opening: "" });
  const [errs, setErrs] = useState({});

  useEffect(() => { ref.current.focus(); }, []);
  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }));

  const submit = () => {
    const digits = f.number.replace(/\D/g, "");          // keep only the digits
    const e = {};
    if (!f.holder.trim()) e.holder = "Enter the card holder name.";
    if (digits.length !== 16) e.number = "Card number must have 16 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry)) e.expiry = "Use MM/YY, for example 08/29.";
    if (!f.opening || +f.opening <= 0) e.opening = "Opening balance must be greater than 0.";
    setErrs(e);
    if (!Object.keys(e).length) {
      onAdd({
        id: Date.now(),
        holder: f.holder.trim(),
        number: digits.replace(/(\d{4})(?=\d)/g, "$1 "),  // 1234567890123456 -> 1234 5678 9012 3456
        expiry: f.expiry,
        network: f.network,
        opening: +f.opening,
      });
    }
  };

  return (
    <div className="mask" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: 8 }}>Add card</h2>

        <label>Card holder</label>
        <input ref={ref} value={f.holder} onChange={(e) => set("holder", e.target.value)} />
        {errs.holder && <p className="err">{errs.holder}</p>}

        <label>Card number</label>
        <input inputMode="numeric" value={f.number} onChange={(e) => set("number", e.target.value)} placeholder="1234 5678 9012 3456" />
        {errs.number && <p className="err">{errs.number}</p>}

        <label>Expiry (MM/YY)</label>
        <input value={f.expiry} onChange={(e) => set("expiry", e.target.value)} placeholder="08/29" />
        {errs.expiry && <p className="err">{errs.expiry}</p>}

        <label>Network</label>
        <select value={f.network} onChange={(e) => set("network", e.target.value)}>
          <option>Visa</option>
          <option>Mastercard</option>
        </select>

        <label>Opening balance (₹)</label>
        <input type="number" value={f.opening} onChange={(e) => set("opening", e.target.value)} placeholder="25000" />
        {errs.opening && <p className="err">{errs.opening}</p>}

        <button className="btn" onClick={submit}>Add card</button>
      </div>
    </div>
  );
}