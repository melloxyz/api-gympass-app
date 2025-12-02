import { makeGetUserProfileUseCase } from '@/services/factories/make-get-user-profile-use-case.js';
import Fastify from 'fastify';

export async function profile(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {

    const GetUserProfil = makeGetUserProfileUseCase();

    const { user } = await GetUserProfil.execute({
        userId: request.user.sub,
    });

    return reply.status(200).send({ user: {
        ...user,
        password_hash: undefined, // REMOVE A SENHA DO RETORNO
    } });
}