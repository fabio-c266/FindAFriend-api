import { OrgRepository } from '../repositories/orgRepository'
import { PetRepository } from '../repositories/petRepository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  city: string
  imageUrl: string
  orgId: string
}

export class CreatePetUseCase {
  constructor(
    private readonly orgRepository: OrgRepository,
    private readonly petRepository: PetRepository,
  ) {}

  async execute({
    name,
    description,
    city,
    imageUrl,
    orgId,
  }: CreatePetUseCaseRequest) {
    const pet = await this.petRepository.create({
      name,
      description,
      city,
      image_url: imageUrl,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
