import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";


interface FatchUsersCheckInsHistoryUseCaseRequest {
    userId: string;
    page?: number;
}

interface FatchUsersCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[];
}

export class FatchUsersCheckInsHistoryUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({ userId, page }: FatchUsersCheckInsHistoryUseCaseRequest): Promise<FatchUsersCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page ?? 1);

        return { checkIns };
    } 
}