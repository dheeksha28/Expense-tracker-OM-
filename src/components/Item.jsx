import Ico from "./Icon";
import { inr, fmt } from "../utils/expenseUtils";

export default function Item({ e, onDelete }) {
  return (
    <div className="item">
      <div className="ico"><Ico n={e.category} /></div>
      <div className="t">
        <b>{e.title}</b>
        <span>{fmt(e.date)}</span>
      </div>
      <div className="amt">−{inr(e.amount)}</div>
      {onDelete && (
        <button className="del" onClick={() => onDelete(e.id)}>Delete</button>
      )}
    </div>
  );
}