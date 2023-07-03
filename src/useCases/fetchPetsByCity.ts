import { PetRepository } from '../repositories/petRepository'

interface FetchPetsByCityUseCaseRequest {
  city: string
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({ city }: FetchPetsByCityUseCaseRequest) {
    const pets = await this.petRepository.findManyByCity(city)

    return {
      pets,
    }
  }
}
