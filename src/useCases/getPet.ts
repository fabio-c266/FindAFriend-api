import { PetRepository } from '../repositories/petRepository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

interface GetPetUseCaseRequest {
  petId: string
}

export class GetPetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({ petId }: GetPetUseCaseRequest) {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
