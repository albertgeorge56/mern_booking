import { Request, Response } from 'express'

import { v2 as cloudinary } from 'cloudinary'
import { hotelSchema } from '../schemas/hotel.schema'
import Hotel from '../models/hotel.model'

export const addHotel = async (req: Request, res: Response) => {
  if (!req.files) return res.status(400).json({ error: 'Image file is missing' })
  const imageFiles = req.files as Express.Multer.File[]
  const newHotel = new Hotel(hotelSchema.parse(req.body))
  const imageUrls = await Promise.all(
    imageFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'uploads',
          },
          (error, result) => {
            if (error) return reject(error)
            if (!result) return reject(new Error('No result from Cloudinary'))
            resolve(result.url)
          },
        )
        stream.end(file.buffer)
      })
    }),
  )
  newHotel.imageUrls = imageUrls
  newHotel.user = req.user?.id
  await newHotel.save()
  return res.json(newHotel)
}
