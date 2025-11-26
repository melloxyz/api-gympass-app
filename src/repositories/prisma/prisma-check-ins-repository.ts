import type { CheckIn, Prisma } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins-repository.js";
import { prisma } from "@/lib/prisma.js";
import dayjs, { Dayjs } from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId,
            },
            take: 20,
            skip: (page - 1) * 20,
        });
        return checkIns; 
    }

    async findByUserIdAndDate(userId: string, date: Date) {
        const startOfDay = dayjs(date).startOf('day');
        const endOfDay = dayjs(date).endOf('day');

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                createdAt: {
                    gte: startOfDay.toDate(),
                    lte: endOfDay.toDate(),
                },
            },
        });

        return checkIn;
    }

    async findById(checkInId: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id: checkInId,
            },
        });

        return checkIn;
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({
            where: {
                user_id: userId,
            },
        });

        return count;
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        });

        return checkIn;
    }

    async save(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id,
            },
            data,
        });

        return checkIn;
    }
}