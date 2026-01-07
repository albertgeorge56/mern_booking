import mongoose from 'mongoose'

export interface IHotel extends Document {
  user: mongoose.Types.ObjectId
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childCount: number
  facilities: string[]
  pricePerNight: number
  starRating: number
  imageUrls: string[]
}

const hotelSchema = new mongoose.Schema<IHotel>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
  },
  { timestamps: true },
)

const Hotel = mongoose.model<IHotel>('Hotel', hotelSchema)
export default Hotel
