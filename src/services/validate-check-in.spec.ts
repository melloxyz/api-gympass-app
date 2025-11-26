import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'


let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validade Check-in Use Case', () => {
    beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
    })

    afterEach(() => {
    vi.useRealTimers()
    })

    it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
        checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check-in', async () => {
        await expect(() =>
            sut.execute({
                checkInId: 'inexistent-check-in-id',
        }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to validate check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2025, 0, 1, 13, 40)) // Jan 1, 2025, 13:40

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        vi.advanceTimersByTime(21 * 60 * 1000) // 21 minutes

        expect(() =>
            sut.execute({
                checkInId: createdCheckIn.id,
            }),
        ).rejects.toBeInstanceOf(Error)
    })
})