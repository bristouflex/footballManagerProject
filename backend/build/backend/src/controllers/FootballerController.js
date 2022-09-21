"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FootballerController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Footballer_1 = require("../models/Footballer");
const createFootballer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, birthdate, image, role, clubs } = req.body;
    const footballer = new Footballer_1.Footballer({
        _id: new mongoose_1.default.Types.ObjectId(),
        firstname,
        lastname,
        birthdate,
        image,
        role,
        clubs,
    });
    try {
        const footballer_1 = yield footballer.save();
        return res.status(201).json({ footballer });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const getFootballers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const footballers = yield Footballer_1.Footballer.find();
        return res.status(201).json({ footballers });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const getMostCommonClubFootballer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const footballerId = req.params.footballerId;
    try {
        const currentFootballer = yield Footballer_1.Footballer.findById(footballerId);
        const mostInCommon = { player: {}, count: 0 };
        if (currentFootballer) {
            const footballers = yield Footballer_1.Footballer.find();
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
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const getFootballer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const footballerId = req.params.footballerId;
    try {
        const footballer = yield Footballer_1.Footballer.findById(footballerId);
        return footballer ? res.status(200).json({ footballer }) : res.status(404).json({ message: "not found" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateFootballer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const footballerId = req.params.footballerId;
    return Footballer_1.Footballer.findById(footballerId)
        .then((footballer) => {
        if (footballer) {
            footballer.set(req.body);
            return footballer
                .save()
                .then((footballer) => res.status(201).json({ footballer }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
});
const deleteFootballer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const footballerId = req.params.footballerId;
    return Footballer_1.Footballer.findByIdAndDelete(footballerId)
        .then((footballer) => (footballer ? res.status(201).json({ footballer, message: "Deleted" }) : res.status(404).json({ message: "not found" })))
        .catch((error) => res.status(500).json({ error }));
});
exports.FootballerController = { createFootballer, getFootballers, getFootballer, updateFootballer, deleteFootballer, getMostCommonClubFootballer };
