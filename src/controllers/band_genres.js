import { BandGenreModel } from '../models/band_genre.js'

export class BandGenreController {
  static async getAll(req, res) {
    const { id } = req.params

    try {
      const genres = await BandGenreModel.getAll({ band_id: id })
      res.json(genres.map(({ band_id, ...res }) => res))
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching genres of the band' })
    }
  }
}
