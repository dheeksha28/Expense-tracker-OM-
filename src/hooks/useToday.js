import { useState, useEffect } from "react";
import { toDateStr } from "../utils/expenseUtils";

export default function useToday() {
  const [today, setToday] = useState(() => toDateStr());

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // 1. wake up just after midnight and update the date
    const timer = setTimeout(() => setToday(toDateStr()), nextMidnight - now + 1000);

    // 2. also check when the tab becomes visible again (laptop slept, tab was in the background)
    const onVisible = () => setToday(toDateStr());
    document.addEventListener("visibilitychange", onVisible);

    return () => {                                   // cleanup both
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [today]);                                        // re-schedule for the next midnight

  return today;
}





