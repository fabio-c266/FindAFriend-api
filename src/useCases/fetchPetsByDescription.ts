import { PetRepository } from '../repositories/petRepository'

interface FetchPetsByCityUseCaseRequest {
  description: string
}

export class FetchPetsByDescriptionUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({ description }: FetchPetsByCityUseCaseRequest) {
    const pets = await this.petRepository.findManyByDescription(description)

    return {
      pets,
    }
  }
}
