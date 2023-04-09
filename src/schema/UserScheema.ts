import { Schema, model } from "mongoose";
import { UserProps } from "../types/User/User";

const UserScheema = new Schema<UserProps>(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true, default: 0 },
    ip: { type: Number, required: true, default: 0 },
    rp: { type: Number, required: true, default: 0 },
    active: { type: Boolean, required: true, default: true },
  },
  { versionKey: false, timestamps: true }
);

export const User = model<UserProps>("User", UserScheema);
