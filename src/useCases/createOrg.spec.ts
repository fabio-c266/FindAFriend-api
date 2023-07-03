import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgRepository } from '../repositories/in-memory/inMemoryOrgRepository'
import { CreateOrgUseCase } from './createOrg'
import { OrgAlreadyExistsError } from './errors/OrgAlreadyExistsError'

let orgRepository: InMemoryOrgRepository
let sut: CreateOrgUseCase

describe('Create Org use case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  it('should be able create organization', async () => {
    const { org } = await sut.execute({
      name: 'Javascript Organization',
      email: 'javascrip@org.com',
      password: '123456',
      address: 'Rua Jardim El dorado',
      cep: '72015623',
      phone: '982321222',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register organization with same email', async () => {
    await sut.execute({
      name: 'Javascript Organization',
      email: 'javascrip@org.com',
      password: '123456',
      address: 'Rua Jardim El dorado',
      cep: '72015623',
      phone: '982321222',
    })

    await expect(async () => {
      await sut.execute({
        name: 'Javascript Organization',
        email: 'javascrip@org.com',
        password: '123456',
        address: 'Rua Jardim El dorado',
        cep: '72015623',
        phone: '982321222',
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
