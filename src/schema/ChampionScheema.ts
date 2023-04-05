import { Schema, model } from "mongoose";

export interface IChampion {
  name: string;
  price: number;
  role: string;
  active: boolean;
  releaseDateOf(): string;
}

const ChampioSchema = new Schema<IChampion>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    role: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  { versionKey: false, timestamps: true }
);

ChampioSchema.methods.releaseDateOf = function () {
  const date = new Date();
  const day = String(date.getDay()).padStart(2, "0");
  const month = String(date.getMonth()).padStart(2, "0");
  const year = date.getFullYear();
  const fullDate = `${day}/${month}/${year}`;
  return fullDate;
};

export const Champion = model<IChampion>("Champion", ChampioSchema);
