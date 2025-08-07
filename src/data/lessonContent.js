// src/data/lessonContent.js

export const cryptoLessons = {
  crypto1: {
    title: "Lesson 1 – What is Cryptocurrency?",
    subLessons: [
      { id: "definition-history", title: "Definition and History", content: `Cryptocurrencies are digital currencies that run on virtual networks and do not
exist as physical coins or notes. They are not issued or backed by governments
or corporations. Bitcoin, introduced in 2009 by the pseudonymous Satoshi Nakamoto, was the
first cryptocurrency. The first commercial crypto transaction occurred on 22 May 2010 (Bitcoin Pizza
Day), when 10 000 BTC were exchanged for two pizzas.` },
      { id: "blockchain-basics", title: "Blockchain Basics", content: `A blockchain is a distributed and secure ledger where transactions are recorded
in sequences of blocks linked together. Once verified, a block is closed and
added to the chain; the linkage means that earlier transactions cannot be altered
without affecting subsequent blocks. Cryptocurrencies often run on open networks where anyone can download
software and participate in verifying transactions.` },
      { id: "decentralisation-cryptography", title: "Decentralisation and Cryptography", content: `Cryptocurrencies enable direct, peer‑to‑peer transfers without intermediaries
such as banks. They rely on cryptographic keys: each user has a public key (similar to an
account number) and a private key (used to access their funds). The security of
the private key is critical because losing it means the associated coins cannot be
recovered.` },
      { id: "types-digital-assets", title: "Types of Digital Assets", content: `Coins vs tokens, altcoins, stablecoins, meme coins...` },
    ],
    quiz: [
      { question: "What year was Bitcoin launched?", options: ["2005", "2009", "2012"], answer: 1 },
      { question: "What is a stablecoin?", options: ["Coin with fixed supply", "Pegged to a real-world asset", "Backed by gold"], answer: 1 },
    ],
  },

  crypto2: {
    title: "Lesson 2 – How Cryptocurrency Works and How to Use It",
    subLessons: [
      { id: "transactions-consensus", title: "Transactions and Consensus", content: `Mining, proof‑of‑stake validators...` },
      { id: "digital-wallets", title: "Digital Wallets and Keys", content: `Hardware, software, paper wallets...` },
      { id: "acquiring-storing", title: "Acquiring and Storing Crypto", content: `Exchanges, KYC, security...` },
      { id: "payments-investment", title: "Using Crypto: Payments & Investment", content: `Adoption, volatility, staking...` },
      { id: "pros-cons", title: "Pros and Cons", content: `Advantages and disadvantages...` },
      { id: "legal-tax", title: "Legal & Tax Considerations", content: `Regulations, taxes...` },
    ],
    quiz: [
      { question: "What does PoW stand for?", options: ["Proof of Wallet", "Proof of Work", "Proof of Wealth"], answer: 1 },
    ],
  },

  crypto3: {
    title: "Lesson 3 – Emerging Trends: DeFi, NFTs and the Future of Crypto",
    subLessons: [
      { id: "defi", title: "Decentralised Finance (DeFi)", content: `Peer-to-peer finance, lending, borrowing...` },
      { id: "nfts", title: "Non‑fungible Tokens (NFTs)", content: `Unique blockchain assets, examples...` },
      { id: "smart-contracts", title: "Smart Contracts & Advanced Tokens", content: `Self-executing agreements...` },
      { id: "regulation-sustainability", title: "Regulatory Landscape & Sustainability", content: `CBDCs, proof-of-stake...` },
      { id: "future-outlook", title: "Future Outlook", content: `Adoption trends, upcoming tech milestones...` },
    ],
    quiz: [
      { question: "What does NFT stand for?", options: ["New Financial Token", "Non-Fungible Token", "Network Fee Transaction"], answer: 1 },
    ],
  },
};

export const investingLessons = {
  investing1: {
    title: "Lesson 1 – Basics of Investing",
    subLessons: [
      { id: "intro", title: "Introduction", content: `Investing early helps your money grow through compounding...` },
    ],
    quiz: [
      { question: "What is compound interest?", options: ["Interest on initial amount only", "Interest on principal and accumulated interest", "No interest"], answer: 1 },
    ],
  },
  investing2: {
    title: "Lesson 2 – Types of Assets",
    subLessons: [
      { id: "assets", title: "Asset Types", content: `Equities, debt, real estate, commodities...` },
    ],
    quiz: [
      { question: "Which is a fixed-income investment?", options: ["Stock", "Bond", "NFT"], answer: 1 },
    ],
  },
};

export default {
  crypto: cryptoLessons,
  investing: investingLessons,
};
