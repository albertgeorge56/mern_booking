import { Request, Response } from 'express'
import User from '../models/user.model'
import { userLoginSchema, userRegisterSchema } from '../schemas/user.schema'
import { genAuthToken, setAuthTokenCookie } from '../utils/helpers'
import { CustomError } from '../utils/custom-error'
import { StatusCodes } from 'http-status-codes'

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = userRegisterSchema.parse(req.body)
  let user = await User.findOne({ email: email })
  if (user) throw new CustomError('User already exists', 400)
  user = new User({ firstName, lastName, email, password })
  await user.save()
  setAuthTokenCookie(res, genAuthToken(user))
  return res
    .status(StatusCodes.CREATED)
    .json({ data: user, message: 'User Registered Successfully' })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = userLoginSchema.parse(req.body)
  const user = await User.findOne({ email }).select('+password')
  if (!user || !user.matchPassword(password)) throw new CustomError('Invaid Credentials', 400)
  setAuthTokenCookie(res, genAuthToken(user))
  return res.status(StatusCodes.OK).json({ message: 'Logged In Successfully', data: user })
}

export const verifyUser = async (req: Request, res: Response) => {
  return res.json({ message: 'verified', data: req.user })
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  return res.json({ message: 'Logged Out Successfully' })
}
