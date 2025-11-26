import type { Gym, Prisma } from "@prisma/client";
import type { findManyNearbyParams, GymsRepository } from "../gyms-repository.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaGymsRepository implements GymsRepository {
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            },
        });

        return gym;
    }

    async findManyNearby(params: findManyNearbyParams) {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${params.userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.userLongitude}) ) + sin( radians(${params.userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms;
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        });

        return gym;
    }

    async searchMany(params: { query: string; page: number; }) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: params.query,
                },
            },
            take: 20,
            skip: (params.page - 1) * 20,
        });

        return gyms;
    }
}