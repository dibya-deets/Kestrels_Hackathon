// pages/api/register.js
import prisma from '../../lib/prisma';
// Update path if needed
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST allowed' });
    }

    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields required' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            },
        });

        return res.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.error('Error registering:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
