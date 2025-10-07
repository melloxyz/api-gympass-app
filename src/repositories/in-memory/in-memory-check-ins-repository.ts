import { Prisma } from '@prisma/client';
import type { CheckIn } from '@prisma/client';
import { faker } from '@faker-js/faker';
import type { CheckInsRepository } from '../check-ins-repository.js';

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = [];

    async findByUserIdAndDate(userId: string, date: Date) {
        const checkInOnSameDate = this.items.find((checkIn) => 
            checkIn.user_id === userId);


        if (!checkInOnSameDate) {
            return null;
        }

        return checkInOnSameDate;
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