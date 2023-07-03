import { PrismaPetRepository } from '../../repositories/prisma/prismaPetRepository'
import { FetchPetsByCityUseCase } from '../fetchPetsByCity'

export function makeFetchPetByCityUseCase() {
  const petRepository = new PrismaPetRepository()
  const fetchPetByCityUseCase = new FetchPetsByCityUseCase(petRepository)

  return fetchPetByCityUseCase
}
