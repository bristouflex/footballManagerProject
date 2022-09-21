import { Footballer } from '../types/Footballer';
import { FootballerRoles } from './../enums/FootballerRoles';

export const FOOTBALLER_DEFAULT: Footballer = {
    _id: '',
    firstname: '',
    lastname: '',
    birthdate: new Date(),
    image: '',
    role: FootballerRoles.ATTACKER,
    clubs: []
}