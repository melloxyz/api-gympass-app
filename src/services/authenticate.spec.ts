import { it, expect, describe, beforeAll } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AuthenticateUseCase } from './authenticate.js'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeAll(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    // Factory Functions para usuarios de teste
    async function createTestUser(password: string) {
        const user = {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password,
        }

        await usersRepository.create({
            name: user.name,
            email: user.email,
            password_hash: await hash(password, 6),
        })

        return user
    }

    it('should be able to authenticate', async () => {
        const password = faker.internet.password()
        const user = await createTestUser(password)

        const { user: authenticatedUser } = await sut.execute({
            email: user.email,
            password,
        })

        expect(authenticatedUser.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => sut.execute({
            email: faker.internet.email(),
            password: faker.internet.password(),
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const password = faker.internet.password()
        const user = await createTestUser(password)

        await expect(() => sut.execute({
            email: user.email,
            password: '12345678', // senha errada
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})