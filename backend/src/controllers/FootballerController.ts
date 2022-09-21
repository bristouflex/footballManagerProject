import { FootballClubs } from "./../../../frontend/src/enums/FootballClubs";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Footballer } from "../models/Footballer";

const createFootballer = async (req: Request, res: Response, next: NextFunction) => {
	const { firstname, lastname, birthdate, image, role, clubs } = req.body;

	const footballer = new Footballer({
		_id: new mongoose.Types.ObjectId(),
		firstname,
		lastname,
		birthdate,
		image,
		role,
		clubs,
	});

	try {
		const footballer_1 = await footballer.save();
		return res.status(201).json({ footballer });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const getFootballers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const footballers = await Footballer.find();
		return res.status(201).json({ footballers });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const getMostCommonClubFootballer = async (req: Request, res: Response, next: NextFunction) => {
	const footballerId = req.params.footballerId;

	try {
		const currentFootballer = await Footballer.findById(footballerId);
		const mostInCommon = { player: {}, count: 0 };

		if (currentFootballer) {
			const footballers = await Footballer.find();

			footballers.forEach((player) => {
				let count = 0;
				if (player._id != footballerId) {
					for (let club of currentFootballer.clubs) {
						if (player.clubs.includes(club)) {
							count += 1;
						}
					}
				}
				if (count >= mostInCommon.count) {
					mostInCommon.player = player;
					mostInCommon.count = count;
				}
			});
		}
		return currentFootballer ? res.status(200).json({ mostInCommon }) : res.status(404).json({ message: "not found" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const getFootballer = async (req: Request, res: Response, next: NextFunction) => {
	const footballerId = req.params.footballerId;

	try {
		const footballer = await Footballer.findById(footballerId);
		return footballer ? res.status(200).json({ footballer }) : res.status(404).json({ message: "not found" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const updateFootballer = async (req: Request, res: Response, next: NextFunction) => {
	const footballerId = req.params.footballerId;

	return Footballer.findById(footballerId)
		.then((footballer) => {
			if (footballer) {
				footballer.set(req.body);

				return footballer
					.save()
					.then((footballer) => res.status(201).json({ footballer }))
					.catch((error) => res.status(500).json({ error }));
			} else {
				return res.status(404).json({ message: "not found" });
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

const deleteFootballer = async (req: Request, res: Response, next: NextFunction) => {
	const footballerId = req.params.footballerId;

	return Footballer.findByIdAndDelete(footballerId)
		.then((footballer) => (footballer ? res.status(201).json({ footballer, message: "Deleted" }) : res.status(404).json({ message: "not found" })))
		.catch((error) => res.status(500).json({ error }));
};

export const FootballerController = { createFootballer, getFootballers, getFootballer, updateFootballer, deleteFootballer, getMostCommonClubFootballer };
