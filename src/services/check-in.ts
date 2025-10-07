import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdAndDate(userId, new Date());

        if (checkInOnSameDate) {
            throw new Error('User has already checked in today.');
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        });

        return { checkIn };
    }
}