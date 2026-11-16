import { useState, useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import useToday from "./hooks/useToday";
import { SEED, CARDS, USER } from "./utils/constants";
import Ico from "./components/Icon";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Stats from "./components/Stats";
import History from "./components/History";
import Cards from "./components/Cards";
import AddSheet from "./components/AddSheet";
import AddCardSheet from "./components/AddCardSheet";

export default function App() {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState("home");
  const [adding, setAdding] = useState(false);
  const [addingCard, setAddingCard] = useState(false);

  const today = useToday();                      // e.g. "2026-11-11", updates itself at midnight
  const thisMonth = today.slice(0, 7);           // "2026-11"

  // saved in localStorage
  const [expenses, setExpenses] = useLocalStorage("expenses", SEED);
  const [cards, setCards] = useLocalStorage("cards", CARDS);

  // derived data
  const spentBy = useMemo(() => {
    const m = {};
    expenses.forEach((e) => { m[e.cardId] = (m[e.cardId] || 0) + e.amount; });
    return m;
  }, [expenses]);
  const spentAll = Object.values(spentBy).reduce((s, v) => s + v, 0);
  const openingAll = cards.reduce((s, c) => s + c.opening, 0);
  const monthList = expenses.filter((e) => e.date.startsWith(thisMonth));
  const monthSpent = monthList.reduce((s, e) => s + e.amount, 0);

  const tabBtn = (k, label) => (
    <button className={"tab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>
      <Ico n={k} />{label}
    </button>
  );

  const appScreen = (
    <div className="app">
      <div className="scroll">
        <div className="content">
          {tab === "home" && (
            <Home user={USER} expenses={expenses} todayStr={today} spentAll={spentAll} openingAll={openingAll}
              monthSpent={monthSpent} monthCount={monthList.length} go={setTab} />
          )}
          {tab === "cards" && <Cards cards={cards} spentBy={spentBy} onAdd={() => setAddingCard(true)} />}
          {tab === "stats" && <Stats expenses={expenses} thisMonth={thisMonth} />}
          {tab === "history" && (
            <History expenses={expenses} onDelete={(id) => setExpenses((prev) => prev.filter((e) => e.id !== id))} />
          )}
        </div>
      </div>

      <nav className="nav">
        {tabBtn("home", "Home")}
        {tabBtn("cards", "Cards")}
        <button className="fab" onClick={() => setAdding(true)} aria-label="Add expense">
          <Ico n="plus" s={26} w={2} />
        </button>
        {tabBtn("stats", "Stats")}
        {tabBtn("history", "History")}
      </nav>

      {addingCard && (
        <AddCardSheet holder={USER}
          onAdd={(c) => { setCards((prev) => [...prev, c]); setAddingCard(false); }}
          onClose={() => setAddingCard(false)} />
      )}
      {adding && (
        <AddSheet cards={cards} today={today}
          onAdd={(ex) => { setExpenses((prev) => [ex, ...prev]); setAdding(false); }}
          onClose={() => setAdding(false)} />
      )}
    </div>
  );

  return (
    <div className="shell">
      <main className="frame">
        {started ? appScreen : <Welcome onStart={() => setStarted(true)} />}
      </main>
    </div>
  );
}