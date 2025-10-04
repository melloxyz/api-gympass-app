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

    it('should be able to authenticate', async () => {
        const fkname = faker.person.firstName()
        const fkemail = faker.internet.email()
        const fkpassword = faker.internet.password()

        await usersRepository.create({
            name: fkname,
            email: fkemail,
            password_hash: await hash(fkpassword, 6),
        })

        const { user } = await sut.execute({
            email: fkemail,
            password: fkpassword,
        })


        expect(user.id).toEqual(expect.any(String))
    })

        it('should not be able to authenticate with wrong email', async () => {
        const fkemail = faker.internet.email()
        const fkpassword = faker.internet.password()


        await expect(() => sut.execute({
            email: fkemail,
            password: fkpassword,
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

        it('should not be able to authenticate with wrong password', async () => {
        const fkname = faker.person.firstName()
        const fkemail = faker.internet.email()
        const fkpassword = faker.internet.password()

        await usersRepository.create({
            name: fkname,
            email: fkemail,
            password_hash: await hash(fkpassword, 6),
        })


        await expect(() => sut.execute({
            email: fkemail,
            password: '12345678',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    
}) 