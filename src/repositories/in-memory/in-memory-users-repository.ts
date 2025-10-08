import { Prisma } from '@prisma/client';
import type { User } from '@prisma/client';
import type { UsersRepository } from '../users-repository.js';
import { randomUUID } from 'crypto';

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
            id: randomUUID(),
            name: data.name as string,
            email: data.email as string,
            password_hash: data.password_hash as string,
            createdAt: new Date(),
        }

        this.items.push(user)

        return user
    }
}
