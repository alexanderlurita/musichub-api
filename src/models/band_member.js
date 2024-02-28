import pg from '../database/db.js'

export class BandMemberModel {
  static async getAll({ band_id }) {
    try {
      const bandMembers = await pg
        .select('member_id', 'name', 'role', 'status')
        .from('band_members')
        .innerJoin('artists', 'band_members.artist_id', 'artists.artist_id')
        .where({ band_id })

      return bandMembers
    } catch {
      throw new Error('Unable to fetch band members')
    }
  }

  static async getById({ id }) {
    try {
      const bandMember = await pg
        .select('member_id', 'name', 'role', 'status')
        .from('band_members')
        .innerJoin('artists', 'band_members.artist_id', 'artists.artist_id')
        .where('member_id', id)

      return bandMember[0]
    } catch {
      throw new Error('Unable to fetch band member by ID')
    }
  }

  static async create({ input }) {
    try {
      const [member] = await pg('band_members').insert(input).returning('*')
      return member
    } catch {
      throw new Error('Unable to create band member')
    }
  }

  static async update({ id, input }) {
    try {
      const [member] = await pg('band_members')
        .update(input)
        .where('member_id', id)
        .returning('*')

      return member
    } catch {
      throw new Error('Unable to update band member')
    }
  }

  static async delete({ id }) {
    try {
      const [bandMember] = await pg('band_members')
        .del()
        .where('member_id', id)
        .returning('*')

      return bandMember
    } catch {
      throw new Error('Unable to delete band member')
    }
  }
}
