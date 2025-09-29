import { it, expect, describe } from 'vitest'
import { RegisterUseCase } from './register.js'
import { faker } from '@faker-js/faker'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
    it('should hash user password upon registration', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email: string) { 
                return null 
            },
            async create(data: { name: string; email: string; password_hash: string }) {
                return {
                    id: faker.string.uuid(),
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    createdAt: new Date(),
                }
            },
        })

        const password = faker.internet.password()

        const { user } = await registerUseCase.execute({
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password,
        })
        
        const isPasswordCorrectlyHashed = await compare(
            password,
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
}) 