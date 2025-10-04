import { it, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.js'
import { faker } from '@faker-js/faker'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistError } from './errors/user-already-exists-error.js'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const password = faker.internet.password()

        const { user } = await sut.execute({
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password,
        })
        
        const isPasswordCorrectlyHashed = await compare(
            password,
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with an existing email', async () => {
        const password = faker.internet.password()
        const email = faker.internet.email()

        await sut.execute({
            name: faker.person.firstName(),
            email,
            password,
        })

        await expect(() =>
        sut.execute({
        name: faker.person.firstName(),
        email,
        password,
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistError)
    })
}) 