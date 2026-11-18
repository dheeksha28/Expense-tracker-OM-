import { useState, useMemo } from "react";
import Icon from "./Icon";
import { inr, monthLabel } from "../utils/expenseUtils";

// size of the bar chart's drawing area (SVG units)
const CHART_WIDTH = 300;
const CHART_HEIGHT = 120;
const GRID_LINES = [0, 0.5, 1];
const FIXED_DAY_LABELS = [1, 5, 10, 15, 20, 25];

export default function Stats({ expenses, thisMonth }) {
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);

  // months come from the data, so new months appear by themselves
  const availableMonths = useMemo(
    () =>
      [
        ...new Set([thisMonth, ...expenses.map((expense) => expense.date.slice(0, 7))]),
      ].sort(),
    [expenses, thisMonth]
  );
  const selectedMonthIndex = availableMonths.indexOf(selectedMonth);

  // useMemo: caches the grouping work until expenses or selectedMonth change
  const monthStats = useMemo(() => {
    const monthExpenses = expenses.filter((expense) =>
      expense.date.startsWith(selectedMonth)
    );

    // day 0 of the next month = last day of this month
    const year = Number(selectedMonth.slice(0, 4));
    const monthNumber = Number(selectedMonth.slice(5)); // 1-12
    const daysInMonth = new Date(year, monthNumber, 0).getDate();

    const spentPerDay = Array(daysInMonth).fill(0);
    const spentPerCategory = {};

    monthExpenses.forEach((expense) => {
      const dayOfMonth = Number(expense.date.slice(8));
      spentPerDay[dayOfMonth - 1] += expense.amount;
      spentPerCategory[expense.category] =
        (spentPerCategory[expense.category] || 0) + expense.amount;
    });

    const totalSpent = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    return { spentPerDay, spentPerCategory, totalSpent };
  }, [expenses, selectedMonth]);

  const { spentPerDay, spentPerCategory, totalSpent } = monthStats;

  const highestDaySpend = Math.max(...spentPerDay);
  const chartMaxValue = Math.max(highestDaySpend, 1); // avoid dividing by zero
  const barSlotWidth = CHART_WIDTH / spentPerDay.length;
  const peakDayIndex = spentPerDay.indexOf(highestDaySpend);
  const dayLabels = [...FIXED_DAY_LABELS, spentPerDay.length];

  const goToPreviousMonth = () => {
    if (selectedMonthIndex > 0) setSelectedMonth(availableMonths[selectedMonthIndex - 1]);
  };

  const goToNextMonth = () => {
    if (selectedMonthIndex < availableMonths.length - 1) {
      setSelectedMonth(availableMonths[selectedMonthIndex + 1]);
    }
  };

  const categoriesBiggestFirst = Object.entries(spentPerCategory).sort(
    ([, amountA], [, amountB]) => amountB - amountA
  );

  return (
    <>
      <div className="top">
        <h1>Statistics</h1>
      </div>

      <div className="cols">
        {/* LEFT COLUMN: month picker + daily bar chart */}
        <div className="col">
          <div className="panel">
            <div className="months">
              <button onClick={goToPreviousMonth} aria-label="Previous month">
                ‹
              </button>
              <b>{monthLabel(selectedMonth)}</b>
              <button onClick={goToNextMonth} aria-label="Next month">
                ›
              </button>
            </div>

            <div className="lbl">Spent this month</div>
            <div className="big" style={{ marginBottom: 10 }}>
              {inr(totalSpent)}
            </div>

            <svg
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT + 16}`}
              width="100%"
              role="img"
              aria-label="Spending per day"
            >
              {/* horizontal grid lines */}
              {GRID_LINES.map((fraction) => (
                <line
                  key={fraction}
                  x1="0"
                  x2={CHART_WIDTH}
                  y1={CHART_HEIGHT - fraction * CHART_HEIGHT}
                  y2={CHART_HEIGHT - fraction * CHART_HEIGHT}
                  stroke="var(--line)"
                  strokeDasharray="3 4"
                />
              ))}

              {/* one bar per day; the highest day is highlighted */}
              {spentPerDay.map((amount, dayIndex) => {
                const isPeakDay = dayIndex === peakDayIndex && amount > 0;
                const barHeight = (amount / chartMaxValue) * CHART_HEIGHT;

                return (
                  <rect
                    key={dayIndex}
                    x={dayIndex * barSlotWidth + 1.5}
                    y={CHART_HEIGHT - barHeight}
                    width={barSlotWidth - 3}
                    height={Math.max(barHeight, amount ? 3 : 0)}
                    rx="2.5"
                    fill={isPeakDay ? "var(--accent)" : "var(--ink)"}
                    opacity={amount ? (isPeakDay ? 1 : 0.85) : 0.08}
                  />
                );
              })}

              {/* day numbers under the chart */}
              {dayLabels.map((dayNumber) => (
                <text
                  key={dayNumber}
                  x={(dayNumber - 1) * barSlotWidth + barSlotWidth / 2}
                  y={CHART_HEIGHT + 13}
                  fontSize="9"
                  textAnchor="middle"
                  fill="var(--mute)"
                >
                  {dayNumber}
                </text>
              ))}
            </svg>

            <p className="lbl" style={{ marginTop: 6 }}>
              {totalSpent
                ? `Highest day: day ${peakDayIndex + 1} (${inr(highestDaySpend)})`
                : "No spending this month."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: spending by category */}
        <div className="col">
          <div className="sec">
            <h2>By category</h2>
          </div>
          <div className="list">
            {categoriesBiggestFirst.map(([category, amount]) => (
              <div className="cat" key={category}>
                <div className="row">
                  <span className="ico" style={{ width: 36, height: 36, borderRadius: 11 }}>
                    <Icon name={category} size={18} />
                  </span>
                  {category}
                  <b>{inr(amount)}</b>
                </div>
                <div className="prog" style={{ marginTop: 0 }}>
                  <i style={{ width: `${(amount / totalSpent) * 100}%` }} />
                </div>
              </div>
            ))}
            {!totalSpent && <div className="empty">No expenses in this month.</div>}
          </div>
        </div>
      </div>
    </>
  );
}