import { Prisma } from '@prisma/client';
import type { Gym } from '@prisma/client';

export interface findManyNearbyParams {
    userLatitude: number;
    userLongitude: number;
}

export interface GymsRepository {
        findById(id: string): Promise<Gym | null>;
        findManyNearby(params: findManyNearbyParams): Promise<Gym[]>;
        create(data: Prisma.GymCreateInput): Promise<Gym>;
        searchMany(params: { query: string; page: number }): Promise<Gym[]>;
} 