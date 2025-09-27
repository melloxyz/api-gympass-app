import { faker } from '@faker-js/faker';
import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
    data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
    }
});

