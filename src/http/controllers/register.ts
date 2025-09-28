import Fastify from 'fastify';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma.js';

export async function register(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    const password_hash = await hash(password, 6);

    const findUserWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (findUserWithSameEmail) {
        return reply.status(409).send({
            message: 'Email already registered',
        });
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        },
    });

    return reply.status(201).send();
}