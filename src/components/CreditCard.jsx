const CARD_LOGO_COLORS = {
  mastercardRed: "#EB001B",
  mastercardOrange: "#F79E1B",
};

// contactless payment symbol (the curved waves)
function ContactlessIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity=".9"
      aria-hidden="true"
    >
      <path d="M8 8c1.8 2.5 1.8 5.5 0 8M12 5.5c3 3.8 3 9.2 0 13M16 3c4 5 4 13 0 18" />
    </svg>
  );
}

// two overlapping circles
function MastercardLogo() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" aria-label="Mastercard">
      <circle cx="16" cy="15" r="13" fill={CARD_LOGO_COLORS.mastercardRed} />
      <circle cx="30" cy="15" r="13" fill={CARD_LOGO_COLORS.mastercardOrange} opacity=".9" />
    </svg>
  );
}

export default function CreditCard({ card }) {
  const isVisa = card.network === "Visa";

  return (
    <div className="stack">
      <div className="cc">
        {/* top row: chip + contactless symbol */}
        <div className="r">
          <div className="chip" />
          <ContactlessIcon />
        </div>

        <div className="num">{card.number}</div>

        {/* bottom row: holder, expiry, network logo */}
        <div className="r">
          <div>
            <small>CARD HOLDER</small>
            <div className="nm">{card.holder.toUpperCase()}</div>
          </div>
          <div>
            <small>VALID THRU</small>
            <div className="nm">{card.expiry}</div>
          </div>
          {isVisa ? <div className="visa">VISA</div> : <MastercardLogo />}
        </div>
      </div>
    </div>
  );
}