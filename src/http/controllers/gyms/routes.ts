import fastify from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt.js';

export async function gymsRoutes(app: fastify.FastifyInstance) {
    app.addHook('onRequest', verifyJWT);

    app.get('/gyms/search', await import('./search.js').then((module) => module.search));
    app.get('/gyms/nearby', await import('./nearby.js').then((module) => module.nearby));


    app.post('/gyms', await import('./create.js').then((module) => module.create));
}


