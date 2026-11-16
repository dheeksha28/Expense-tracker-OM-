// Category names (also used as icon names in Icon.jsx)
export const CATS = ["Food", "Travel", "Shopping", "Entertainment", "Bills", "Other"];

// Sample expenses. Each row: [id, title, amount, category, date]
export const SEED = [
  [1, "Groceries", 1240, "Food", "2026-11-02"],
  [2, "Auto ride", 120, "Travel", "2026-11-02"],
  [3, "Phone recharge", 299, "Bills", "2026-11-03"],
  [4, "Movie night", 350, "Entertainment", "2026-11-05"],
  [5, "Dinner", 450, "Food", "2026-11-06"],
  [6, "Sneakers", 2499, "Shopping", "2026-11-07"],
  [7, "Metro pass", 500, "Travel", "2026-11-08"],
  [8, "Electricity bill", 1850, "Bills", "2026-11-09"],
  [9, "Coffee", 180, "Food", "2026-11-09"],
  [10, "Gift", 900, "Other", "2026-11-10"],
  [11, "Lunch", 320, "Food", "2026-10-28"],
  [12, "Cab", 640, "Travel", "2026-10-21"],
  [13, "Headphones", 1999, "Shopping", "2026-10-14"],
  [14, "Internet bill", 799, "Bills", "2026-10-05"],
].map(([id, title, amount, category, date]) => ({
  id, title, amount, category, date, cardId: 1,
}));

// Sample cards. "opening" is the balance when the card was added.
export const CARDS = [
  { id: 1, holder: "Deeksha D Shetty", number: "4562 1122 4595 7852", expiry: "08/29", network: "Visa", opening: 50000 },
  { id: 2, holder: "Deeksha D Shetty", number: "5412 7534 8821 4410", expiry: "03/28", network: "Mastercard", opening: 20000 },
];

// Name shown in "Hello, ..." and on new cards
export const USER = "Deeksha";