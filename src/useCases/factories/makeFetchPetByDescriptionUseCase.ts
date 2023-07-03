import { PrismaPetRepository } from '../../repositories/prisma/prismaPetRepository'
import { FetchPetsByDescriptionUseCase } from '../fetchPetsByDescription'

export function makeFetchPetByDescriptionUseCase() {
  const petRepository = new PrismaPetRepository()
  const fetchPetByDescriptionUseCase = new FetchPetsByDescriptionUseCase(
    petRepository,
  )

  return fetchPetByDescriptionUseCase
}
