import fastify from 'fastify';
import { register } from './register.js';
import { authenticate } from './authenticate.js';
import { profile } from './profile.js';
import { verifyJWT } from '../../middlewares/verify-jwt.js';

export async function usersRoutes(app: fastify.FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);

    app.get('/me', {onRequest: verifyJWT}, profile);
}


