import { it, expect, describe } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AuthenticateUseCase } from './authenticate.js'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'


describe('Authenticate Use Case', () => {
    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

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
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        const fkemail = faker.internet.email()
        const fkpassword = faker.internet.password()


        await expect(() => sut.execute({
            email: fkemail,
            password: fkpassword,
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

        it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

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