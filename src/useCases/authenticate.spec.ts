import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgRepository } from '../repositories/in-memory/inMemoryOrgRepository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

let orgRepository: InMemoryOrgRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    sut = new AuthenticateUseCase(orgRepository)

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

  it('should be able authenticate organization', async () => {
    const { org } = await sut.execute({
      email: 'javascrip@org.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate organization with invalid email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'invalid-email',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate organization with invalid password', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'javascrip@org.com',
        password: '31231',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
