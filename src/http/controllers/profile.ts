import Fastify from 'fastify';

export async function profile(request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) {
    await request.jwtVerify();

    return reply.status(200).send();
}