import { makeGetUserMetricsUseCase } from '@/services/factories/make-get-user-metrics-use-case.js';
import Fastify from 'fastify';

export async function metrics(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
        const getUserMetricsUseCase = makeGetUserMetricsUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        const { checkInsCount } = await getUserMetricsUseCase.execute({ 
            userId: request.user.sub,
        });
        
    return reply.status(201).send({
        checkInsCount,
    });
}