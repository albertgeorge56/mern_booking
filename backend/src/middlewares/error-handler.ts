import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

export default function errorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) return res.status(400).json({ error: z.flattenError(error) })
  return res.status(error.status || 500).json({ error: error.message || 'Server Error' })
}
