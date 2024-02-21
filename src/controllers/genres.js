import { GenreModel } from '../models/genre.js'
import { validateGenre, validatePartialGenre } from '../schemas/genres.js'

export class GenreController {
  static async getAll(_, res) {
    try {
      const genres = await GenreModel.getAll()
      res.json(genres)
    } catch {
      res.status(500).json({ message: 'There was a problem fetching genres' })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const genre = await GenreModel.getById({ id })
      if (!genre) return res.status(404).json({ message: 'Genre not found' })

      res.json(genre)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching the genre' })
    }
  }

  static async create(req, res) {
    const result = validateGenre(req.body)

    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    try {
      const newGenre = await GenreModel.create({ input: result.data })
      res.status(201).json(newGenre)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem creating the genre' })
    }
  }

  static async update(req, res) {
    const result = validatePartialGenre(req.body)

    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    try {
      const updatedGenre = await GenreModel.update({ id, input: result.data })

      res.json(updatedGenre)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem updating the genre' })
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const result = await GenreModel.delete({ id })
      if (!result) return res.status(404).json({ message: 'Genre not found' })

      res.json(result)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem deleting the genre' })
    }
  }
}
