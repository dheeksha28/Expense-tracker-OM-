import { useState } from "react";
import Ico from "./Icon";

const SLIDES = [
  { icon: "cards", title: "Welcome to Money Saver", text: "Track every rupee you spend, in one simple place.", tags: ["Expenses", "Balance", "Cards"] },
  { icon: "stats", title: "See where your money goes", text: "Clear charts show your spending day by day and category by category.", tags: ["Daily bars", "Categories"] },
  { icon: "history", title: "Stay in control", text: "Search, filter and review your history. Your data stays saved on this device.", tags: ["Search", "Filter", "Saved"] },
];

export default function Welcome({ onStart }) {
  const [step, setStep] = useState(0);
  const last = step === SLIDES.length - 1;
  const s = SLIDES[step];

  return (
    <div className="welcome">
      <div className="wtop">
        <b>Money Saver</b>
        {!last && <button className="skip" onClick={onStart}>Skip</button>}
      </div>

      {/* key={step} makes React rebuild this block on every slide, so the animation plays again */}
      <div className="wbody" key={step}>
        <div className="wicon"><Ico n={s.icon} s={56} w={1.4} /></div>
        <h1>{s.title}</h1>
        <p>{s.text}</p>
        <div className="tags">
          {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>

      <div className="dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={"dot" + (i === step ? " on" : "")}
            onClick={() => setStep(i)} aria-label={"Go to slide " + (i + 1)} />
        ))}
      </div>

      <button className="btn" onClick={() => (last ? onStart() : setStep(step + 1))}>
        {last ? "Get started" : "Next"}
      </button>
    </div>
  );
}