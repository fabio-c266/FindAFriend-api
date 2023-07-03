import { Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../petRepository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = []

  async create({
    id,
    name,
    description,
    city,
    image_url,
    org_id,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: id ?? randomUUID(),
      name,
      description,
      city,
      image_url,
      org_id,
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string): Promise<Pet[]> {
    return this.pets.filter(
      (pet) => pet.city.toLowerCase() === city.toLowerCase(),
    )
  }

  async findManyByDescription(description: string): Promise<Pet[]> {
    return this.pets.filter((pet) => pet.description.includes(description))
  }

  async delete(id: string): Promise<void> {
    const index = this.pets.findIndex((pet) => pet.id === id)

    delete this.pets[index]
  }
}
