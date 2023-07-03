import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchPetByCityUseCase } from '../../../useCases/factories/makeFetchPetByCityUseCase'

export async function fetchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = petQuerySchema.parse(request.query)

  const fetchPetByCityUseCase = makeFetchPetByCityUseCase()

  const { pets } = await fetchPetByCityUseCase.execute({
    city,
  })

  return reply.status(200).send({
    pets,
  })
}
