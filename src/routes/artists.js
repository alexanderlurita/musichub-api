import { Router } from 'express'
import { ArtistController } from '../controllers/artists.js'
import { ArtistGenreController } from '../controllers/artist_genres.js'

const router = Router()

router.get('/', ArtistController.getAll)
router.get('/:id', ArtistController.getById)
router.post('/', ArtistController.create)
router.patch('/:id', ArtistController.update)
router.delete('/:id', ArtistController.delete)

router.get('/:artist_id/genres', ArtistGenreController.getAll)
router.get('/:artist_id/genres/:id', ArtistGenreController.getById)
router.post('/:artist_id/genres', ArtistGenreController.create)
router.delete('/:artist_id/genres/:id', ArtistGenreController.delete)

export default router
