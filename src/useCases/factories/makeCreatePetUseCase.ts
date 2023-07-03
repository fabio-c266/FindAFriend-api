import { PrismaOrgRepository } from '../../repositories/prisma/prismaOrgRepository'
import { PrismaPetRepository } from '../../repositories/prisma/prismaPetRepository'
import { CreatePetUseCase } from '../createPet'

export function makeCreatePetUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const petRepository = new PrismaPetRepository()
  const createPetUseCase = new CreatePetUseCase(orgRepository, petRepository)

  return createPetUseCase
}
