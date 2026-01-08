import fastify from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt.js';

export async function gymsRoutes(app: fastify.FastifyInstance) {
    app.addHook('onRequest', verifyJWT);
}


