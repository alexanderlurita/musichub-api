import z from 'zod'
import { musicRoles } from '../constants/music_roles.js'

const artistSchema = z.object({
  name: z
    .string({
      required_error: 'Artist name is required',
      invalid_type_error: 'Artist name must be a string',
    })
    .trim()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(40, { message: 'Must be 40 or fewer characters long' }),
  role: z.enum(musicRoles, {
    required_error: 'Artist role is required',
    invalid_type_error: 'Artist role must be a string',
  }),
  biography: z
    .string({ invalid_type_error: 'Artist biography must be a string' })
    .trim()
    .min(50, { message: 'Must be 50 or more characters long' })
    .nullish(),
})

export function validateArtist(input) {
  return artistSchema.safeParse(input)
}

export function validatePartialArtist(input) {
  return artistSchema.partial().safeParse(input)
}
