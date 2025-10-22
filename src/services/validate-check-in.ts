import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

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

        checkIn.validatedAt = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}