import pg from '../database/db.js'

export class ArtistGenreModel {
  static async getAll({ artist_id }) {
    try {
      const artistGenres = await pg
        .select('artist_genre_id', 'name')
        .from('artist_genres')
        .innerJoin('genres', 'artist_genres.genre_id', 'genres.genre_id')
        .where({ artist_id })
        .orderBy('artist_genre_id', 'desc')

      return artistGenres
    } catch {
      throw new Error('Unable to fetch artist genres')
    }
  }

  static async getById({ id }) {
    try {
      const artistGenre = await pg
        .select('artist_genre_id', 'name')
        .from('artist_genres')
        .innerJoin('genres', 'artist_genres.genre_id', 'genres.genre_id')
        .where('artist_genre_id', id)

      return artistGenre[0]
    } catch {
      throw new Error('Unable to fetch artist genre by ID')
    }
  }

  static async create({ input }) {
    try {
      const [artistGenre] = await pg('artist_genres')
        .insert(input)
        .returning('*')

      return artistGenre
    } catch {
      throw new Error('Unable to create artist genre')
    }
  }

  static async delete({ id }) {
    try {
      const [artistGenre] = await pg('artist_genres')
        .del()
        .where('artist_genre_id', id)
        .returning('*')

      return artistGenre
    } catch {
      throw new Error('Unable to delete artist genre')
    }
  }
}
