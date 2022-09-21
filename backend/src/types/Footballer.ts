import { FootballClubs } from "../enums/FootballClubs";
import { FootballerRoles } from "../enums/FootballerRoles";

export type Footballer = {
	firstname: string;
	lastname: string;
	birthdate: Date;
	image: string;
	role: FootballerRoles;
	clubs: FootballClubs[];
};
