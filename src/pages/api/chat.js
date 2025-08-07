// pages/api/chat.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simple keyword extraction and matching
function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => ![
      'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'how', 'what', 'when', 'where', 'why', 'can', 'will', 'would',
      'could', 'should'
    ].includes(word));
}

function calculateMatchScore(userKeywords, faqKeywords, faqQuestion) {
  let score = 0;
  const faqQuestionWords = extractKeywords(faqQuestion);

  for (const userWord of userKeywords) {
    for (const faqWord of faqKeywords) {
      if (faqWord.includes(userWord) || userWord.includes(faqWord)) {
        score += 3;
      }
    }
  }

  for (const userWord of userKeywords) {
    for (const questionWord of faqQuestionWords) {
      if (questionWord.includes(userWord) || userWord.includes(questionWord)) {
        score += 2;
      }
    }
  }

  const userText = userKeywords.join(' ');
  const faqText = faqKeywords.join(' ');
  if (faqText.includes(userText) || userText.includes(faqText)) {
    score += 5;
  }

  return score;
}

function generateSuggestions() {
  return [
    "What services do you offer?",
    "How can I contact support?",
    "What are your business hours?",
    "How do I get started?",
    "What are your pricing plans?"
  ];
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message, sessionId, conversationId } = req.body;

      if (!message || !sessionId) {
        return res.status(400).json({ error: 'Message and sessionId are required' });
      }

      // Get or create conversation
      let conversation = null;
      if (conversationId) {
        conversation = await prisma.chatConversation.findUnique({ where: { id: conversationId } });
      }

      if (!conversation) {
        conversation = await prisma.chatConversation.create({ data: { sessionId } });
      }

      // Save user message
      await prisma.chatMessage.create({
        data: {
          content: message,
          isBot: false,
          conversationId: conversation.id
        }
      });

      // Extract keywords
      const userKeywords = extractKeywords(message);

      // Get FAQs
      const faqs = await prisma.fAQ.findMany({
        orderBy: { priority: 'desc' }
      });

      // Match FAQ
      let bestMatch = null;
      let bestScore = 0;

      for (const faq of faqs) {
        const score = calculateMatchScore(userKeywords, faq.keywords, faq.question);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = faq;
        }
      }

      let botResponse;
      let wasAnswered = false;
      let selectedFaqId = null;

      if (bestMatch && bestScore >= 3) {
        botResponse = bestMatch.answer;
        wasAnswered = true;
        selectedFaqId = bestMatch.id;
      } else if (bestMatch && bestScore >= 1) {
        botResponse = `I think you might be asking about "${bestMatch.question}". ${bestMatch.answer}\n\nWas this helpful? If not, please rephrase your question or contact our support team.`;
        wasAnswered = true;
        selectedFaqId = bestMatch.id;
      } else {
        const suggestions = generateSuggestions();
        botResponse = `I'm sorry, I couldn't find a specific answer. Here are some things I can help with:\n\n${suggestions.map(s => `• ${s}`).join('\n')}`;
      }

      // Save bot response
      await prisma.chatMessage.create({
        data: {
          content: botResponse,
          isBot: true,
          conversationId: conversation.id
        }
      });

      // Save analytics
      await prisma.chatAnalytics.create({
        data: {
          question: message,
          wasAnswered,
          selectedFaqId,
          sessionId
        }
      });

      return res.status(200).json({
        response: botResponse,
        conversationId: conversation.id,
        wasAnswered,
        suggestions: !wasAnswered ? generateSuggestions() : null
      });

    } catch (error) {
      console.error('Chat API error:', error);
      return res.status(500).json({
        response: "I'm sorry, I'm experiencing technical difficulties.",
        error: true
      });
    }
  }

  // GET method (for conversation history)
  if (req.method === 'GET') {
    try {
      const { conversationId } = req.query;

      if (!conversationId) {
        return res.status(400).json({ error: 'Conversation ID required' });
      }

      const messages = await prisma.chatMessage.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' }
      });

      return res.status(200).json({ messages });
    } catch (error) {
      console.error('Chat history error:', error);
      return res.status(500).json({ error: 'Failed to load chat history' });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method Not Allowed' });
}
