// src/data/lessonContent.js

export const cryptoLessons = {
  crypto1: {
    title: "Lesson 1 – What is Cryptocurrency?",
    video: {
      title: "Watch: What is Cryptocurrency?",
      src: "/assets/Introcrypto.mp4",
      poster: "/assets/mascot.png"
    },
    subLessons: [
      {
        id: "definition-history",
        title: "Definition and History",
        content: `Definition:
A cryptocurrency is a digital or virtual currency that uses cryptography to secure transactions, control the creation of new units, and verify the transfer of assets. Unlike traditional currencies (USD, INR), cryptocurrencies exist only in digital form and operate without a central authority like a bank or government.

History (highlights):
• 1980s–1990s: Early pioneers like David Chaum built DigiCash—centralized and commercially unsuccessful.
• 2008: Amid the global financial crisis, the “Bitcoin: A Peer-to-Peer Electronic Cash System” whitepaper was published by Satoshi Nakamoto.
• 2009: Bitcoin launched—the first decentralized cryptocurrency using blockchain.
• 2015: Ethereum introduced programmable smart contracts and decentralized apps.
• 2017–2021: Rapid growth, popularizing DeFi (Decentralized Finance) and NFTs (Non‑Fungible Tokens).`
      },
      {
        id: "blockchain-basics",
        title: "Blockchain Basics",
        content: `At the heart of cryptocurrency is blockchain—a distributed digital ledger that stores data in “blocks,” linked together in chronological order.

Key ideas:
• Block: A bundle of verified transactions with a timestamp and a cryptographic hash.
• Chain: Each block references the previous block’s hash, making tampering extremely difficult.
• Distributed ledger: The full chain is stored across thousands of computers (nodes), each holding an identical copy.

Why it matters:
Changing one block would require altering every copy across the network—practically infeasible on large networks like Bitcoin or Ethereum.`
      },
      {
        id: "decentralisation-cryptography",
        title: "Decentralisation and Cryptography",
        content: `Decentralisation:
Traditional systems rely on central authorities to maintain trust. In cryptocurrency, trust is distributed—no single party can arbitrarily change rules or reverse transactions.

Cryptography:
• Hash functions: Map data to fixed-length outputs; small input changes produce very different hashes.
• Public & private keys: Your public key/address can be shared to receive funds; the private key must remain secret as it authorizes spending.
• Digital signatures: Prove a transaction came from the rightful owner without revealing the private key.`
      },
      {
        id: "types-digital-assets",
        title: "Types of Digital Assets",
        content: `Coins vs Tokens:
• Coins: Native to a blockchain (e.g., BTC on Bitcoin, ETH on Ethereum).
• Tokens: Created via smart contracts on existing chains (e.g., ERC‑20 tokens).

Common categories:
• Stablecoins (e.g., USDT, USDC): Pegged to assets like USD to reduce volatility.
• Utility tokens: Provide access/discounts within an ecosystem (e.g., BNB on Binance).
• Security tokens: Represent tokenized ownership in real-world assets (e.g., equity/real estate).`
      }
    ],
    quiz: [
      { question: "Who created Bitcoin?", options: ["Vitalik Buterin", "Elon Musk", "Satoshi Nakamoto", "David Chaum"], answer: 2 },
      { question: "What does “cryptocurrency” use to secure transactions?", options: ["Passwords", "Cryptography", "Secret vaults", "Magnetic codes"], answer: 1 },
      { question: "Which of the following is a stablecoin?", options: ["Bitcoin", "Ethereum", "USDT", "Dogecoin"], answer: 2 },
      { question: "What year was Bitcoin launched?", options: ["2008", "2009", "2015", "2020"], answer: 1 },
      { question: "Which best describes a blockchain?", options: ["A digital bank account", "A chain of coins", "A distributed ledger of linked blocks", "A social network"], answer: 2 }
    ]
  },

  crypto2: {
    title: "Lesson 2 – How Cryptocurrency Works and How to Use It",
    subLessons: [
      {
        id: "transactions-consensus",
        title: "Transactions and Consensus",
        content: `When sending crypto, you broadcast a digitally signed transaction to the network.
Steps:
1) Create & Sign: The sender signs with their private key—proving ownership.
2) Broadcast: The transaction enters the mempool (unconfirmed pool).
3) Verify: Miners/validators check balance, signature, and rules (no double-spend).
   • Proof of Work (PoW): Miners solve puzzles; winner adds the next block (Bitcoin).
   • Proof of Stake (PoS): Validators are selected based on stake; energy‑efficient (Ethereum post‑Merge).
4) Add Block: Verified transactions are bundled and appended immutably to the chain.`
      },
      {
        id: "digital-wallets",
        title: "Digital Wallets and Keys",
        content: `Wallets manage your keys and help you send/receive funds.
• Hot wallets: Internet‑connected; easy to use (e.g., MetaMask/mobile apps) but more exposed—best for small/frequent use.
• Cold wallets: Offline hardware wallets (e.g., Ledger, Trezor); ideal for long‑term, higher‑value storage.
• Public vs Private key: Share public to receive; keep private key/seed phrase secure to control funds.`
      },
      {
        id: "acquiring-storing",
        title: "Acquiring and Storing Crypto",
        content: `Acquiring:
• Centralized Exchanges (CEX): Binance, Coinbase, Kraken—fiat on‑ramps; require KYC.
• Peer‑to‑Peer: Trade directly via escrow‑enabled platforms.
• Mining (PoW) / Staking (PoS): Earn coins by securing the network.

Storing:
• Prefer cold wallets for long‑term storage.
• Back up seed phrases securely in multiple safe physical locations.
• Protect against loss/theft/damage.`
      },
      {
        id: "payments-investment",
        title: "Using Crypto: Payments & Investment",
        content: `Payments:
• Fast, often lower‑fee cross‑border transfers; in‑store via instant conversion services.

Investments:
• Long‑term “HODL”, short‑term trading, or DeFi strategies (e.g., lending/yield farming/liquidity provision). Each carries risk and requires careful research.`
      },
      {
        id: "pros-cons",
        title: "Pros and Cons",
        content: `Pros:
• Decentralization, transparency, global accessibility, fast/low-cost transfers.
Cons:
• Volatility, scams/hacks, irreversible transactions. Use reputable platforms and strong security hygiene.`
      },
      {
        id: "legal-tax",
        title: "Legal & Tax Considerations",
        content: `Regulation varies by country (from regulated to restricted/banned).
• Taxes: Gains and income from crypto may be taxable—keep detailed records.
• Compliance: CEXs enforce KYC/AML to meet regulations and reduce illicit activity.`
      }
    ],
    quiz: [
      { question: "Which consensus mechanism is used by Bitcoin?", options: ["Proof of Stake", "Proof of Work", "Proof of Authority", "Proof of Mining"], answer: 1 },
      { question: "Main difference between a hot and a cold wallet?", options: ["Hot online, cold offline", "Hot is for BTC, cold for ETH", "Hot is slower", "Hot costs more"], answer: 0 },
      { question: "Purpose of a private key?", options: ["Share address", "Sign transactions & access funds", "Mine crypto", "Verify other users"], answer: 1 },
      { question: "Which is NOT a way to acquire crypto?", options: ["Buying on exchanges", "Mining", "Printing at home", "Staking"], answer: 2 },
      { question: "One disadvantage of crypto is…", options: ["Global accessibility", "Volatility", "Fast transactions", "Decentralization"], answer: 1 }
    ]
  },

  crypto3: {
    title: "Lesson 3 – Emerging Trends: DeFi, NFTs and the Future of Crypto",
    subLessons: [
      {
        id: "defi",
        title: "Decentralised Finance (DeFi)",
        content: `DeFi provides open, programmable finance without traditional intermediaries.
Examples:
• Uniswap: Swap tokens via automated market makers (AMMs).
• Aave: Lend/borrow with crypto collateral and earn interest.
• MakerDAO: Mint DAI stablecoin via over‑collateralization.

Benefits: Open access, 24/7, transparent, programmable.
Risks: Smart contract bugs, volatility, regulatory uncertainty.`
      },
      {
        id: "nfts",
        title: "Non-fungible Tokens (NFTs)",
        content: `NFTs are unique on‑chain assets (non‑interchangeable), like digital art, collectibles, in‑game items, and media.
Value drivers: Scarcity, community/hype, creator reputation, and utility (access/perks/in‑game benefits).`
      },
      {
        id: "smart-contracts",
        title: "Smart Contracts & Advanced Tokens",
        content: `Smart contracts are self‑executing code on blockchain that run when conditions are met—automating agreements without intermediaries.

Advanced tokens:
• Governance tokens (e.g., UNI) grant voting rights.
• Wrapped tokens (e.g., WBTC) represent assets cross‑chain.
• Utility tokens power ecosystem services.`
      },
      {
        id: "regulation-sustainability",
        title: "Regulatory Landscape & Sustainability",
        content: `Regulation: Global rules evolving around consumer protection, AML, and taxation; potential trade‑offs between safety and openness.

Sustainability:
• PoW energy use is high (e.g., Bitcoin).
• PoS is far more energy‑efficient (Ethereum post‑Merge).
• Some chains target carbon‑neutral operations.`
      },
      {
        id: "future-outlook",
        title: "Future Outlook",
        content: `Adoption: More retail acceptance, gaming/metaverse economies, and DeFi maturation.
Tech: Layer‑2 scaling (e.g., Optimism/Arbitrum), cross‑chain bridges, and AI integrations in analytics, trading, and governance.`
      }
    ],
    quiz: [
      { question: "What does DeFi stand for?", options: ["Decentralized Finance", "Digital Fiat", "Distributed Files", "Deep Finance"], answer: 0 },
      { question: "An example NFT use case?", options: ["Paying electricity bills", "Owning digital art", "Sending email", "Mining Bitcoin"], answer: 1 },
      { question: "What is a smart contract?", options: ["A legal PDF", "Self‑executing on‑chain program", "Email attachment", "Bank agreement"], answer: 1 },
      { question: "Environmental concern linked to PoW?", options: ["Air pollution", "High energy consumption", "Plastic waste", "Deforestation"], answer: 1 },
      { question: "A likely future trend for crypto?", options: ["Abandon digital tech", "Integration with Web3/metaverse", "All cash", "End internet usage"], answer: 1 }
    ]
  }
};

export const investingLessons = {
  investing1: {
    title: "Lesson 1 – Basics of Investing",
    subLessons: [
      {
        id: "intro",
        title: "Introduction",
        content: `Definition & Purpose:
Investing means committing money to assets/projects expecting income or appreciation. People invest to grow wealth, beat inflation, reach goals (retirement/education/house), and generate passive income.

Risk & Return (basics):
Risk is the chance actual returns differ from expected (including loss). Returns come from capital gains and income (dividends/interest). Higher potential returns generally require higher risk.

Time Value of Money:
Money today is worth more than the same amount in the future because it can earn returns. Present Value (PV) discounts future cash flows; Future Value (FV) projects growth (e.g., FV = PV × (1+r)^n).

Compounding & Wealth Creation:
Compounding earns returns on previous returns (“interest on interest”). Starting early and reinvesting dividends over long horizons can dramatically increase outcomes.`
      }
    ],
    quiz: [
      { question: "Main goal of investment is…", options: ["Spend quickly", "Generate income/capital appreciation", "Avoid all risk", "Only save"], answer: 1 },
      { question: "Time value of money: $100 today equals $100 next year.", options: ["True", "False"], answer: 1 },
      { question: "Which best describes risk in investments?", options: ["Guaranteed return", "Possibility of loss/variation in returns", "Fixed interest", "Insurance"], answer: 1 },
      { question: "If you invest $500 at 6% compounded yearly, value after 2 years?", options: ["$530", "$560", "$561.80", "$600"], answer: 2 },
      { question: "Compounding earns returns on principal and prior returns.", options: ["True", "False"], answer: 0 }
    ]
  },

  investing2: {
    title: "Lesson 2 – Types of Assets",
    subLessons: [
      {
        id: "assets",
        title: "Asset Types",
        content: `Equities (Stocks):
Represent ownership in a company (common/preferred). Potential for capital appreciation and dividends; higher volatility and company/market risks.

Bonds (Fixed Income):
Debt instruments paying interest with principal at maturity (government, corporate, municipal). Lower risk than stocks but exposed to interest‑rate, credit, and inflation risks.

Real Estate:
Direct property ownership or via REITs. Offers rental income, appreciation, and diversification; requires capital and management; relatively illiquid.

Commodities & Alternatives:
Gold, oil, agricultural products, private equity, hedge funds, collectibles, crypto, etc. Useful for diversification/inflation hedging but can be volatile and complex.

Cash & Equivalents:
Highly liquid, e.g., savings, money market funds, T‑bills. Preserve capital and liquidity but usually underperform inflation over long periods.`
      }
    ],
    quiz: [
      { question: "Which is an equity investment?", options: ["Corporate bond", "Treasury bill", "Common stock", "Real estate"], answer: 2 },
      { question: "Bonds typically pay periodic interest (fixed income).", options: ["True", "False"], answer: 0 },
      { question: "Most liquid asset type?", options: ["Real estate", "Stocks", "Commodities", "Cash & equivalents"], answer: 3 },
      { question: "Which is a commodity?", options: ["Gold", "Corporate stock", "Treasury bond", "Savings account"], answer: 0 },
      { question: "Real estate returns can come from rent and appreciation.", options: ["True", "False"], answer: 0 }
    ]
  }
};

export default {
  crypto: cryptoLessons,
  investing: investingLessons
};
