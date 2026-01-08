import express from 'express'
import { addHotel } from '../controllers/hotel.controller'
import { tempUpload } from '../config/multer'
const myHotelRouter = express.Router()

myHotelRouter.post('/', tempUpload.array('imageFiles', 6), addHotel)

export default myHotelRouter
