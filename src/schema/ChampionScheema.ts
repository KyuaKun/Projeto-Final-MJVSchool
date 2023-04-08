import { Schema, model } from "mongoose";
import { ChampionProps } from "../types/Champion/Champion";

const ChampionSchema = new Schema<ChampionProps>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    role: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Champion = model<ChampionProps>("Champion", ChampionSchema);
