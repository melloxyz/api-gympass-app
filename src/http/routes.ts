import fastify from 'fastify';
import { register } from './controllers/register.js';

export async function appRoutes(app: fastify.FastifyInstance) {
    app.post('/users', register);
}


