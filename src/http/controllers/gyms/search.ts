import { makeSearchGymsUseCase } from '@/services/factories/make-search-gyms-use-case.js';
import Fastify from 'fastify';
import { z } from 'zod';


export async function search(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const seachGymsQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    });

    const { query, page } = seachGymsQuerySchema.parse(request.query);

        const searchGymsUseCase = makeSearchGymsUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        const { gyms } = await searchGymsUseCase.execute({ 
            query,
            page
        });
        
    return reply.status(201).send({
        gyms,
    });
}