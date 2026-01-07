import express, { Request, Response } from 'express'
import multer from 'multer'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { hotelPartialSchema, hotelSchema } from '../schemas/hotel.schema'
import Hotel from '../models/hotel.model'

const myHotelRouter = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only images are allowed'))
    } else {
      cb(null, true)
    }
  },
})

myHotelRouter.post('/', upload.array('imageFiles', 6), async (req: Request, res: Response) => {
  const imageFiles = req.files as Express.Multer.File[]
  const newHotel = new Hotel(hotelPartialSchema.parse(req.body))
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
  return res.json(newHotel)
})

export default myHotelRouter
