import { useState } from "react";
import Icon from "./Icon";

const SLIDES = [
  {
    icon: "cards",
    title: "Welcome to Money Saver",
    text: "Track every rupee you spend, in one simple place.",
    tags: ["Expenses", "Balance", "Cards"],
  },
  {
    icon: "stats",
    title: "See where your money goes",
    text: "Clear charts show your spending day by day and category by category.",
    tags: ["Daily bars", "Categories"],
  },
  {
    icon: "history",
    title: "Stay in control",
    text: "Search, filter and review your history. Your data stays saved on this device.",
    tags: ["Search", "Filter", "Saved"],
  },
];

export default function Welcome({ onStart }) {
  const [currentStep, setCurrentStep] = useState(0);

  const isLastSlide = currentStep === SLIDES.length - 1;
  const currentSlide = SLIDES[currentStep];

  const handleNext = () => {
    if (isLastSlide) {
      onStart();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="welcome">
      <div className="wtop">
        <b>Money Saver</b>
        {!isLastSlide && (
          <button className="skip" onClick={onStart}>
            Skip
          </button>
        )}
      </div>

      {/* key={currentStep} makes React rebuild this block on every slide, so the animation plays again */}
      <div className="wbody" key={currentStep}>
        <div className="wicon">
          <Icon name={currentSlide.icon} size={56} strokeWidth={1.4} />
        </div>
        <h1>{currentSlide.title}</h1>
        <p>{currentSlide.text}</p>
        <div className="tags">
          {currentSlide.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* one dot per slide; clicking a dot jumps to that slide */}
      <div className="dots">
        {SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.title}
            className={"dot" + (slideIndex === currentStep ? " on" : "")}
            onClick={() => setCurrentStep(slideIndex)}
            aria-label={"Go to slide " + (slideIndex + 1)}
          />
        ))}
      </div>

      <button className="btn" onClick={handleNext}>
        {isLastSlide ? "Get started" : "Next"}
      </button>
    </div>
  );
}