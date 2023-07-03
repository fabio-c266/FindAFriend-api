import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '../repositories/in-memory/inMemoryPetRepository'
import { GetPetUseCase } from './getPet'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

let petRepository: InMemoryPetRepository
let sut: GetPetUseCase

describe('Get Pet  use case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    sut = new GetPetUseCase(petRepository)
  })

  it('should be able get pet infos', async () => {
    for (let i = 0; i <= 2; i++) {
      await petRepository.create({
        id: `pet-${i}`,
        name: `Tigrão ${i}`,
        description:
          'Brincalhão, alegre, adora uma soneca pela tarde e procura um dono',
        city: 'São Paulo',
        image_url:
          'https://cdn.discordapp.com/attachments/917893804579749960/1125434215606001785/dog.png',
        org_id: '1',
      })
    }

    const { pet } = await sut.execute({
      petId: 'pet-1',
    })

    expect(pet?.id).toEqual(expect.any(String))
  })

  it('should not be able with invalid pet id', async () => {
    await expect(async () => {
      await sut.execute({
        petId: 'invalid-pet-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
