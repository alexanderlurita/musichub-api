import { BandMemberModel } from '../models/band_member.js'

export class BandMemberController {
  static async getAll(req, res) {
    const { id } = req.params

    try {
      const members = await BandMemberModel.getAll({ band_id: id })
      res.json(members.map(({ band_id, ...res }) => res))
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching members of the band' })
    }
  }
}
