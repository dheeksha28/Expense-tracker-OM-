export default function CreditCard({ card }) {
  return (
    <div className="stack">
      <div className="cc">
        <div className="r">
          <div className="chip" />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff"
            strokeWidth="1.6" strokeLinecap="round" opacity=".9">
            <path d="M8 8c1.8 2.5 1.8 5.5 0 8M12 5.5c3 3.8 3 9.2 0 13M16 3c4 5 4 13 0 18" />
          </svg>
        </div>

        <div className="num">{card.number}</div>

        <div className="r">
          <div>
            <small>CARD HOLDER</small>
            <div className="nm">{card.holder.toUpperCase()}</div>
          </div>
          <div>
            <small>VALID THRU</small>
            <div className="nm">{card.expiry}</div>
          </div>
          {card.network === "Visa" ? (
            <div className="visa">VISA</div>
          ) : (
            <svg width="46" height="30" viewBox="0 0 46 30" aria-label="Mastercard">
              <circle cx="16" cy="15" r="13" fill="#EB001B" />
              <circle cx="30" cy="15" r="13" fill="#F79E1B" opacity=".9" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}