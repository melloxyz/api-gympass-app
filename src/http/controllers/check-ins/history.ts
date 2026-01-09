import { makeFetchUserCheckInsHistoryUseCase } from '@/services/factories/make-fetch-user-check-ins-history-use-case.js';
import Fastify from 'fastify';
import { z } from 'zod';


export async function history(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = checkInHistoryQuerySchema.parse(request.query);

        const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({ 
            userId: request.user.sub,
            page,
        });
        
    return reply.status(201).send({
        checkIns,
    });
}