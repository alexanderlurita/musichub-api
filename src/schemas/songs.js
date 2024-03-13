import z from 'zod'

const songSchema = z.object({
  title: z
    .string({
      required_error: 'Song title is required',
      invalid_type_error: 'Song title must be a string',
    })
    .trim()
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(100, { message: 'Must be 100 or fewer characters long' }),
  duration: z
    .string({
      required_error: 'Song duration is required',
      invalid_type_error: 'Song duration must be a string',
    })
    .regex(/^([0-5][0-9]):([0-5][0-9]):([0-5][0-9])$/, {
      message: 'Invalid duration format. Format should be HH:MM:SS',
    }),
  release_year: z
    .number({
      required_error: 'Song release year is required',
      invalid_type_error: 'Song release year must be a number',
    })
    .int({ message: 'Must be an integer' })
    .min(1900, { message: 'Must be at least 1900' })
    .max(new Date().getFullYear(), {
      message: 'Must be current year or earlier',
    }),
  lyrics: z
    .string({
      required_error: 'Song lyrics is required',
      invalid_type_error: 'Song lyrics must be a string',
    })
    .trim()
    .nullish(),
})

export function validateSong(input) {
  return songSchema.safeParse(input)
}

export function validatePartialSong(input) {
  return songSchema.partial().safeParse(input)
}
