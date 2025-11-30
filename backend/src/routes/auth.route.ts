import express from 'express'
import { login, logout, register, verifyUser } from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'
const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/verify', authMiddleware, verifyUser)
authRouter.post('/logout', authMiddleware, logout)

export default authRouter
