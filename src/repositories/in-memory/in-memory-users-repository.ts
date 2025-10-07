import { Prisma } from '@prisma/client';
import type { User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import type { UsersRepository } from '../users-repository.js';

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findById(id: string) {
        const user = this.items.find((item) => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }


    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email);

        if (!user) {
            return null;
        }

        return user;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: faker.string.uuid(), 
            name: data.name || faker.person.firstName(),
            email: data.email || faker.internet.email(),
            password_hash: data.password_hash || faker.internet.password(),
            createdAt: new Date(),
        }

        this.items.push(user)

        return user
    }
}
