import pg from '../database/db.js'

export class BandModel {
  static async getAll() {
    try {
      const bands = await pg('bands').orderBy('band_id', 'desc')
      return bands
    } catch {
      throw new Error('Unable to fetch bands')
    }
  }

  static async getById({ id }) {
    try {
      const band = await pg('bands').where('band_id', id)
      return band[0]
    } catch {
      throw new Error('Unable to fetch band by ID')
    }
  }

  static async create({ input }) {
    try {
      const [band] = await pg('bands').insert(input).returning('*')
      return band
    } catch {
      throw new Error('Unable to create band')
    }
  }

  static async update({ id, input }) {
    try {
      const [band] = await pg('bands')
        .update(input)
        .update('updated_at', 'now()')
        .where('band_id', id)
        .returning('*')

      return band
    } catch {
      throw new Error('Unable to update band')
    }
  }

  static async delete({ id }) {
    try {
      const [band] = await pg('bands').del().where('band_id', id).returning('*')
      return band
    } catch {
      throw new Error('Unable to delete  band')
    }
  }
}
