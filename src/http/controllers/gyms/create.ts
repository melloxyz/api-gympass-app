import Fastify from 'fastify';
import { z } from 'zod';
import { makeCreateGymUseCase } from '@/services/factories/make-create-gym-use-case.js';

export async function create(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string().min(3),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(val => {
            return Math.abs(val) <= 90;
        }),
        longitude: z.number().refine(val => {
            return Math.abs(val) <= 180;
        }),
    });

    const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body);

        const createGymUseCase = makeCreateGymUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        await createGymUseCase.execute({ 
            title, 
            description, 
            phone,
            latitude,
            longitude
        });
        
    return reply.status(201).send();
}