import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { CreateGymUseCase } from './create-gym.js'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to create a gym', async () => {
        const { gym } = await sut.execute({
            title: 'Everest Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401092,
        })

        expect(gym.id).toEqual(expect.any(String))
    })
}) 