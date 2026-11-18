import Icon from "./Icon";
import { inr, fmt } from "../utils/expenseUtils";

export default function Item({ expense, onDelete }) {
  return (
    <div className="item">
      <div className="ico">
        <Icon name={expense.category} />
      </div>
      <div className="t">
        <b>{expense.title}</b>
        <span>{fmt(expense.date)}</span>
      </div>
      <div className="amt">−{inr(expense.amount)}</div>
      {onDelete && (
        <button className="del" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      )}
    </div>
  );
}