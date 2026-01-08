import request from 'supertest';
import { app } from '@/app.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register Controller (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });
    afterAll(async () => {
        await app.close();
    });

    it('should be able to register', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123'
            });

        expect(response.statusCode).toBe(201);
    });
});