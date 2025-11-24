import { Request, Response } from "express";
import User from "../models/user.model";
import { userRegisterSchema } from "shared/schemas/user.schema";
import { genAuthToken, sendAuthTokenCookie } from "../utils/helpers";

export async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password } = userRegisterSchema.parse(
    req.body
  );
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  user = new User({ firstName, lastName, email, password });
  await user.save();
  sendAuthTokenCookie(res, genAuthToken(user));
  return res.sendStatus(201);
}
