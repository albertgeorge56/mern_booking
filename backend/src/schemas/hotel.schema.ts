import { z } from 'zod'

export const hotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.string().min(1, 'Type is required'),
  adultCount: z.int().min(1),
  childCount: z.int().min(0),
  facilities: z.array(z.string()).min(1, 'At least one facility is required'),
  pricePerNight: z.number().min(0),
  starRating: z.int().min(1).max(5),
  imageUrls: z.array(z.string()).min(1),
})
export const hotelPartialSchema = hotelSchema.partial()
export type HotelSchemaType = z.infer<typeof hotelSchema>
export type HotelPartialSchemaType = z.infer<typeof hotelPartialSchema>
