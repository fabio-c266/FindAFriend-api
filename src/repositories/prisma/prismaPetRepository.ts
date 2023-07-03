import { Pet, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { PetRepository } from '../petRepository'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pets
  }

  async findManyByDescription(description: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        description: {
          contains: description,
        },
      },
    })

    return pets
  }

  async delete(id: string): Promise<void> {
    await prisma.pet.delete({
      where: {
        id,
      },
    })
  }
}
