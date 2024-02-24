import { BandModel } from '../models/band.js'
import { BandMemberModel } from '../models/band_member.js'
import { BandGenreModel } from '../models/band_genre.js'
import { validateBand } from '../schemas/bands.js'

export class BandController {
  static async getAll(req, res) {
    try {
      const bands = await BandModel.getAll()
      const bandMembers = await BandMemberModel.getAll()
      const bandGenres = await BandGenreModel.getAll()

      const result = bands.map((band) => ({
        ...band,
        members: bandMembers
          .filter((member) => member.band_id === band.band_id)
          .map(({ band_id, ...res }) => res),
        genres: bandGenres
          .filter((genre) => genre.band_id === band.band_id)
          .map(({ band_id, ...res }) => res),
      }))

      res.json(result)
    } catch {
      res.status(500).json({ message: 'There was a problem fetching bands' })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const band = await BandModel.getById({ id })
      const members = await BandMemberModel.getAll({ band_id: id })
      const genres = await BandGenreModel.getAll({ band_id: id })

      if (!band) return res.status(404).json({ message: 'Band not found' })

      res.json({ ...band, members, genres })
    } catch {
      res.status(500).json({ message: 'There was a problem fetching the band' })
    }
  }

  static async create(req, res) {
    const validation = validateBand(req.body)

    if (!validation.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    try {
      const { members, genres, ...bandData } = validation.data

      const newBand = await BandModel.create({ input: bandData })

      const membersData = members.map((member) => ({
        band_id: newBand.band_id,
        artist_id: member,
      }))
      const newBandMembers = await BandMemberModel.create({
        input: membersData,
      })

      let newBandGenres = []

      if (genres.length) {
        const genresData = genres.map((genre) => ({
          band_id: newBand.band_id,
          genre_id: genre,
        }))

        newBandGenres = await BandGenreModel.create({ input: genresData })
      }

      res.json({
        ...newBand,
        members: newBandMembers,
        ...(newBandGenres.length && { genres: newBandGenres }),
      })
    } catch {
      res.status(500).json({ message: 'There was a problem creating the band' })
    }
  }

  static async update(req, res) {}
}
