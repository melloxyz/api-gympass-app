import { Prisma } from '@prisma/client';
import type { CheckIn } from '@prisma/client';
import { faker } from '@faker-js/faker';
import type { CheckInsRepository } from '../check-ins-repository.js';
import Dayjs  from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = [];

    async findByUserIdAndDate(userId: string, date: Date) {
        const startOfDay = Dayjs(date).startOf('day');
        const endOfDay = Dayjs(date).endOf('day');

        const checkInOnSameDate = this.items.find((checkIn) => {
            const checkInDate = Dayjs(checkIn.createdAt);
            const isOnSameDate = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);

            return checkIn.user_id === userId && isOnSameDate; // 4:20 - continua daqui mello do futuro
        })


        if (!checkInOnSameDate) {
            return null;
        }

        return checkInOnSameDate;
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return this.items
        .filter((item) => item.user_id === userId)
        .slice((page - 1) * 20, page * 20);
    }

    async countByUserId(userId: string): Promise<number> {
        return this.items.filter((item) => item.user_id === userId).length;
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) { 
        const CheckIn = { 
            id: faker.string.uuid(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
            createdAt: new Date(),
        }; 

        this.items.push(CheckIn);

        return CheckIn;
    }
}