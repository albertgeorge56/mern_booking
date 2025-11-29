import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/user.model'
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['auth_token']
  if (!token) return res.status(400).json({ error: 'Unauthorized' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload
    const user = await User.findById(decoded.userId)
    if (!user) return res.status(401).json({ error: 'Unauthorized' })
    req.user = user
    next()
  } catch (error) {
    return res.status(400).json('Token is not valid.')
  }
}

export default authMiddleware
