import z from 'zod'

const artistGenreSchema = z.object({
  genre_id: z
    .number({
      required_error: 'Genre ID is required',
      invalid_type_error: 'Genre ID must be a number',
    })
    .int({ message: 'Must be an integer' })
    .positive({ message: 'Must be positive' }),
})

export function validateArtistGenre(input) {
  return artistGenreSchema.safeParse(input)
}
