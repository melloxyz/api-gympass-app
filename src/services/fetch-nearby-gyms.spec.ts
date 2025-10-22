
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.js'


let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })


  it('should be able to search to fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01', // near to user
      title: 'Gym 01',
      description: 'Description 01',
      phone: '123456789',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    await gymsRepository.create({
      id: 'gym-02', // far from user
      title: 'Gym 02',
      description: 'Description 02',
      phone: '987654321',
      latitude: -21.2092052,
      longitude: -41.6401092,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401092,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-01' })
    ])
  })
})