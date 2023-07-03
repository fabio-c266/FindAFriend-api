import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '../repositories/in-memory/inMemoryPetRepository'
import { FetchPetsByDescriptionUseCase } from './fetchPetsByDescription'

let petRepository: InMemoryPetRepository
let sut: FetchPetsByDescriptionUseCase

describe('Fetch Pets by description use case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    sut = new FetchPetsByDescriptionUseCase(petRepository)
  })

  it('should be able get pets by description', async () => {
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

    const { pets } = await sut.execute({
      description: 'Brincalhão',
    })

    expect(pets).toHaveLength(3)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Tigrão 0' }),
      expect.objectContaining({ name: 'Tigrão 1' }),
      expect.objectContaining({ name: 'Tigrão 2' }),
    ])
  })
})
