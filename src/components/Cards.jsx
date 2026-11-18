import { useState } from "react";
import CreditCard from "./CreditCard";
import Icon from "./Icon";
import { inr } from "../utils/expenseUtils";

export default function Cards({ cards, spentBy, onAdd }) {
  const [selectedCardId, setSelectedCardId] = useState(cards[0].id);

  // fall back to the first card if the selected one no longer exists
  const selectedCard = cards.find((card) => card.id === selectedCardId) || cards[0];
  const spent = spentBy[selectedCard.id] || 0;
  const available = selectedCard.opening - spent;

  return (
    <>
      <div className="top">
        <h1>Cards</h1>
      </div>

      <div className="cols">
        {/* LEFT COLUMN: card + card switcher */}
        <div className="col">
          <CreditCard card={selectedCard} />

          {cards.length > 1 && (
            <div className="pills">
              {cards.map((card) => (
                <button
                  key={card.id}
                  className={"pill" + (card.id === selectedCard.id ? " on" : "")}
                  onClick={() => setSelectedCardId(card.id)}
                >
                  {card.network} •••• {card.number.slice(-4)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: balance details */}
        <div className="col">
          <div className="list">
            <div className="kv">
              <span>Opening balance</span>
              {inr(selectedCard.opening)}
            </div>
            <div className="kv">
              <span>Total spent</span>−{inr(spent)}
            </div>
            <div className="kv">
              <span>Available now</span>
              <b>{inr(available)}</b>
            </div>
          </div>

          <p className="lbl" style={{ margin: "10px 4px 0" }}>
            {inr(selectedCard.opening)} − {inr(spent)} = {inr(available)}
          </p>

          <button className="addbtn" onClick={onAdd}>
            <Icon name="plus" size={20} strokeWidth={2} />
            Add another card
          </button>
        </div>
      </div>
    </>
  );
}