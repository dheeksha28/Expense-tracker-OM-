import { useState, useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import useToday from "./hooks/useToday";
import { SEED, CARDS, USER } from "./utils/constants";
import Icon from "./components/Icon";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Stats from "./components/Stats";
import History from "./components/History";
import Cards from "./components/Cards";
import AddSheet from "./components/AddSheet";
import AddCardSheet from "./components/AddCardSheet";

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const today = useToday();               // e.g. "2026-11-11", updates itself at midnight
  const currentMonth = today.slice(0, 7); // "2026-11"

  // saved in localStorage
  const [expenses, setExpenses] = useLocalStorage("expenses", SEED);
  const [cards, setCards] = useLocalStorage("cards", CARDS);

  // derived data
  const spentByCard = useMemo(() => {
    const totals = {};
    expenses.forEach((expense) => {
      totals[expense.cardId] = (totals[expense.cardId] || 0) + expense.amount;
    });
    return totals;
  }, [expenses]);

  const totalSpent = Object.values(spentByCard).reduce((sum, amount) => sum + amount, 0);
  const totalOpeningBalance = cards.reduce((sum, card) => sum + card.opening, 0);
  const monthExpenses = expenses.filter((expense) => expense.date.startsWith(currentMonth));
  const monthSpent = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
    setIsAddingExpense(false);
  };

  const handleAddCard = (newCard) => {
    setCards((prev) => [...prev, newCard]);
    setIsAddingCard(false);
  };

  const renderTabButton = (tabKey, label) => (
    <button
      className={"tab" + (activeTab === tabKey ? " on" : "")}
      onClick={() => setActiveTab(tabKey)}
    >
      <Icon name={tabKey} />
      {label}
    </button>
  );

  const appScreen = (
    <div className="app">
      <div className="scroll">
        <div className="content">
          {activeTab === "home" && (
            <Home
              user={USER}
              expenses={expenses}
              todayStr={today}
              spentAll={totalSpent}
              openingAll={totalOpeningBalance}
              monthSpent={monthSpent}
              monthCount={monthExpenses.length}
              go={setActiveTab}
            />
          )}
          {activeTab === "cards" && (
            <Cards cards={cards} spentBy={spentByCard} onAdd={() => setIsAddingCard(true)} />
          )}
          {activeTab === "stats" && <Stats expenses={expenses} thisMonth={currentMonth} />}
          {activeTab === "history" && (
            <History expenses={expenses} onDelete={handleDeleteExpense} />
          )}
        </div>
      </div>

      <nav className="nav">
        {renderTabButton("home", "Home")}
        {renderTabButton("cards", "Cards")}
        <button
          className="fab"
          onClick={() => setIsAddingExpense(true)}
          aria-label="Add expense"
        >
          <Icon name="plus" size={26} strokeWidth={2} />
        </button>
        {renderTabButton("stats", "Stats")}
        {renderTabButton("history", "History")}
      </nav>

      {isAddingCard && (
        <AddCardSheet
          holder={USER}
          onAdd={handleAddCard}
          onClose={() => setIsAddingCard(false)}
        />
      )}
      {isAddingExpense && (
        <AddSheet
          cards={cards}
          today={today}
          onAdd={handleAddExpense}
          onClose={() => setIsAddingExpense(false)}
        />
      )}
    </div>
  );

  return (
    <div className="shell">
      <main className="frame">
        {hasStarted ? appScreen : <Welcome onStart={() => setHasStarted(true)} />}
      </main>
    </div>
  );
}