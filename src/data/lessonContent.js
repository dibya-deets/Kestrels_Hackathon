// src/data/lessonContent.js

export const cryptoLessons = {
  crypto1: {
    title: "Lesson 1 – What is Cryptocurrency?",
    video: {
      title: "Watch: What is Cryptocurrency?",
      src: "/assets/Introcrypto_lesson1.mp4",
      poster: "/assets/mascot.png"
    },
    subLessons: [
      {
        id: "definition-history",
        title: "Definition and History",
        content: `A cryptocurrency is a digital or virtual currency that uses cryptography to secure transactions, control the creation of new units, and verify the transfer of assets. Unlike traditional currencies (USD, INR), cryptocurrencies exist only in digital form and operate without a central authority like a bank or government.

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
        content: `Traditional systems rely on central authorities to maintain trust. In cryptocurrency, trust is distributed—no single party can arbitrarily change rules or reverse transactions.

Cryptography:
• Hash functions: Map data to fixed-length outputs; small input changes produce very different hashes.
• Public & private keys: Your public key/address can be shared to receive funds; the private key must remain secret as it authorizes spending.
• Digital signatures: Prove a transaction came from the rightful owner without revealing the private key.`
      },
      {
        id: "types-digital-assets",
        title: "Types of Digital Assets",
        content: `
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


// --- Replace only the investingLessons object below ---

export const investingLessons = {
  investing1: {
    title: "Lesson 1 – Introduction to Investing",
    video: {
      title: "Watch: Invest 101",
      src: "/assets/introInvest_lesson1.mp4",
      poster: "/assets/mascot.png",
    },
    subLessons: [
      {
        id: "definition-purpose",
        title: "Definition and Purpose of Investment",
        content: `What is Investment?
• Investment is committing money or capital to an asset, project, or venture expecting income or capital appreciation over time.
• It can be in financial instruments (stocks, bonds, funds), real estate, or a business.

Why Do People Invest?
• Generate returns via dividends, interest, or price appreciation.
• Build long-term wealth and increase net worth.
• Beat inflation to preserve purchasing power.
• Meet goals (retirement, education, buying a home, emergency fund).
• Create passive income (e.g., rental property, dividend stocks).

Types of Investments
• Financial assets: Stocks, bonds, mutual funds, ETFs.
• Physical assets: Real estate, commodities like gold; art/collectibles.
• Alternative assets: Private equity, hedge funds, cryptocurrencies.

Investment vs. Saving
• Saving: low risk/low return (bank accounts, term deposits).
• Investing: higher risk with potential for higher returns.`
      },
      {
        id: "risk-return-basics",
        title: "Risk and Return Basics",
        content: `Understanding Risk
• Risk = the chance actual returns differ from expected (incl. potential capital loss).

Types of Risk
• Market risk: price swings due to market forces.
• Credit risk: borrower/issuer defaults on payments.
• Liquidity risk: hard to sell quickly without loss.
• Inflation risk: returns fail to keep up with inflation.
• Interest-rate risk: rate changes affect bond prices and loan costs.

Understanding Return
• Return is profit/loss as a percentage.
• Components: capital gains, dividends/interest, and total return (gains + income).

Risk-Return Trade-off
• Higher potential returns usually require higher risk.
• Conservative assets (e.g., government bonds) → lower risk/returns.
• Aggressive assets (e.g., equities/startups) → higher risk/return potential.

Measuring Risk/Return
• Standard deviation (volatility), Beta (market sensitivity), Sharpe ratio (return per unit of risk).`
      },
      {
        id: "time-value-money",
        title: "Time Value of Money (TVM)",
        content: `Concept
• A dollar today is worth more than a dollar tomorrow because it can earn returns.

Formulas
• Future Value (FV): FV = PV × (1 + r)^n
• Present Value (PV): PV = FV ÷ (1 + r)^n

Why it matters
• Compare investments with different cash-flow timing.
• Key to valuing bonds, stocks, projects, and retirement plans.`
      },
      {
        id: "compounding-wealth",
        title: "Compounding and Wealth Creation",
        content: `What is Compounding?
• Earning returns on both the original principal and prior returns (“interest on interest”).

Why it’s powerful
• Growth accelerates with time; consistent, early investing compounds strongly.

Compound Interest (general form)
• A = P × (1 + r/n)^(n×t)
  – A = amount; P = principal; r = annual rate; n = compounds/year; t = years.

Examples & Strategy
• $1,000 at 8% annually grows to ~$4,660 in 20 years.
• Reinvest dividends/interest; be consistent and long-term focused.`
      }
    ],
    quiz: [
      { question: "What is the main goal of investment?", options: ["To spend money quickly", "To generate income or capital appreciation", "To avoid risk at all costs", "To save money without any returns"], answer: 1 },
      { question: "The time value of money means $100 today equals $100 a year from now.", options: ["True", "False"], answer: 1 },
      { question: "Which best describes risk in investments?", options: ["Guaranteed return", "Possibility of losing some or all of the money", "A fixed interest payment", "A form of insurance"], answer: 1 },
      { question: "If you invest $500 at 6% compounded yearly, what is it worth after 2 years?", options: ["$530", "$560", "$561.80", "$600"], answer: 2 },
      { question: "Compounding lets you earn on the principal and prior returns.", options: ["True", "False"], answer: 0 }
    ]
  },

  investing2: {
    title: "Lesson 2 – Types of Assets",
    subLessons: [
      {
        id: "stocks-equities",
        title: "Stocks and Equities",
        content: `What are Stocks?
• Ownership shares in a company; shareholders may get dividends and voting rights.

How Stocks Work
• Issued to raise capital; prices move with company performance, sentiment, and economy.

Types
• Common stock (voting, potential dividends).
• Preferred stock (priority dividends, typically no votes).

Why Invest?
• Potential for high returns via appreciation and dividends; long-run outperformance historically.

Risks
• Volatility; company-specific and market risks.

Exchanges & Valuation
• Traded on exchanges (NYSE, NASDAQ, LSE).
• Common valuation: P/E, Dividend Discount Model, plus technical analysis.`
      },
      {
        id: "bonds-fixed-income",
        title: "Bonds and Fixed Income",
        content: `What are Bonds?
• Debt instruments paying periodic interest (coupon) and returning principal at maturity.

Key Features
• Face (par) value, coupon rate, maturity date.

Types
• Government, corporate, municipal, zero-coupon.

Why Invest?
• Steady income, lower volatility than stocks, portfolio diversification.

Risks
• Interest-rate, credit/default, and inflation risks.
• Pricing moves inverse to yields; can trade at premium/discount.`
      },
      {
        id: "real-estate",
        title: "Real Estate",
        content: `What is Real Estate Investing?
• Buying property (residential, commercial, land) to earn rental income and/or capital gains.

Forms
• Direct ownership; REITs (publicly traded portfolios of properties).

Why Invest?
• Income + potential appreciation; tangible asset backing; inflation hedge.

Risks/Considerations
• High capital and management needs; illiquidity; market cycles; maintenance/tax/insurance costs.`
      },
      {
        id: "commodities-alternatives",
        title: "Commodities and Alternative Assets",
        content: `Commodities
• Raw materials (gold, oil, gas, agricultural and industrial metals).

Why Invest?
• Diversification, inflation hedge, protection in certain downturns.

Alternative Assets
• Private equity, hedge funds, collectibles (art/wine), crypto, venture capital.

Risks
• High volatility; supply-demand/geopolitical/weather shocks; storage/transport; regulatory/tech risks (e.g., crypto).`
      },
      {
        id: "cash-equivalents",
        title: "Cash and Cash Equivalents",
        content: `What are They?
• Most liquid assets: cash, checking/savings, money market funds, short-term treasuries.

Role
• Safety and liquidity for emergencies/opportunities; usually low returns.

Examples
• T-bills, short CDs, commercial paper.

Pros/Cons
• Stability and easy access, but often below inflation → purchasing power erosion.`
      }
    ],
    quiz: [
      { question: "Which is an equity investment?", options: ["Corporate bond", "Treasury bill", "Common stock", "Real estate property"], answer: 2 },
      { question: "Bonds are fixed-income securities that usually pay interest periodically.", options: ["True", "False"], answer: 0 },
      { question: "Which asset is typically most liquid?", options: ["Real estate", "Stocks", "Commodities", "Cash and cash equivalents"], answer: 3 },
      { question: "Which of these is a commodity?", options: ["Gold", "Corporate stock", "Treasury bond", "Savings account"], answer: 0 },
      { question: "Real estate returns can come from rent and price appreciation.", options: ["True", "False"], answer: 0 }
    ]
  },

  investing3: {
    title: "Lesson 3 – Portfolio Diversification & Asset Allocation",
    subLessons: [
      {
        id: "diversification",
        title: "What is Portfolio Diversification?",
        content: `Definition & Purpose
• Spread investments across assets/industries/regions to reduce risk (“don’t put all eggs in one basket”).

How it Works
• Combine assets with low/negative correlation; losses in one area can be offset by gains in another.

Types
• Across asset classes (stocks, bonds, real estate, cash, commodities).
• Within asset classes (sectors).
• Geographic (domestic/international).
• Investment style (growth/value, small/large cap).

Limitations
• Reduces but doesn’t eliminate risk—systemic crashes can hit most assets.
• Over-diversification can dilute returns and add complexity.`
      },
      {
        id: "asset-allocation",
        title: "Asset Allocation Strategies",
        content: `What is Asset Allocation?
• Deciding portfolio weights across asset classes based on goals, risk tolerance, and time horizon.

Common Models
• Conservative (more bonds/cash), Balanced (mix), Aggressive (more stocks/alts).

Influences
• Age/time horizon, goals, market/economic outlook.

Dynamic vs. Strategic
• Strategic: set targets and stick with them.
• Tactical: short-term adjustments for opportunities/risks.

Rebalancing’s Role
• Keeps your actual weights close to targets over time.`
      },
      {
        id: "risk-tolerance",
        title: "Risk Tolerance & Investor Profiles",
        content: `Risk Tolerance
• Ability/willingness to handle losses/volatility.

Types
• Conservative, Moderate, Aggressive.

Assessing
• Personal/financial factors, emotional comfort with drawdowns, investing experience/knowledge.

Profiles
• Income-focused (regular income), Growth-focused (appreciation), Speculative (high risk/high potential).

Why Match Profile?
• Better alignment reduces panic decisions in downturns.`
      },
      {
        id: "benefits-limitations",
        title: "Benefits and Limitations",
        content: `Benefits
• Risk reduction, smoother returns, capture opportunities, tailor to goals.

Limitations
• No guarantees in broad crashes; complexity/costs; potential return dilution; timing risk when shifting allocations.`
      },
      {
        id: "rebalancing",
        title: "Rebalancing Your Portfolio",
        content: `What is Rebalancing?
• Realign back to target allocation after market moves.

Why Rebalance?
• Keeps risk aligned; naturally “sell high, buy low”; prevents unintended exposures.

How Often?
• Periodic (quarterly/semi-annual/annual) or threshold-based (e.g., ±5%).

Methods
• Manual, automatic, or via cash-flow rebalancing.

Costs/Considerations
• Taxes/fees/trading costs—avoid over-trading.`
      }
    ],
    quiz: [
      { question: "Main purpose of diversification?", options: ["Increase risk", "Reduce risk by spreading across assets", "Invest only in one type", "Avoid bonds entirely"], answer: 1 },
      { question: "Asset allocation = deciding portfolio weights across asset classes.", options: ["True", "False"], answer: 0 },
      { question: "Most important factor for allocation?", options: ["Favorite stock", "Risk tolerance & goals", "Only current trends", "Gold price"], answer: 1 },
      { question: "Rebalancing means adjusting to maintain target allocation.", options: ["True", "False"], answer: 0 },
      { question: "NOT a benefit of diversification?", options: ["Reduce unsystematic risk", "Guaranteed profits", "Smoother returns", "Exposure to multiple assets"], answer: 1 }
    ]
  },

  investing4: {
    title: "Lesson 4 – Course Wrap-Up Quiz",
    subLessons: [
      {
        id: "wrapup",
        title: "Wrap-Up",
        content: `Final check! Review your notes on compounding, TVM, asset types, diversification, and allocation—then take the wrap-up quiz below. Good luck!`
      }
    ],
    quiz: [
      { question: "Core purpose of diversification?", options: ["Maximize risk", "Spread risk across assets", "Hold only stocks", "Ensure fixed returns"], answer: 1 },
      { question: "8% annual returns with reinvested earnings demonstrates…", options: ["Liquidity", "Compounding", "Inflation", "Asset allocation"], answer: 1 },
      { question: "Most liquid asset type?", options: ["Real estate", "Commodities", "Cash & cash equivalents", "Corporate bonds"], answer: 2 },
      { question: "Bonds typically serve which goal?", options: ["High-risk speculation", "Income generation & capital preservation", "Tax avoidance", "Double-digit guaranteed returns"], answer: 1 },
      { question: "Time value of money means…", options: ["Money today is worth less than tomorrow", "Money today is worth more than same amount tomorrow", "All money has same value over time", "Only savings accounts create value"], answer: 1 },
      { question: "Asset allocation refers to…", options: ["Picking one best stock yearly", "Dividing investments among categories (stocks/bonds/real estate)", "Only buying government bonds", "Following friends’ tips"], answer: 1 },
      { question: "Limitation of diversification?", options: ["Guarantees profits", "Cannot eliminate market-wide risk", "Maximizes volatility", "Prevents any loss"], answer: 1 },
      { question: "Key risk of real estate investing?", options: ["Low opportunity cost", "Illiquidity & high capital needs", "Instant liquidation", "Zero management effort"], answer: 1 },
      { question: "Stocks surged above target weight. To rebalance you should…", options: ["Buy more stocks", "Do nothing", "Sell stocks and buy other assets (e.g., bonds)", "Withdraw to cash"], answer: 2 },
      { question: "Greatest influence on allocation choices?", options: ["Financial goals & personal risk tolerance", "Next year’s forecast", "Social media advice", "Interest-rate predictions only"], answer: 0 }
    ]
  }
};

// --- end investingLessons update ---

export default {
  crypto: cryptoLessons,
  investing: investingLessons
};
