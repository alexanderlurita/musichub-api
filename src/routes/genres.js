import { Router } from 'express'
import { GenreController } from '../controllers/genres.js'

const router = Router()

router.get('/', GenreController.getAll)
router.get('/:id', GenreController.getById)

router.post('/', GenreController.create)
router.patch('/:id', GenreController.update)
router.delete('/:id', GenreController.delete)

export default router
