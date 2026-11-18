import { useState, useRef, useEffect } from "react";
import { CATS } from "../utils/constants";

export default function AddSheet({ cards, today, onAdd, onClose }) {
  const titleInputRef = useRef(null); // direct access to the title input

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: today,
    cardId: cards[0].id,
  });
  const [errors, setErrors] = useState({});

  // focus the title input once when the sheet opens
  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  // functional update + new object (no mutation)
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Enter a title.";
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }
    if (!formData.date) newErrors.date = "Pick a date.";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onAdd({
        id: Date.now(),
        title: formData.title.trim(),
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
        cardId: Number(formData.cardId), // <select> values are strings
      });
    }
  };

  return (
    <div className="mask" onClick={onClose}>
      {/* stopPropagation: clicking inside the sheet should not close it */}
      <div className="sheet" onClick={(event) => event.stopPropagation()}>
        <h2 style={{ marginBottom: 8 }}>Add expense</h2>

        <label>Title</label>
        <input
          ref={titleInputRef}
          value={formData.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="Dinner"
        />
        {errors.title && <p className="err">{errors.title}</p>}

        <label>Amount (₹)</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(event) => updateField("amount", event.target.value)}
          placeholder="450"
        />
        {errors.amount && <p className="err">{errors.amount}</p>}

        <label>Category</label>
        <select
          value={formData.category}
          onChange={(event) => updateField("category", event.target.value)}
        >
          {CATS.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        <label>Pay with</label>
        <select
          value={formData.cardId}
          onChange={(event) => updateField("cardId", event.target.value)}
        >
          {cards.map((card) => (
            <option key={card.id} value={card.id}>
              {card.network} •••• {card.number.slice(-4)}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(event) => updateField("date", event.target.value)}
        />
        {errors.date && <p className="err">{errors.date}</p>}

        <button className="btn" onClick={handleSubmit}>
          Add expense
        </button>
      </div>
    </div>
  );
}