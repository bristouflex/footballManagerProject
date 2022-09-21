import { FootballClubs } from './../enums/FootballClubs';
import { FootballerRoles } from "../enums/FootballerRoles";
import { Footballer } from "../types/Footballer";

export const FOOTBALLERS_MOCKS: Footballer[] = [{ _id: "toto", firstname: "Zinedine", lastname: "Zidane", birthdate: new Date("1990-09-20"), image: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1208x256:1210x254)/origin-imgresizer.eurosport.com/2022/03/23/3342895-68338168-2560-1440.jpg", role: FootballerRoles.ATTACKER, clubs: [FootballClubs.BARCA, FootballClubs.AC_MILAN] }];