import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { RegisterUseCase } from "../register.js";

export function makeRegisterUseCase() {
        const usersRepository = new PrismaUsersRepository(); // Inversao de dependencia, apenas trocar o repositorio aqui
        const registerUseCase = new RegisterUseCase(usersRepository);

        return registerUseCase;
}