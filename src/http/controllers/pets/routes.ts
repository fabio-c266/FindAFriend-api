import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verifyJWT'
import { create } from './create'
import { fetchByCity } from './fetchByCity'
import { fetchByDescription } from './fetchByDescription'
import { getPet } from './getPet'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { preHandler: [verifyJWT] }, create)

  app.get('/pets/city', fetchByCity)
  app.get('/pets/description', fetchByDescription)
  app.get('/pets/:id', getPet)
}
