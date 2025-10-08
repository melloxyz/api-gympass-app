import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import type { GymsRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js";
import { UserCoordinatesNotFoundError } from "./errors/user-coordinates-not-found-error.js";
import { MaxDistanceError } from "./errors/max-distance-error.js";


interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude?: number;
    userLongitude?: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) {}

    async execute({ userId, gymId, userLatitude, userLongitude }: 
        CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        if (userLatitude === undefined || userLongitude === undefined) {
            throw new UserCoordinatesNotFoundError();
        }
        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            }
        );

        const MAX_DISTANCE_IN_KILOMETERS = 0.1;

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError();
        }

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdAndDate(userId, new Date());

        if (checkInOnSameDate) {
            throw new MaxNumberOfCheckInsError();
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        });

        return { checkIn };
    }
}