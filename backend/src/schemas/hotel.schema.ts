import { z } from 'zod'

export const hotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.string().min(1, 'Type is required'),
  adultCount: z.coerce.number().min(1),
  childCount: z.coerce.number().min(0),
  facilities: z
    .preprocess(
      (val) => {
        if (typeof val == 'string') return JSON.parse(val as string)
        return val
      },
      z.array(z.string()).min(1, 'At least one facility is required'),
    )
    .optional(),
  pricePerNight: z.coerce.number().min(0),
  starRating: z.coerce.number().min(1).max(5),
})
export type HotelSchemaType = z.infer<typeof hotelSchema>
