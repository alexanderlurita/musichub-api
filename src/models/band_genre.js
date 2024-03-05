import pg from '../database/db.js'

export class BandGenreModel {
  static async getAll({ band_id }) {
    try {
      const bandGenres = await pg
        .select('band_genre_id', 'name')
        .from('band_genres')
        .innerJoin('genres', 'band_genres.genre_id', 'genres.genre_id')
        .where({ band_id })
        .orderBy('band_genre_id', 'desc')

      return bandGenres
    } catch {
      throw new Error('Unable to fetch band genres')
    }
  }

  static async getById({ id }) {
    try {
      const bandGenre = await pg
        .select('band_genre_id', 'name')
        .from('band_genres')
        .innerJoin('genres', 'band_genres.genre_id', 'genres.genre_id')
        .where('band_genre_id', id)

      return bandGenre[0]
    } catch {
      throw new Error('Unable to fetch band genre by ID')
    }
  }

  static async create({ input }) {
    try {
      const [bandGenre] = await pg('band_genres').insert(input).returning('*')
      return bandGenre
    } catch {
      throw new Error('Unable to create band genre')
    }
  }

  static async delete({ id }) {
    try {
      const [bandGenre] = await pg('band_genres')
        .del()
        .where('band_genre_id', id)
        .returning('*')

      return bandGenre
    } catch {
      throw new Error('Unable to delete band genre')
    }
  }
}
