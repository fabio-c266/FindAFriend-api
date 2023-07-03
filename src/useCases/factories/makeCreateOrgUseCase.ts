import { PrismaOrgRepository } from '../../repositories/prisma/prismaOrgRepository'
import { CreateOrgUseCase } from '../createOrg'

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const createOrgUseCaseUseCase = new CreateOrgUseCase(orgRepository)

  return createOrgUseCaseUseCase
}
