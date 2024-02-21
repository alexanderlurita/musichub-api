import pg from '../database/db.js'

export class GenreModel {
  static async getAll() {
    try {
      const genres = await pg('genres')
      return genres
    } catch {
      throw new Error('Unable to fetch genres')
    }
  }

  static async getById({ id }) {
    try {
      const genre = await pg('genres').where('genre_id', id)
      return genre[0]
    } catch {
      throw new Error('Unable to fetch genre by ID')
    }
  }

  static async create({ input }) {
    try {
      const [genre] = await pg('genres').insert(input).returning('*')
      return genre
    } catch {
      throw new Error('Unable to create genre')
    }
  }

  static async update({ id, input }) {
    try {
      const [genre] = await pg('genres')
        .update(input)
        .update('updated_at', 'now()')
        .where('genre_id', id)
        .returning('*')

      return genre
    } catch {
      throw new Error('Unable to update genre')
    }
  }

  static async delete({ id }) {
    try {
      const [genre] = await pg('genres')
        .del()
        .where('genre_id', id)
        .returning('*')

      return genre
    } catch {
      throw new Error('Unable to delete genre')
    }
  }
}
