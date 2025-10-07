import { it, expect, describe, beforeAll } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeAll(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createTestUser = await usersRepository.create({
            id: faker.string.uuid(),
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password_hash: await hash('123456', 6),
        })


        const { user } = await sut.execute({
            userId: createTestUser.id
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() => sut.execute({
            userId: 'not-existing-id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})