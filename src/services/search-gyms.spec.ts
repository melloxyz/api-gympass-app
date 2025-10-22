
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'


let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })


  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      description: 'Description 01',
      phone: '123456789',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Gym 02',
      description: 'Description 02',
      phone: '987654321',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    const { gyms } = await sut.execute({
      query: 'Gym 0',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-01' }),
      expect.objectContaining({ id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: `Gym ${i}`,
        description: `Description ${i}`,
        phone: `Phone ${i}`,
        latitude: -27.2092052,
        longitude: -49.6401092,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-21' }),
      expect.objectContaining({ id: 'gym-22' }),
    ])
  })
})