import Fastify from 'fastify';
import { z } from 'zod';
import { prisma } from '@/lib/prisma.js';

export async function register(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password, // Em um cenário real, nunca armazene senhas assim pqp
        },
    });

    return reply.status(201).send();
}