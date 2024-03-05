import { ArtistGenreModel } from '../models/artist_genre.js'
import { validateArtistGenre } from '../schemas/artist_genres.js'

export class ArtistGenreController {
  static async getAll(req, res) {
    const { artist_id } = req.params

    try {
      const genres = await ArtistGenreModel.getAll({ artist_id })
      res.json(genres)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching genres of the artist' })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const genre = await ArtistGenreModel.getById({ id })
      if (!genre)
        return res.status(404).json({ message: 'Artist genre not found' })

      res.json(genre)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching the artist genre' })
    }
  }

  static async create(req, res) {
    const validation = validateArtistGenre(req.body)

    if (!validation.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(validation.error.message) })
    }

    const { artist_id } = req.params

    try {
      const newArtistGenre = await ArtistGenreModel.create({
        input: { artist_id, ...validation.data },
      })
      res.status(201).json(newArtistGenre)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem creating the artist genre' })
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const result = await ArtistGenreModel.delete({ id })
      if (!result)
        return res.status(404).json({ message: 'Artist genre not found' })

      res.json(result)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem deleting the artist genre' })
    }
  }
}
