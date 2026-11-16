import { useState } from "react";
import CreditCard from "./CreditCard";
import Ico from "./Icon";
import { inr } from "../utils/expenseUtils";

export default function Cards({ cards, spentBy, onAdd }) {
  const [sel, setSel] = useState(cards[0].id);
  const card = cards.find((c) => c.id === sel) || cards[0];
  const spent = spentBy[card.id] || 0;

  return (
    <>
      <div className="top"><h1>Cards</h1></div>

      <div className="cols">
        <div className="col">
          <CreditCard card={card} />
          {cards.length > 1 && (
            <div className="pills">
              {cards.map((c) => (
                <button key={c.id} className={"pill" + (c.id === card.id ? " on" : "")} onClick={() => setSel(c.id)}>
                  {c.network} •••• {c.number.slice(-4)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="col">
          <div className="list">
            <div className="kv"><span>Opening balance</span>{inr(card.opening)}</div>
            <div className="kv"><span>Total spent</span>−{inr(spent)}</div>
            <div className="kv"><span>Available now</span><b>{inr(card.opening - spent)}</b></div>
          </div>
          <p className="lbl" style={{ margin: "10px 4px 0" }}>
            {inr(card.opening)} − {inr(spent)} = {inr(card.opening - spent)}
          </p>
          <button className="addbtn" onClick={onAdd}>
            <Ico n="plus" s={20} w={2} />Add another card
          </button>
        </div>
      </div>
    </>
  );
}