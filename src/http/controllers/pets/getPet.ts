import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '../../../useCases/factories/makeGetPetUseCase'
import { ResourceNotFoundError } from '../../../useCases/errors/ResourceNotFoundError'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const petParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = petParamsSchema.parse(request.params)

  const getPetUsecase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUsecase.execute({
      petId: id,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    throw err
  }
}
