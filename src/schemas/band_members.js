import z from 'zod'

const bandMemberSchema = z.object({
  artist_id: z
    .number({
      required_error: 'Artist ID is required',
      invalid_type_error: 'Artist ID must be a number',
    })
    .int({ message: 'Must be an integer' })
    .positive({ message: 'Must be positive' }),
  status: z.enum(['Active', 'Inactive', 'Former'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string',
  }),
})

export function validateBandMember(input) {
  return bandMemberSchema.safeParse(input)
}

export function validatePartialBandMember(input) {
  return bandMemberSchema.omit({ artist_id: true }).partial().safeParse(input)
}
