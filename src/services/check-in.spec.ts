import { it, expect, describe, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './check-in.js'


let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check Ins Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: faker.string.uuid(),
            gymId: faker.string.uuid(),
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})