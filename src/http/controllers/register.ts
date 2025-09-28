import Fastify from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '@/services/register.js';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js';
import { UserAlreadyExistError } from '@/services/errors/user-already-exists-error.js';

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
    } catch (err) { // TODO: Melhorar o tratamento de erros
        if (err instanceof UserAlreadyExistError) {
            return reply.status(409).send({ message: err.message });
        }   

        return reply.status(500).send(); // MELHORE SAPORRA
    }

    return reply.status(201).send();
}