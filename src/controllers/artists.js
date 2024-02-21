import { ArtistModel } from '../models/artist.js'
import { validateArtist, validatePartialArtist } from '../schemas/artists.js'

export class ArtistController {
  static async getAll(req, res) {
    const { role } = req.query
    try {
      const artists = await ArtistModel.getAll({ role })
      res.json(artists)
    } catch {
      res.status(500).json({ message: 'There was a problem fetching artists' })
    }
  }

  static async getById(req, res) {
    const { id } = req.params
    try {
      const artist = await ArtistModel.getById({ id })
      if (!artist) return res.status(404).json({ message: 'Artist not found' })

      res.json(artist)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching the artist' })
    }
  }

  static async create(req, res) {
    const result = validateArtist(req.body)

    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    try {
      const newArtist = await ArtistModel.create({ input: result.data })
      res.status(201).json(newArtist)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem creating the artist' })
    }
  }

  static async update(req, res) {
    const result = validatePartialArtist(req.body)

    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    try {
      const updatedArtist = await ArtistModel.update({ id, input: result.data })
      res.json(updatedArtist)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem updating the artist' })
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const result = await ArtistModel.delete({ id })
      if (!result) return res.status(404).json('Artist not found')

      res.json(result)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem deleting the artist' })
    }
  }
}
