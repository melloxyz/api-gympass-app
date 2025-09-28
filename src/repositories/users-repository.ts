import { Prisma } from '@prisma/client';
import type { User } from '@prisma/client';

export interface UsersRepository {
        findByEmail(email: string): Promise<User | null>;
        create(data: Prisma.UserCreateInput): Promise<User>;
} 