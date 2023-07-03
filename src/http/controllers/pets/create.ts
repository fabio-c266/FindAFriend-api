import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '../../../useCases/factories/makeCreatePetUseCase'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const petBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    imageUrl: z.string(),
  })

  const { name, description, city, imageUrl } = petBodySchema.parse(
    request.body,
  )

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    description,
    city,
    imageUrl,
    orgId: request.user.sub,
  })

  return reply.status(201).send()
}
