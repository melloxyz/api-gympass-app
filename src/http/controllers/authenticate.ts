import Fastify from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error.js';
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case.js';

export async function authenticate(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        await authenticateUseCase.execute({ 
            email, 
            password 
        });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }   

        throw err;
    }

    return reply.status(200).send();
}