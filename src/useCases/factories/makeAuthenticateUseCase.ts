import { PrismaOrgRepository } from '../../repositories/prisma/prismaOrgRepository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const authenticateUseCaseUseCase = new AuthenticateUseCase(orgRepository)

  return authenticateUseCaseUseCase
}
