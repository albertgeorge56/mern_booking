import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { Response } from "express";

export function genAuthToken(user: IUser) {
  return jwt.sign({ userid: user.id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "7d",
  });
}

export function sendAuthTokenCookie(res: Response, authToken: string) {
  res.cookie("auth_token", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
