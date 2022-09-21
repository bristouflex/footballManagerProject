"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fooballersRouter = void 0;
const express_1 = __importDefault(require("express"));
const FootballerController_1 = require("../controllers/FootballerController");
exports.fooballersRouter = express_1.default.Router();
exports.fooballersRouter.get("/", FootballerController_1.FootballerController.getFootballers);
exports.fooballersRouter.get("/mostClubs/:footballerId", FootballerController_1.FootballerController.getMostCommonClubFootballer);
exports.fooballersRouter.get("/:footballerId", FootballerController_1.FootballerController.getFootballer);
exports.fooballersRouter.post("/", FootballerController_1.FootballerController.createFootballer);
exports.fooballersRouter.put("/patch/:footballerId", FootballerController_1.FootballerController.updateFootballer);
exports.fooballersRouter.delete("/delete/:footballerId", FootballerController_1.FootballerController.deleteFootballer);
