import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgRepository } from '../repositories/in-memory/inMemoryOrgRepository'
import { CreatePetUseCase } from './createPet'
import { InMemoryPetRepository } from '../repositories/in-memory/inMemoryPetRepository'
import { hash } from 'bcrypt'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: CreatePetUseCase

describe('Create Pet use case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository()

    sut = new CreatePetUseCase(orgRepository, petRepository)

    await orgRepository.create({
      id: '1',
      name: 'Javascript Organization',
      email: 'javascrip@org.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Jardim El dorado',
      cep: '72015623',
      phone: '982321222',
    })
  })

  it('should be able create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Tigrão',
      description:
        'Brincalhão, alegre, adora uma soneca pela tarde e procura um dono',
      city: 'São Paulo',
      imageUrl:
        'https://cdn.discordapp.com/attachments/917893804579749960/1125434215606001785/dog.png',
      orgId: '1',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
