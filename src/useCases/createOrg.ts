import { OrgRepository } from '../repositories/orgRepository'
import { hash } from 'bcrypt'
import { OrgAlreadyExistsError } from './errors/OrgAlreadyExistsError'

interface CreateOrgRequest {
  name: string
  email: string
  password: string
  phone: string
  address: string
  cep: string
}

export class CreateOrgUseCase {
  constructor(private readonly orgRepository: OrgRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    cep,
    phone,
  }: CreateOrgRequest) {
    const emailAlreadyExists = await this.orgRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
      address,
      cep,
      phone,
    })

    return {
      org,
    }
  }
}
