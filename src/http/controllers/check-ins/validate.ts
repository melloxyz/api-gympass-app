import Fastify from 'fastify';
import { z } from 'zod';
import { makeValidateCheckInUseCase } from '@/services/factories/make-validate-check-in-use-case.js';

export async function validate(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    const checkInIdParamSchema = z.object({
        checkInId: z.string().uuid(),
    });


    const { checkInId } = checkInIdParamSchema.parse(request.params);

        const validateCheckInUseCase = makeValidateCheckInUseCase(); // Inversao de dependencia, apenas trocar o repositorio aqui

        await validateCheckInUseCase.execute({ 
            checkInId,
        });
        
    return reply.status(204).send();
}