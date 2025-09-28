import { hash } from 'bcryptjs';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.js';

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class UserAlreadyExistsError extends Error {
    constructor() {
        super('User already exists');
    }
}

export async function registerUseCase(data: RegisterUseCaseRequest) {
    const { name, email, password } = data;

    const password_hash = await hash(password, 6);

    const prismaUsersRepository = new PrismaUsersRepository();
    
    const findUserWithSameEmail = await prismaUsersRepository.findByEmail(email);

    if (findUserWithSameEmail) {
        throw new UserAlreadyExistsError();
    }

    await prismaUsersRepository.create({
        name,
        email,
        password_hash,
    });
}