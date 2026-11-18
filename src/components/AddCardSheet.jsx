import { useState, useRef, useEffect } from "react";

const NETWORKS = ["Visa", "Mastercard"];

export default function AddCardSheet({ holder, onAdd, onClose }) {
  const holderInputRef = useRef(null); // direct access to the card holder input

  const [formData, setFormData] = useState({
    holder,
    number: "",
    expiry: "",
    network: "Visa",
    opening: "",
  });
  const [errors, setErrors] = useState({});

  // focus the first input once when the sheet opens
  useEffect(() => {
    holderInputRef.current.focus();
  }, []);

  // functional update + new object (no mutation)
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (cardDigits) => {
    const newErrors = {};
    if (!formData.holder.trim()) {
      newErrors.holder = "Enter the card holder name.";
    }
    if (cardDigits.length !== 16) {
      newErrors.number = "Card number must have 16 digits.";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Use MM/YY, for example 08/29.";
    }
    if (!formData.opening || Number(formData.opening) <= 0) {
      newErrors.opening = "Opening balance must be greater than 0.";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const cardDigits = formData.number.replace(/\D/g, ""); // keep only the digits
    const newErrors = validate(cardDigits);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onAdd({
        id: Date.now(),
        holder: formData.holder.trim(),
        number: cardDigits.replace(/(\d{4})(?=\d)/g, "$1 "), // 1234567890123456 -> 1234 5678 9012 3456
        expiry: formData.expiry,
        network: formData.network,
        opening: Number(formData.opening),
      });
    }
  };

  return (
    <div className="mask" onClick={onClose}>
      {/* stopPropagation: clicking inside the sheet should not close it */}
      <div className="sheet" onClick={(event) => event.stopPropagation()}>
        <h2 style={{ marginBottom: 8 }}>Add card</h2>

        <label>Card holder</label>
        <input
          ref={holderInputRef}
          value={formData.holder}
          onChange={(event) => updateField("holder", event.target.value)}
        />
        {errors.holder && <p className="err">{errors.holder}</p>}

        <label>Card number</label>
        <input
          inputMode="numeric"
          value={formData.number}
          onChange={(event) => updateField("number", event.target.value)}
          placeholder="1234 5678 9012 3456"
        />
        {errors.number && <p className="err">{errors.number}</p>}

        <label>Expiry (MM/YY)</label>
        <input
          value={formData.expiry}
          onChange={(event) => updateField("expiry", event.target.value)}
          placeholder="08/29"
        />
        {errors.expiry && <p className="err">{errors.expiry}</p>}

        <label>Network</label>
        <select
          value={formData.network}
          onChange={(event) => updateField("network", event.target.value)}
        >
          {NETWORKS.map((network) => (
            <option key={network}>{network}</option>
          ))}
        </select>

        <label>Opening balance (₹)</label>
        <input
          type="number"
          value={formData.opening}
          onChange={(event) => updateField("opening", event.target.value)}
          placeholder="25000"
        />
        {errors.opening && <p className="err">{errors.opening}</p>}

        <button className="btn" onClick={handleSubmit}>
          Add card
        </button>
      </div>
    </div>
  );
}