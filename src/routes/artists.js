import { Router } from 'express'
import { ArtistController } from '../controllers/artists.js'

const router = Router()

router.get('/', ArtistController.getAll)
router.get('/:id', ArtistController.getById)

router.post('/', ArtistController.create)
router.patch('/:id', ArtistController.update)
router.delete('/:id', ArtistController.delete)

export default router
