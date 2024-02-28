import { BandGenreModel } from '../models/band_genre.js'
import { validateBandGenre } from '../schemas/band_genres.js'

export class BandGenreController {
  static async getAll(req, res) {
    const { band_id } = req.params

    try {
      const genres = await BandGenreModel.getAll({ band_id })
      res.json(genres)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching genres of the band' })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const genre = await BandGenreModel.getById({ id })
      if (!genre)
        return res.status(404).json({ message: 'Band genre not found' })

      res.json(genre)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching the band genre' })
    }
  }

  static async create(req, res) {
    const validation = validateBandGenre(req.body)

    if (!validation.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(validation.error.message) })
    }

    const { band_id } = req.params

    try {
      const newBandGenre = await BandGenreModel.create({
        input: { band_id, ...validation.data },
      })
      res.status(201).json(newBandGenre)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem creating the band genre' })
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const result = await BandGenreModel.delete({ id })
      if (!result)
        return res.status(404).json({ message: 'Band genre not found' })

      res.json(result)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem deleting the band genre' })
    }
  }
}
