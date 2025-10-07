import { it, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { faker } from '@faker-js/faker'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './check-in.js'


let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check Ins Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: faker.string.uuid(),
            gymId: faker.string.uuid(),
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0)) // 20 de janeiro de 2024, 08:00:00

        const userId = faker.string.uuid()
        const gymId = faker.string.uuid()

        await sut.execute({
            userId,
            gymId,
        })

        await expect(() => sut.execute({
            userId,
            gymId,
        })).rejects.toBeInstanceOf(Error)
    })

    it('should  be able to check in on a different day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0)) // 20 de janeiro de 2024, 08:00:00 

        const userId = faker.string.uuid()
        const gymId = faker.string.uuid()

        await sut.execute({
            userId,
            gymId,
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0)) // 21 de janeiro de 2024, 08:00:00

        const { checkIn } = await sut.execute({
            userId,
            gymId,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})
