import pg from '../database/db.js'

export class BandMemberModel {
  static async getAll({ band_id } = {}) {
    try {
      const query = pg
        .select('member_id', 'band_id', 'name', 'role')
        .from('band_members')
        .innerJoin('artists', 'band_members.artist_id', 'artists.artist_id')

      if (band_id) {
        query.where({ band_id })
      }

      const bandMembers = await query
      return bandMembers
    } catch {
      throw new Error('Unable to fetch band members')
    }
  }

  static async create({ input }) {
    try {
      const members = pg('band_members').insert(input).returning('*')
      return members
    } catch {
      throw new Error('Unable to create band member/s')
    }
  }
}
