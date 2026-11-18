import Item from "./Item";
import { inr, fmt } from "../utils/expenseUtils";

const RING_RADIUS = 74;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function Home({
  user,
  expenses,
  todayStr,
  spentAll,
  openingAll,
  monthSpent,
  monthCount,
  go,
}) {
  // derived values: calculated every render, NOT stored in state
  const availableBalance = openingAll - spentAll;
  const percentUsed = openingAll
    ? Math.min(100, Math.round((spentAll / openingAll) * 100))
    : 0;
  const ringOffset = RING_CIRCUMFERENCE * (1 - percentUsed / 100);

  const todayExpenses = expenses.filter((expense) => expense.date === todayStr);
  const todayTotal = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const recentExpenses = [...expenses]
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
    .slice(0, 5);

  return (
    <>
      <div className="top">
        <div>
          <h1>Hello, {user}</h1>
          <p>Here is your spending summary</p>
        </div>
        <div className="avatar">{user[0].toUpperCase()}</div>
      </div>

      <div className="cols">
        {/* LEFT COLUMN: balance */}
        <div className="col">
          <div className="ringbox">
            <svg
              viewBox="0 0 200 200"
              style={{ transform: "rotate(-90deg)" }}
              role="img"
              aria-label={percentUsed + "% of balance used"}
            >
              <circle
                cx="100"
                cy="100"
                r={RING_RADIUS}
                fill="none"
                stroke="var(--soft)"
                strokeWidth="16"
              />
              <circle
                cx="100"
                cy="100"
                r={RING_RADIUS}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={ringOffset}
              />
            </svg>
            <div className="ringtxt">
              <span className="lbl">Available balance</span>
              <b>{inr(availableBalance)}</b>
              <span className="lbl">{percentUsed}% used</span>
            </div>
          </div>
          <p className="lbl" style={{ textAlign: "center", marginBottom: 22 }}>
            {inr(openingAll)} − {inr(spentAll)} spent
          </p>

          <div className="tiles">
            <div className="tile">
              <span className="lbl">Spent this month</span>
              <b>{inr(monthSpent)}</b>
            </div>
            <div className="tile">
              <span className="lbl">Transactions</span>
              <b>{monthCount}</b>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: today + recent */}
        <div className="col">
          <div className="sec">
            <h2>Today</h2>
            <span className="lbl">{fmt(todayStr)}</span>
          </div>
          <div className="today">
            <span>
              <b>{todayExpenses.length}</b>{" "}
              {todayExpenses.length === 1 ? "transaction" : "transactions"}
            </span>
            <span>
              Total <b>{inr(todayTotal)}</b>
            </span>
          </div>

          {todayExpenses.length ? (
            <div className="list" style={{ marginBottom: 24 }}>
              {todayExpenses.map((expense) => (
                <Item key={expense.id} expense={expense} />
              ))}
            </div>
          ) : (
            <div className="empty" style={{ marginBottom: 12 }}>
              No spending today.
            </div>
          )}

          <div className="sec">
            <h2>Recent transactions</h2>
            <button className="link" onClick={() => go("history")}>
              See all
            </button>
          </div>
          <div className="list">
            {recentExpenses.map((expense) => (
              <Item key={expense.id} expense={expense} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}