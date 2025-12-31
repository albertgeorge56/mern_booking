import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import errorHandlerMiddleware from './middlewares/error-handler'
import authRouter from './routes/auth.route'
import cookieParser from 'cookie-parser'
dotenv.config({
  path: path.resolve(process.cwd(), process.env.CONFIG_PATH ?? '.env'),
  override: process.env.NODE_ENV !== 'production',
})
;(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`Connected to ${process.env.MONGO_URI}`)
  } catch (e) {
    console.log('Error Connecting to Database')
    process.exit(1)
  }
})()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRouter)
app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('/*path', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.use(errorHandlerMiddleware)
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`)
})
