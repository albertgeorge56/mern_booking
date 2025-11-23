import mongoose from "mongoose"

export interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
)
const User = mongoose.model<IUser>("User", userSchema)
export default User
