import Fastify from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistError } from '@/services/errors/user-already-exists-error.js';
import { makeRegisterUseCase } from '@/services/factories/make-register-use-case.js';

export async function register(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        await registerUseCase.execute({ 
            name, 
            email, 
            password 
        });
    } catch (err) {
        if (err instanceof UserAlreadyExistError) {
            return reply.status(409).send({ message: err.message });
        }   

        throw err;
    }

    return reply.status(201).send();
}