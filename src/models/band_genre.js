import pg from '../database/db.js'

export class BandGenreModel {
  static async getAll({ band_id } = {}) {
    try {
      const query = pg
        .select('band_genre_id', 'band_id', 'name')
        .from('band_genres')
        .innerJoin('genres', 'band_genres.genre_id', 'genres.genre_id')

      if (band_id) {
        query.where({ band_id })
      }

      const bandGenres = await query
      return bandGenres
    } catch {
      throw new Error('Unable to fetch band genres')
    }
  }

  static async create({ input }) {
    try {
      const genres = pg('band_genres').insert(input).returning('*')
      return genres
    } catch {
      throw new Error('Unable to create band genre/s')
    }
  }
}
