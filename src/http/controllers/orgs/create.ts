import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgUseCase } from '../../../useCases/factories/makeCreateOrgUseCase'
import { OrgAlreadyExistsError } from '../../../useCases/errors/OrgAlreadyExistsError'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const orgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
    phone: z.string(),
    address: z.string(),
    cep: z.string(),
  })

  const { name, email, password, phone, address, cep } = orgBodySchema.parse(
    request.body,
  )

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({
      name,
      email,
      password,
      phone,
      address,
      cep,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
