import { BandModel } from '../models/band.js'
import { validateBand, validatePartialBand } from '../schemas/bands.js'

export class BandController {
  static async getAll(_, res) {
    try {
      const bands = await BandModel.getAll()
      res.json(bands)
    } catch {
      res.status(500).json({ message: 'There was a problem fetching bands' })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const band = await BandModel.getById({ id })
      if (!band) return res.status(404).json({ message: 'Band not found' })

      res.json(band)
    } catch {
      res.status(500).json({ message: 'There was a problem fetching the band' })
    }
  }

  static async create(req, res) {
    const validation = validateBand(req.body)

    if (!validation.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(validation.error.message) })
    }

    try {
      const newBand = await BandModel.create({ input: validation.data })
      res.status(201).json(newBand)
    } catch {
      res.status(500).json({ message: 'There was a problem creating the band' })
    }
  }

  static async update(req, res) {
    const validation = validatePartialBand(req.body)

    if (!validation.success) {
      return res
        .status(400)
        .json({ message: JSON.parse(validation.error.message) })
    }

    const { id } = req.params

    try {
      const updatedBand = await BandModel.update({
        id,
        input: validation.data,
      })
      res.json(updatedBand)
    } catch {
      res.status(500).json({ message: 'There was a problem updating the band' })
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const result = await BandModel.delete({ id })
      if (!result) return res.status(404).json({ message: 'Band not found' })

      res.json(result)
    } catch {
      res.status(500).json({ message: 'There was a problem deleting the band' })
    }
  }
}
