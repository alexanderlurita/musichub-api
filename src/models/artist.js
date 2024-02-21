import pg from '../database/db.js'

export class ArtistModel {
  static async getAll({ role }) {
    try {
      if (role) {
        return await pg('artists')
          .whereRaw('lower(role) = ?', role.toLowerCase())
          .orderBy('artist_id', 'desc')
      }

      const artists = await pg('artists').orderBy('artist_id', 'desc')
      return artists
    } catch {
      throw new Error('Unable to fetch artists')
    }
  }

  static async getById({ id }) {
    try {
      const artist = await pg('artists').where('artist_id', id)
      return artist[0]
    } catch {
      throw new Error('Unable to fetch artist by ID')
    }
  }

  static async create({ input }) {
    try {
      const [artist] = await pg('artists').insert(input).returning('*')
      return artist
    } catch {
      throw new Error('Unable to create artist')
    }
  }

  static async update({ id, input }) {
    try {
      const [artist] = await pg('artists')
        .update(input)
        .update('updated_at', 'now()')
        .where('artist_id', id)
        .returning('*')

      return artist
    } catch (e) {
      console.log(e)
      throw new Error('Unable to update artist')
    }
  }

  static async delete({ id }) {
    try {
      const [artist] = await pg('artists')
        .del()
        .where('artist_id', id)
        .returning('*')

      return artist
    } catch {
      throw new Error('Unable to delete artist')
    }
  }
}
