import { Org, Prisma } from '@prisma/client'
import { OrgRepository } from '../orgRepository'
import { randomUUID } from 'crypto'

export class InMemoryOrgRepository implements OrgRepository {
  private orgs: Org[] = []

  async create({
    id,
    name,
    email,
    password_hash,
    address,
    cep,
    phone,
  }: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: id ?? randomUUID(),
      name,
      email,
      password_hash,
      address,
      cep,
      phone,
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
