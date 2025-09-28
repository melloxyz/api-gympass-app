import Fastify from 'fastify';
import { z } from 'zod';
import { RegisterUseCase, UserAlreadyExistsError } from '@/services/register.js';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js';

export async function register(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository(); // Inversao de dependencia, apenas trocar o repositorio aqui
        const registerUseCase = new RegisterUseCase(usersRepository);

        await registerUseCase.execute({ 
            name, 
            email, 
            password 
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({ message: 'Validation error' });
        }

        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: 'User already exists' });
        }

        return reply.status(500).send({ message: 'Internal server error' });
    }

    return reply.status(201).send();
}