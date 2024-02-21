import z from 'zod'

const genreSchema = z.object({
  name: z
    .string({
      required_error: 'Genre name is required',
      invalid_type_error: 'Genre name must be a string',
    })
    .trim()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(30, { message: 'Must be 30 or fewer characters long' }),
})

export function validateGenre(input) {
  return genreSchema.safeParse(input)
}

export function validatePartialGenre(input) {
  return genreSchema.partial().safeParse(input)
}
