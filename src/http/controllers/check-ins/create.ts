import Fastify from 'fastify';
import { z } from 'zod';
import { makeCheckInUseCase } from '@/services/factories/make-check-in-use-case.js';

export async function create(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const gymIdParamSchema = z.object({
        gymId: z.string().uuid(),
    });

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine(val => {
            return Math.abs(val) <= 90;
        }),
        longitude: z.number().refine(val => {
            return Math.abs(val) <= 180;
        }),
    });

    const { gymId } = gymIdParamSchema.parse(request.params);
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body);


        const createCheckInUseCase = makeCheckInUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        await createCheckInUseCase.execute({ 
            gymId,
            userId: request.user.sub,
            userLatitude: latitude,
            userLongitude: longitude
        });
        
    return reply.status(201).send();
}