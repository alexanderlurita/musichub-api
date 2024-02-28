import { BandMemberModel } from '../models/band_member.js'
import {
  validateBandMember,
  validatePartialBandMember,
} from '../schemas/band_members.js'

export class BandMemberController {
  static async getAll(req, res) {
    const { band_id } = req.params

    try {
      const members = await BandMemberModel.getAll({ band_id })
      res.json(members)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching members of the band' })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const member = await BandMemberModel.getById({ id })
      if (!member)
        return res.status(404).json({ message: 'Band member not found' })

      res.json(member)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem fetching the band member' })
    }
  }

  static async create(req, res) {
    const validation = validateBandMember(req.body)

    if (!validation.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(validation.error.message) })
    }

    const { band_id } = req.params

    try {
      const newBandMember = await BandMemberModel.create({
        input: { band_id, ...validation.data },
      })
      res.status(201).json(newBandMember)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem creating the band member' })
    }
  }

  static async update(req, res) {
    const validation = validatePartialBandMember(req.body)

    if (!validation.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(validation.error.message) })
    }

    const { id } = req.params

    try {
      const updatedBandMember = await BandMemberModel.update({
        id,
        input: validation.data,
      })
      res.json(updatedBandMember)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem updating the band member' })
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const result = await BandMemberModel.delete({ id })
      if (!result)
        return res.status(404).json({ message: 'Band member not found' })

      res.json(result)
    } catch {
      res
        .status(500)
        .json({ message: 'There was a problem deleting the band member' })
    }
  }
}
