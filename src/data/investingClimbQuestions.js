// src/data/investingClimbQuestions.js
// Investing question bank for the Crypto Climb quiz UI
// Format: { question: string, options: string[], answerIndex: number }

const investingClimbQuestions = [
  // ——— Investing basics ———
  {
    question: "What is the primary purpose of investment?",
    options: [
      "To spend money quickly",
      "To generate income or capital appreciation",
      "To avoid all risk",
      "To keep cash in a safe",
    ],
    answerIndex: 1,
  },
  {
    question: "Which of the following is a financial asset?",
    options: ["Real estate", "Stocks", "Gold", "Artwork"],
    answerIndex: 1,
  },
  {
    question: "Which is an example of a physical asset?",
    options: ["Bonds", "Mutual funds", "Real estate", "ETFs"],
    answerIndex: 2,
  },
  {
    question: "Which is considered an alternative investment?",
    options: ["Savings account", "Private equity", "Treasury bonds", "Fixed deposits"],
    answerIndex: 1,
  },
  {
    question: "Saving generally offers:",
    options: [
      "High returns and high risk",
      "Low returns and low risk",
      "High returns and no risk",
      "No returns and no risk",
    ],
    answerIndex: 1,
  },
  {
    question: "Which is NOT a common reason people invest?",
    options: [
      "To generate passive income",
      "To beat inflation",
      "To lose money intentionally",
      "To meet financial goals",
    ],
    answerIndex: 2,
  },
  {
    question: "Which of these is an example of passive income?",
    options: ["Salary from a job", "Dividend payments", "Selling personal items", "Lottery winnings"],
    answerIndex: 1,
  },
  {
    question: "Which type of investment is generally most conservative?",
    options: ["Startups", "Government bonds", "Stocks", "Cryptocurrencies"],
    answerIndex: 1,
  },
  {
    question: 'What does "capital appreciation" mean?',
    options: [
      "Increase in asset value",
      "Fixed income from an asset",
      "Interest payment on a loan",
      "Reducing asset value",
    ],
    answerIndex: 0,
  },
  {
    question: "What is inflation?",
    options: [
      "Increase in the price of assets",
      "Decrease in the purchasing power of money",
      "Increase in interest rates",
      "Decrease in investment returns",
    ],
    answerIndex: 1,
  },
  {
    question: "Which of these is a low-risk investment?",
    options: ["Savings account", "Stocks", "Private equity", "Venture capital"],
    answerIndex: 0,
  },
  {
    question: "The process of committing money to assets for future growth is called:",
    options: ["Spending", "Saving", "Investing", "Borrowing"],
    answerIndex: 2,
  },
  {
    question: "Which is NOT an example of a financial asset?",
    options: ["Mutual funds", "Bonds", "Real estate", "ETFs"],
    answerIndex: 2,
  },
  {
    question: "Which is an example of a high-risk, high-return investment?",
    options: ["Government bonds", "Startups", "Fixed deposits", "Savings accounts"],
    answerIndex: 1,
  },
  {
    question: "The main difference between saving and investing is that:",
    options: [
      "Saving has lower risk",
      "Saving always beats inflation",
      "Investing has no risk",
      "Saving is only for short-term goals",
    ],
    answerIndex: 0,
  },

  // ——— Risk & return ———
  {
    question: "Which type of risk is related to difficulty in selling an asset quickly?",
    options: ["Market risk", "Liquidity risk", "Credit risk", "Interest rate risk"],
    answerIndex: 1,
  },
  {
    question: "The chance that the borrower will fail to pay back is called:",
    options: ["Inflation risk", "Credit risk", "Market risk", "Liquidity risk"],
    answerIndex: 1,
  },
  {
    question: "Which type of risk affects bond prices when interest rates change?",
    options: ["Credit risk", "Interest rate risk", "Inflation risk", "Liquidity risk"],
    answerIndex: 1,
  },
  {
    question: "What is the total return on an investment?",
    options: [
      "Only capital gains",
      "Only interest or dividends",
      "Capital gains + income received",
      "Only market price change",
    ],
    answerIndex: 2,
  },
  {
    question: "The risk–return tradeoff suggests that:",
    options: [
      "Higher returns come with lower risk",
      "Higher returns usually require higher risk",
      "Low risk always leads to high returns",
      "Risk has no relation to return",
    ],
    answerIndex: 1,
  },
  {
    question: "Which metric measures the volatility of returns?",
    options: ["Beta", "Standard deviation", "Sharpe ratio", "Interest rate"],
    answerIndex: 1,
  },
  {
    question: "Which metric measures return per unit of risk?",
    options: ["Sharpe ratio", "Beta", "Volatility", "Inflation rate"],
    answerIndex: 0,
  },
  {
    question: "Which metric measures a stock’s sensitivity to the overall market?",
    options: ["Standard deviation", "Sharpe ratio", "Beta", "P/E ratio"],
    answerIndex: 2,
  },
  {
    question:
      "An investment yielding returns that don’t keep pace with inflation faces which type of risk?",
    options: ["Liquidity risk", "Inflation risk", "Credit risk", "Interest rate risk"],
    answerIndex: 1,
  },
  {
    question: "Which is an example of market risk?",
    options: [
      "Stock prices dropping due to economic slowdown",
      "A borrower defaulting",
      "Difficulty in selling a property",
      "Interest rates changing",
    ],
    answerIndex: 0,
  },
  {
    question: "Which is a measure of an investment’s market sensitivity?",
    options: ["Sharpe ratio", "Beta", "Volatility", "Risk premium"],
    answerIndex: 1,
  },
  {
    question: "Which is an example of a conservative investment?",
    options: ["Fixed deposits", "Venture capital", "Cryptocurrency", "Startup equity"],
    answerIndex: 0,
  },
  {
    question: 'Which is the best description of "return"?',
    options: [
      "The profit or loss from an investment",
      "Only the capital gains from selling",
      "The amount of money invested initially",
      "The fees paid for investing",
    ],
    answerIndex: 0,
  },
  {
    question: "What is a capital loss?",
    options: [
      "A decrease in the asset’s value",
      "A loss due to inflation",
      "Failure to receive interest",
      "A business expense",
    ],
    answerIndex: 0,
  },
  {
    question: "Which type of investment is MOST likely to beat inflation in the long run?",
    options: ["Government bonds", "Stocks", "Fixed deposits", "Savings accounts"],
    answerIndex: 1,
  },

  // ——— Time value of money & compounding ———
  {
    question: "The time value of money states that:",
    options: [
      "Money today is worth less than in the future",
      "Money today is worth more than in the future",
      "Money today has the same value as in the future",
      "Money value is unaffected by time",
    ],
    answerIndex: 1,
  },
  {
    question: "If you want to know how much a future sum is worth today, you calculate:",
    options: ["Future value", "Present value", "Interest rate", "Risk premium"],
    answerIndex: 1,
  },
  {
    question: "Which is the correct formula for future value?",
    options: ["FV = PV × (1 + r)^n", "FV = PV ÷ (1 + r)^n", "FV = PV × r × n", "FV = PV − r"],
    answerIndex: 0,
  },
  {
    question: "If you invest $1,000 at 8% compounded annually for 3 years, what is the future value?",
    options: ["$1,200", "$1,259.71", "$1,300", "$1,280"],
    answerIndex: 1,
  },
  {
    question: 'In the PV formula PV = FV ÷ (1 + r)^n, what does "r" represent?',
    options: ["Rate of return", "Risk premium", "Inflation rate", "Beta"],
    answerIndex: 0,
  },
  {
    question: "Compounding means:",
    options: [
      "Earning returns only on principal",
      "Earning returns on principal + accumulated returns",
      "Increasing the investment risk",
      "Investing in multiple assets",
    ],
    answerIndex: 1,
  },
  {
    question: "Which compounding frequency results in the fastest growth?",
    options: ["Annual", "Quarterly", "Monthly", "Daily"],
    answerIndex: 3,
  },
  {
    question: "Which is the compound interest formula?",
    options: [
      "A = P(1 + r/n)^(n×t)",
      "A = P(1 − r)^t",
      "A = P + r×t",
      "A = P/(1 + r)^t",
    ],
    answerIndex: 0,
  },
  {
    question: "An investor reinvesting dividends instead of spending them is:",
    options: [
      "Avoiding risk",
      "Using a wealth creation strategy",
      "Reducing returns",
      "Liquidity planning",
    ],
    answerIndex: 1,
  },
  {
    question: "Starting early and investing for a long period mainly benefits from:",
    options: ["Market risk", "Time value of money", "Compounding", "Inflation"],
    answerIndex: 2,
  },
];

export default investingClimbQuestions;
