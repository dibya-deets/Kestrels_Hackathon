// pages/api/register.js
import prisma from '../../lib/prisma';
// Update path if needed
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST allowed' });
    }

    try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

        // 1) email unique check
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
        return res.status(409).json({ message: 'User already exists' });
        }

        // 2) hash and create
        const hash = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword: hash,   // <-- matches your schema
            // other fields have defaults; no need to set them here
        },
        select: { id: true, name: true, email: true, createdAt: true },
        });

        return res.status(201).json({ message: 'User created', user });
    } catch (err) {
        // Surface Prisma error details in dev to debug quickly
        console.error('Error registering:', err);
        return res.status(500).json({
        message: 'Server error',
        code: err.code,
        meta: err.meta,
        detail:
            process.env.NODE_ENV !== 'production'
            ? (err.message || String(err))
            : undefined,
        });
    }
    }