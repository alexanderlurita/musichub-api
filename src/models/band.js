import pg from '../database/db.js'

export class BandModel {
  static async getAll() {
    try {
      const bands = await pg
        .select(
          'band_id',
          'bands.name',
          'biography',
          'countries.name as country',
          'formation_year',
          'created_at',
          'updated_at',
        )
        .from('bands')
        .innerJoin('countries', 'bands.country_id', 'countries.country_id')
        .orderBy('band_id', 'desc')
      return bands
    } catch {
      throw new Error('Unable to fetch bands')
    }
  }

  static async getById({ id }) {
    try {
      const band = await pg
        .select(
          'band_id',
          'bands.name',
          'biography',
          'countries.name as country',
          'formation_year',
          'created_at',
          'updated_at',
        )
        .from('bands')
        .innerJoin('countries', 'bands.country_id', 'countries.country_id')
        .where('band_id', id)
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
      let result

      await pg.transaction(async (trx) => {
        const bandGenres = await pg('band_genres')
          .transacting(trx)
          .where('band_id', id)
          .del()
          .returning('*')

        const bandMembers = await pg('band_members')
          .transacting(trx)
          .where('band_id', id)
          .del()
          .returning('*')

        const [band] = await pg('bands')
          .transacting(trx)
          .where('band_id', id)
          .del()
          .returning('*')

        result = {
          ...(band !== undefined && { band }),
          ...(bandMembers?.length && { bandMembers }),
          ...(bandGenres?.length && { bandGenres }),
        }

        await trx.commit()
      })

      return Object.keys(result).length > 0 ? result : undefined
    } catch {
      throw new Error('Unable to delete band')
    }
  }
}
