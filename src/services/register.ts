import type { UsersRepository } from '@/repositories/users-repository.js';
import { hash } from 'bcryptjs';

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

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

    await this.usersRepository.create({
        name,
        email,
        password_hash,
        });
    }
}