import fastify from 'fastify';
import { register } from './controllers/register.js';
import { authenticate } from './controllers/authenticate.js';

export async function appRoutes(app: fastify.FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
}


