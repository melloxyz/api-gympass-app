import { makeFetchNearbyGymsUseCase } from '@/services/factories/make-fetch-nearby-gyms-use-case.js';
import Fastify from 'fastify';
import { z } from 'zod';


export async function nearby(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const seachGymsQuerySchema = z.object({
        latitude: z.number().refine(val => {
            return Math.abs(val) <= 90;
        }),
        longitude: z.number().refine(val => {
            return Math.abs(val) <= 180;
        })
    });

    const { latitude, longitude } = seachGymsQuerySchema.parse(request.query);

        const nearbyGymsUseCase = makeFetchNearbyGymsUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        const { gyms } = await nearbyGymsUseCase.execute({ 
            userLatitude: latitude,
            userLongitude: longitude
        });
        
    return reply.status(201).send({
        gyms,
    });
}