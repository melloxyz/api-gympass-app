import { it, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './check-in.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { Decimal } from '@prisma/client/runtime/library.js'


let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check Ins Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'Everest Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-27.2092052),
            longitude: new Decimal(-49.6401091),
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0)) // 20 de janeiro de 2024, 08:00:00

        const userId = 'user-01'
        const gymId = 'gym-01'

        await sut.execute({
            userId,
            gymId,
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(() => sut.execute({
            userId,
            gymId,
        })).rejects.toBeInstanceOf(Error)
    })

    it('should  be able to check in on a different day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0)) // 20 de janeiro de 2024, 08:00:00 

        const userId = 'user-01'
        const gymId = 'gym-01'

        await sut.execute({
            userId,
            gymId,
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0)) // 21 de janeiro de 2024, 08:00:00

        const { checkIn } = await sut.execute({
            userId,
            gymId,
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})
