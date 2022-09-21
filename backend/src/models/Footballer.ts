import { FootballClubs } from './../../../frontend/src/enums/FootballClubs';
import { FootballerRoles } from './../../../frontend/src/enums/FootballerRoles';
import mongoose, { Document, Schema } from "mongoose";
import { Footballer as FootballerType } from "../types/Footballer";

export interface IFootballerModel extends FootballerType, Document {}

const FootballerSchema: Schema = new Schema(
	{
        firstname: { type: String, required: true},
        lastname: { type: String, required: true},
        birthdate: { type: Date, required: true},
        image: { type: String, required: true},
        role: { type: String, enum: FootballerRoles, required: true},
        clubs: { type: [String], enum: FootballClubs, required: true}
	},
	{
		versionKey: false,
	}
);

export const Footballer = mongoose.model<IFootballerModel>("Footballer", FootballerSchema);
