import express from 'express'
import { login, register, verifyUser } from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'
const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/verify', authMiddleware, verifyUser)

export default authRouter
