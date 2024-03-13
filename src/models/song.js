import pg from '../database/db.js'

export class SongModel {
  static async getAll() {
    try {
      const songs = await pg('songs').orderBy('song_id', 'desc')
      return songs
    } catch {
      throw new Error('Unable to fetch songs')
    }
  }

  static async getById({ id }) {
    try {
      const song = await pg('songs').where('song_id', id)
      return song[0]
    } catch {
      throw new Error('Unable to fetch song by ID')
    }
  }

  static async create({ input }) {
    try {
      const [song] = await pg('songs').insert(input).returning('*')
      return song
    } catch {
      throw new Error('Unable to create song')
    }
  }

  static async update({ id, input }) {
    try {
      const [song] = await pg('songs')
        .update(input)
        .update('updated_at', 'now()')
        .where('song_id', id)
        .returning('*')

      return song
    } catch {
      throw new Error('Unable to update song')
    }
  }

  static async delete({ id }) {
    try {
      const [song] = await pg('songs').del().where('song_id', id).returning('*')
      return song
    } catch {
      throw new Error('Unable to delete song')
    }
  }
}
