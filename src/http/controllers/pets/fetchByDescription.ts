import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchPetByDescriptionUseCase } from '../../../useCases/factories/makeFetchPetByDescriptionUseCase'

export async function fetchByDescription(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petQuerySchema = z.object({
    description: z.string(),
  })

  const { description } = petQuerySchema.parse(request.query)

  const fetchPetByCityUseCase = makeFetchPetByDescriptionUseCase()

  const { pets } = await fetchPetByCityUseCase.execute({
    description,
  })

  return reply.status(200).send({
    pets,
  })
}
