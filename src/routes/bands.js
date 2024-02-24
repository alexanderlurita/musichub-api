import { Router } from 'express'
import { BandController } from '../controllers/bands.js'
import { BandMemberController } from '../controllers/band_members.js'
import { BandGenreController } from '../controllers/band_genres.js'

const router = Router()

router.get('/', BandController.getAll)
router.get('/:id', BandController.getById)
router.get('/:id/members', BandMemberController.getAll)
router.get('/:id/genres', BandGenreController.getAll)

router.post('/', BandController.create)

export default router
