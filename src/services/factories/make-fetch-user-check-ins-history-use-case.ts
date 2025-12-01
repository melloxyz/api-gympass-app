import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js";
import { FatchUsersCheckInsHistoryUseCase } from "../fatch-user-check-ins-history.js";


export function makeFetchUserCheckInsHistoryUseCase() {
        const checkInsRepository = new PrismaCheckInsRepository(); 
        const useCase = new FatchUsersCheckInsHistoryUseCase(checkInsRepository);

        return useCase;
}