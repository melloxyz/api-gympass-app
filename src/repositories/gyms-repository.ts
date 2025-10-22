import { Prisma } from '@prisma/client';
import type { Gym } from '@prisma/client';

export interface GymsRepository {
        findById(id: string): Promise<Gym | null>;
        create(data: Prisma.GymCreateInput): Promise<Gym>;
        searchMany(params: { query: string; page: number }): Promise<Gym[]>;
} 