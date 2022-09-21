import express, {Request, Response} from "express";
import { FootballerController } from "../controllers/FootballerController";

export const fooballersRouter = express.Router();

fooballersRouter.get("/", FootballerController.getFootballers);

fooballersRouter.get("/mostClubs/:footballerId", FootballerController.getMostCommonClubFootballer);

fooballersRouter.get("/:footballerId", FootballerController.getFootballer);

fooballersRouter.post("/", FootballerController.createFootballer);

fooballersRouter.put("/patch/:footballerId", FootballerController.updateFootballer);

fooballersRouter.delete("/delete/:footballerId", FootballerController.deleteFootballer);


