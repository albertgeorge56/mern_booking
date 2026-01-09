import express from 'express'
import { addHotel } from '../controllers/hotel.controller'
import { tempUpload } from '../config/multer'
import authMiddleware from '../middlewares/auth.middleware'
const myHotelRouter = express.Router()

myHotelRouter.post('/', authMiddleware, tempUpload.array('imageFiles', 6), addHotel)

export default myHotelRouter
