import Fastify from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js';
import { AuthenticateUseCase } from '@/services/authenticate.js';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error.js';

export async function authenticate(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository(); // Inversao de dependencia, apenas trocar o repositorio aqui
        const authenticateUseCase = new AuthenticateUseCase(usersRepository);

        await authenticateUseCase.execute({ 
            email, 
            password 
        });
    } catch (err) { // TODO: Melhorar o tratamento de erros
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }   

        throw err;
    }

    return reply.status(200).send();
}