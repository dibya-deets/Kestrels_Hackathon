// src/data/seedFAQs.js
import { PrismaClient } from '@prisma/client';
import { faqData } from './faqData.js';

const prisma = new PrismaClient();

async function seedFAQs() {
  try {
    console.log('🌱 Starting FAQ seeding process...');
    
    // Clear existing FAQs (optional - remove this if you want to keep existing data)
    const deletedCount = await prisma.fAQ.deleteMany();
    console.log(`🗑️  Cleared ${deletedCount.count} existing FAQs`);
    
    // Insert new FAQs
    let createdCount = 0;
    for (const faq of faqData) {
      await prisma.fAQ.create({
        data: faq
      });
      createdCount++;
      console.log(`✓ Created FAQ: "${faq.question}"`);
    }
    
    console.log(`\n✅ Successfully seeded ${createdCount} FAQs!`);
    console.log('🎉 Your chatbot is ready to use!');
    
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('📦 Database connection closed');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedFAQs();
}

export { seedFAQs };