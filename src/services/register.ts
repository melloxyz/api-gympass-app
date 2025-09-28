import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma.js';

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export async function registerUseCase(data: RegisterUseCaseRequest) {
    const { name, email, password } = data;

    const password_hash = await hash(password, 6);

    const findUserWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (findUserWithSameEmail) {
        throw new Error('E-mail already registered.');
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        },
    });
}