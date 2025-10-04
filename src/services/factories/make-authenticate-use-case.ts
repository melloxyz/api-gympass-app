import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { AuthenticateUseCase } from "../authenticate.js";


export function makeAuthenticateUseCase() {
        const usersRepository = new PrismaUsersRepository(); // Inversao de dependencia, apenas trocar o repositorio aqui
        const authenticateUseCase = new AuthenticateUseCase(usersRepository);

        return authenticateUseCase;
}