import Fastify from 'fastify';
import { z } from 'zod';
import { registerUseCase } from '@/services/register.js';

export async function register(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        await registerUseCase({ 
            name, 
            email, 
            password 
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(409).send();
        }
    }

    return reply.status(201).send();
}