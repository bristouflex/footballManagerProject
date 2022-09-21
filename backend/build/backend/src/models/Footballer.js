"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footballer = void 0;
const FootballClubs_1 = require("./../../../frontend/src/enums/FootballClubs");
const FootballerRoles_1 = require("./../../../frontend/src/enums/FootballerRoles");
const mongoose_1 = __importStar(require("mongoose"));
const FootballerSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: FootballerRoles_1.FootballerRoles, required: true },
    clubs: { type: [String], enum: FootballClubs_1.FootballClubs, required: true }
}, {
    versionKey: false,
});
exports.Footballer = mongoose_1.default.model("Footballer", FootballerSchema);
