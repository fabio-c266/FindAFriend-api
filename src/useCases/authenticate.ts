import { compare } from 'bcrypt'
import { OrgRepository } from '../repositories/orgRepository'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private readonly orgRepository: OrgRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const isValidPassword = await compare(password, org.password_hash)

    if (!isValidPassword) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
