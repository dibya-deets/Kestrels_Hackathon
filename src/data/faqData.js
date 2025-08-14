// src/data/faqData.js
// InvesTerra FAQs (UK English). UI unchanged — just richer content.
// Each item keeps the same shape your app expects.

export const faqData = [
  // ─────────────────────────── General / Getting Started
  {
    question: "What is InvesTerra?",
    answer:
      "InvesTerra is a gamified learning platform that helps you build real-world money skills. Learn through short lessons, videos and quizzes, earn XP, level up, and unlock fun badges as you progress.",
    keywords: ["what is", "about", "platform", "overview", "money", "finance", "learn"],
    category: "general",
    priority: 10
  },
  {
    question: "Which courses are available now?",
    answer:
      "You can start with ‘Introduction to Investing’ and ‘Cryptocurrency 101’. More courses are planned — we add modules over time, so check back regularly.",
    keywords: ["courses", "available", "investing", "cryptocurrency", "modules", "lessons"],
    category: "general",
    priority: 10
  },
  {
    question: "How do I get started?",
    answer:
      "Create an account, sign in, and choose a course on the dashboard. Open each sub-lesson, watch the intro video, read the notes, and take the lesson quiz to earn XP and badges.",
    keywords: ["get started", "start", "begin", "signup", "onboarding", "new"],
    category: "general",
    priority: 10
  },
  {
    question: "Is InvesTerra free?",
    answer:
      "Yes — the current experience is free to use. If we introduce paid tiers in future, we’ll announce them in-app with clear details before anything changes.",
    keywords: ["price", "pricing", "cost", "free", "subscription", "plans"],
    category: "pricing",
    priority: 9
  },

  // ─────────────────────────── Account & Sign-in
  {
    question: "I can’t sign in — what should I check?",
    answer:
      "First, make sure your e-mail and password are correct and that Caps Lock isn’t on. If you still can’t sign in, use ‘Forgot your password?’ on the sign-in page to reset it. If the issue persists, clear site cookies for InvesTerra and try again.",
    keywords: ["sign in", "login", "password", "forgot", "cookies", "troubleshoot"],
    category: "account",
    priority: 10
  },
  {
    question: "How do I reset my password?",
    answer:
      "On the sign-in page, select ‘Forgot your password?’ and follow the instructions sent to your e-mail address.",
    keywords: ["password", "reset", "forgot", "change password"],
    category: "account",
    priority: 10
  },
  {
    question: "How do I log out securely?",
    answer:
      "Use the ‘Logout’ option in the top navigation. This ends your session on the device you’re using.",
    keywords: ["logout", "sign out", "security", "session"],
    category: "account",
    priority: 8
  },
  {
    question: "My e-mail auto-fills after logout. Is that normal?",
    answer:
      "Yes — that is your browser’s password manager, not InvesTerra. You can disable auto-fill for this site in your browser settings, or we’ll hide auto-fill using our form controls where possible.",
    keywords: ["autofill", "auto fill", "remember", "email saved", "browser"],
    category: "account",
    priority: 7
  },

  // ─────────────────────────── Learning Flow, Progress, XP
  {
    question: "How does progress tracking work?",
    answer:
      "Your progress is saved to your account. Opening all sub-lessons unlocks the quiz. Completing a quiz records the lesson as complete, adds XP, and may unlock a badge. Progress is reflected across the dashboard, course cards, and lesson pages.",
    keywords: ["progress", "sync", "tracking", "saved", "lessons completed"],
    category: "learning",
    priority: 10
  },
  {
    question: "How do XP and levels work?",
    answer:
      "You gain XP by completing lessons and quizzes. XP contributes to your level; each 100 XP moves you to the next level. Your current XP and the XP to the next level are shown on the lesson sidebar.",
    keywords: ["xp", "experience", "level", "level up", "points"],
    category: "learning",
    priority: 9
  },
  {
    question: "What are badges and how do I unlock them?",
    answer:
      "Badges are small rewards for milestones. On most courses you’ll unlock badges as you complete lesson quizzes: e.g., your first quiz, half-way through, and all lessons completed.",
    keywords: ["badges", "rewards", "achievements", "unlock"],
    category: "learning",
    priority: 9
  },
  {
    question: "Can I retake a quiz?",
    answer:
      "Yes. You can reopen a lesson and retake the quiz to practise. Your most recent pass still counts towards progress and badges.",
    keywords: ["quiz", "retake", "repeat", "try again", "test"],
    category: "learning",
    priority: 8
  },
  {
    question: "Do you issue certificates?",
    answer:
      "Not yet. Certificates are on our roadmap. For now, your profile shows levels, XP, and badges as proof of completion.",
    keywords: ["certificate", "certification", "proof", "completion"],
    category: "learning",
    priority: 6
  },

  // ─────────────────────────── Course Content
  {
    question: "What will I learn in Introduction to Investing?",
    answer:
      "You’ll cover the purpose of investing, risk and return, the time value of money, compounding, and key asset types such as shares, bonds, property and commodities — all explained in plain English.",
    keywords: ["investing", "introduction", "basics", "risk", "return", "compounding", "assets"],
    category: "courses",
    priority: 9
  },
  {
    question: "What will I learn in Cryptocurrency 101?",
    answer:
      "You’ll learn what cryptocurrency is, how blockchains work, wallets and keys, and common digital assets. We focus on understanding, not speculation.",
    keywords: ["crypto", "cryptocurrency", "blockchain", "wallets", "keys"],
    category: "courses",
    priority: 8
  },

  // ─────────────────────────── Devices, Browser, Video
  {
    question: "Which devices and browsers are supported?",
    answer:
      "InvesTerra works on modern desktop and mobile browsers such as Chrome, Edge, Firefox and Safari. Keep your browser up to date for the best experience.",
    keywords: ["devices", "browser", "support", "iphone", "android", "desktop"],
    category: "technical",
    priority: 8
  },
  {
    question: "A lesson video won’t play — what can I try?",
    answer:
      "Check your connection, then refresh the page. Ensure your browser allows media playback and that sound isn’t muted. If the video still won’t play, try another browser or clear the site cache.",
    keywords: ["video", "playback", "won't play", "sound", "mute"],
    category: "technical",
    priority: 9
  },
  {
    question: "The page looks odd or stuck. How do I fix it?",
    answer:
      "Press hard refresh (Shift+Refresh), clear the site cache, or try a private window. If you’ve just logged out and the form still shows your details, that’s your browser’s auto-fill.",
    keywords: ["bug", "issue", "stuck", "cache", "reload", "refresh"],
    category: "technical",
    priority: 7
  },

  // ─────────────────────────── Data, Privacy & Safety
  {
    question: "How do you handle my data?",
    answer:
      "We store only the information needed to run your account and track progress. We don’t sell your personal data. You can request deletion of your account and learning history at any time.",
    keywords: ["privacy", "data", "gdpr", "delete", "account removal"],
    category: "privacy",
    priority: 10
  },
  {
    question: "Is InvesTerra suitable for young learners?",
    answer:
      "Content is written in clear, neutral language. If you’re under the age of digital consent in your country, please sign up with a parent or guardian’s permission.",
    keywords: ["age", "children", "safety", "young", "guardian"],
    category: "general",
    priority: 7
  },

  // ─────────────────────────── Features & Roadmap
  {
    question: "Will new courses and features be added?",
    answer:
      "Yes. We ship improvements continuously — additional lessons, challenges, and ways to track progress.",
    keywords: ["roadmap", "features", "updates", "new courses"],
    category: "general",
    priority: 6
  },
  {
    question: "Can teachers or organisations use InvesTerra?",
    answer:
      "Classroom and group features are on our roadmap. For now, learners can study individually and share progress.",
    keywords: ["teacher", "school", "organisation", "class", "group"],
    category: "general",
    priority: 5
  },

  // ─────────────────────────── Support
  {
    question: "How do I contact support?",
    answer:
      "Use the yellow chat bubble in the bottom-right to ask a question, or contact us via the help details in the site footer.",
    keywords: ["support", "contact", "help", "chat", "email"],
    category: "support",
    priority: 10
  },
  {
    question: "How do I report a bug or suggest a feature?",
    answer:
      "Send us a message using the in-app chat with steps to reproduce or your idea. Screenshots or short screen recordings are extremely helpful.",
    keywords: ["bug", "feedback", "feature request", "report", "suggestion"],
    category: "support",
    priority: 8
  },

  // ─────────────────────────── Troubleshooting specifics
  {
    question: "My progress doesn’t match across pages.",
    answer:
      "Open the lesson page once to refresh your progress, then revisit the dashboard. If you’ve just completed a quiz in another tab, switch back or reload to sync.",
    keywords: ["progress mismatch", "sync", "dashboard", "lesson", "quiz"],
    category: "troubleshooting",
    priority: 9
  },
  {
    question: "I completed all sub-lessons but the quiz is still locked.",
    answer:
      "Each sub-lesson needs to be opened at least once. Close and reopen the last section, then check the ‘Lesson Quiz’ card. If it’s still locked, refresh the page.",
    keywords: ["quiz locked", "sub lessons", "open all", "unlock"],
    category: "troubleshooting",
    priority: 9
  },
  {
    question: "I passed a quiz but didn’t receive a badge.",
    answer:
      "Badges unlock after quiz passes and may appear after a short refresh. Open the lesson page again or reload the course dashboard to update the badge state.",
    keywords: ["badge", "not unlocked", "quiz pass", "refresh"],
    category: "troubleshooting",
    priority: 8
  },
  {
    question: "Why do I see a server error on the sign-in routes?",
    answer:
      "This can happen if your session cookies are stale or your browser blocked third-party cookies. Clear cookies for the site and sign in again.",
    keywords: ["server error", "auth", "cookies", "session", "jwt"],
    category: "troubleshooting",
    priority: 7
  }
];
