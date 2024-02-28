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
  country_id: z
    .number({
      required_error: 'Country ID is required',
      invalid_type_error: 'Country ID must be a number',
    })
    .int({ message: 'Must be an integer' })
    .positive({ message: 'Must be positive' }),
  formation_year: z
    .number({
      required_error: 'Formation year is required',
      invalid_type_error: 'Formation year must be a number',
    })
    .int({ message: 'Must be an integer' })
    .min(1900, { message: 'Must be at least 1900' })
    .max(new Date().getFullYear(), {
      message: 'Must be current year or earlier',
    }),
})

export function validateBand(input) {
  return bandSchema.safeParse(input)
}

export function validatePartialBand(input) {
  return bandSchema.partial().safeParse(input)
}
