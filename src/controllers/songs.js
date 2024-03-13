import { SongModel } from '../models/song.js'
import { validateSong } from '../schemas/songs.js'

export class SongController {
  static async getAll(_, res) {
    try {
      const songs = await SongModel.getAll()
      res.json(songs)
    } catch {
      res.status(500).json({ message: 'There was a problem fetching songs' })
    }
  }

  static async create(req, res) {
    const validation = validateSong(req.body)

    if (!validation.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(validation.error.message) })
    }

    try {
      const newSong = await SongModel.create({ input: validation.data })
      res.status(201).json(newSong)
    } catch {
      res.status(500).json({ message: 'There was a problem creating the song' })
    }
  }
}
