import pg from '../database/db.js'

export class ArtistModel {
  static async getAll({ role }) {
    try {
      const query = pg('artists').orderBy('artist_id', 'desc')

      if (role) {
        query.whereRaw('lower(role) = ?', role.toLowerCase())
      }

      const artists = await query
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
    } catch {
      throw new Error('Unable to update artist')
    }
  }

  static async delete({ id }) {
    try {
      let result

      await pg.transaction(async (trx) => {
        const artistGenres = await pg('artist_genres')
          .transacting(trx)
          .where('artist_id', id)
          .del()
          .returning('*')

        const [artist] = await pg('artists')
          .transacting(trx)
          .where('artist_id', id)
          .del()
          .returning('*')

        result = {
          ...(artist !== undefined && { artist }),
          ...(artistGenres?.length && { artistGenres }),
        }

        await trx.commit()
      })

      return Object.keys(result).length > 0 ? result : undefined
    } catch (e) {
      console.log(e)
      throw new Error('Unable to delete artist')
    }
  }
}
