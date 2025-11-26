import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error.js";

interface ValidateCheckInRequest {
    checkInId: string;
}

interface ValidateCheckInResponse {
    checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({ checkInId }: 
        ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        const  distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.createdAt,
            'minute',
        );

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError();
        }

        checkIn.validatedAt = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}