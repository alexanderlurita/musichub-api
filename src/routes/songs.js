import { Router } from 'express'
import { SongController } from '../controllers/songs.js'

const router = Router()

router.get('/', SongController.getAll)
router.post('/', SongController.create)

export default router
