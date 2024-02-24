import z from 'zod'

const bandSchema = z.object({
  name: z
    .string({
      required_error: 'Band name is required',
      invalid_type_error: 'Band name must be a string',
    })
    .trim()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(40, { message: 'Must be 40 or fewer characters long' }),
  biography: z
    .string({ invalid_type_error: 'Band biography must be a string' })
    .trim()
    .min(50, { message: 'Must be 50 or more characters long' })
    .nullish(),
  members: z
    .array(
      z
        .number({
          required_error: 'Artist ID is required',
          invalid_type_error: 'Artist ID must be an integer',
        })
        .int({ message: 'Must be an integer' })
        .positive({ message: 'Must be positive' }),
      {
        required_error: 'Band members is required',
        invalid_type_error: 'Band members must be an array',
      },
    )
    .min(2, { message: 'Must be 2 or more elements' }),
  genres: z
    .array(
      z
        .number({
          required_error: 'Genre ID is required',
          invalid_type_error: 'Genre ID must be an integer',
        })
        .int({ message: 'Must be an integer' })
        .positive({ message: 'Must be positive' }),
      {
        invalid_type_error: 'Genres must be an array',
      },
    )
    .optional(),
})

export function validateBand(input) {
  return bandSchema.safeParse(input)
}
