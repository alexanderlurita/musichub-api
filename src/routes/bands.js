import { Router } from 'express'
import { BandController } from '../controllers/bands.js'
import { BandMemberController } from '../controllers/band_members.js'
import { BandGenreController } from '../controllers/band_genres.js'

const router = Router()

router.get('/', BandController.getAll)
router.get('/:id', BandController.getById)
router.post('/', BandController.create)
router.patch('/:id', BandController.update)
router.delete('/:id', BandController.delete)

router.get('/:band_id/members', BandMemberController.getAll)
router.get('/:band_id/members/:id', BandMemberController.getById)
router.post('/:band_id/members', BandMemberController.create)
router.patch('/:band_id/members/:id', BandMemberController.update)
router.delete('/:band_id/members/:id', BandMemberController.delete)

router.get('/:band_id/genres', BandGenreController.getAll)
router.get('/:band_id/genres/:id', BandGenreController.getById)
router.post('/:band_id/genres', BandGenreController.create)
router.delete('/:band_id/genres/:id', BandGenreController.delete)

export default router
