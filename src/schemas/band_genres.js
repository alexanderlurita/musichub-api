import z from 'zod'

const bandGenreSchema = z.object({
  genre_id: z
    .number({
      required_error: 'Genre ID is required',
      invalid_type_error: 'Genre ID must be a number',
    })
    .int({ message: 'Must be an integer' })
    .positive({ message: 'Must be positive' }),
})

export function validateBandGenre(input) {
  return bandGenreSchema.safeParse(input)
}
