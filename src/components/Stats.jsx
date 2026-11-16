import { useState, useMemo } from "react";
import Ico from "./Icon";
import { inr, monthLabel } from "../utils/expenseUtils";

export default function Stats({ expenses, thisMonth }) {
  const [month, setMonth] = useState(thisMonth);

  // months come from the data, so new months appear by themselves
  const keys = useMemo(
    () => [...new Set([thisMonth, ...expenses.map((e) => e.date.slice(0, 7))])].sort(),
    [expenses, thisMonth]
  );
  const idx = keys.indexOf(month);

  // useMemo: caches the grouping work until expenses or month change
  const d = useMemo(() => {
    const list = expenses.filter((e) => e.date.startsWith(month));
    const days = new Date(+month.slice(0, 4), +month.slice(5), 0).getDate();
    const perDay = Array(days).fill(0);
    const perCat = {};
    list.forEach((e) => {
      perDay[+e.date.slice(8) - 1] += e.amount;
      perCat[e.category] = (perCat[e.category] || 0) + e.amount;
    });
    return { perDay, perCat, total: list.reduce((s, e) => s + e.amount, 0) };
  }, [expenses, month]);

  const max = Math.max(...d.perDay, 1);
  const W = 300, H = 120;
  const bw = W / d.perDay.length;
  const peak = d.perDay.indexOf(Math.max(...d.perDay));

  return (
    <>
      <div className="top"><h1>Statistics</h1></div>

      <div className="cols">
        <div className="col">
          <div className="panel">
            <div className="months">
              <button onClick={() => idx > 0 && setMonth(keys[idx - 1])} aria-label="Previous month">‹</button>
              <b>{monthLabel(month)}</b>
              <button onClick={() => idx < keys.length - 1 && setMonth(keys[idx + 1])} aria-label="Next month">›</button>
            </div>

            <div className="lbl">Spent this month</div>
            <div className="big" style={{ marginBottom: 10 }}>{inr(d.total)}</div>

            <svg viewBox={`0 0 ${W} ${H + 16}`} width="100%" role="img" aria-label="Spending per day">
              {[0, 0.5, 1].map((g) => (
                <line key={g} x1="0" x2={W} y1={H - g * H} y2={H - g * H} stroke="var(--line)" strokeDasharray="3 4" />
              ))}
              {d.perDay.map((v, i) => (
                <rect key={i} x={i * bw + 1.5} y={H - (v / max) * H} width={bw - 3}
                  height={Math.max((v / max) * H, v ? 3 : 0)} rx="2.5"
                  fill={i === peak && v ? "var(--accent)" : "var(--ink)"}
                  opacity={v ? (i === peak ? 1 : 0.85) : 0.08} />
              ))}
              {[1, 5, 10, 15, 20, 25, d.perDay.length].map((n) => (
                <text key={n} x={(n - 1) * bw + bw / 2} y={H + 13} fontSize="9" textAnchor="middle" fill="var(--mute)">{n}</text>
              ))}
            </svg>

            <p className="lbl" style={{ marginTop: 6 }}>
              {d.total ? `Highest day: day ${peak + 1} (${inr(d.perDay[peak])})` : "No spending this month."}
            </p>
          </div>
        </div>

        <div className="col">
          <div className="sec"><h2>By category</h2></div>
          <div className="list">
            {Object.entries(d.perCat).sort((a, b) => b[1] - a[1]).map(([c, v]) => (
              <div className="cat" key={c}>
                <div className="row">
                  <span className="ico" style={{ width: 36, height: 36, borderRadius: 11 }}><Ico n={c} s={18} /></span>
                  {c}<b>{inr(v)}</b>
                </div>
                <div className="prog" style={{ marginTop: 0 }}><i style={{ width: `${(v / d.total) * 100}%` }} /></div>
              </div>
            ))}
            {!d.total && <div className="empty">No expenses in this month.</div>}
          </div>
        </div>
      </div>
    </>
  );
}