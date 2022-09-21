import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import { fooballersRouter } from "./routes/footballers";
var cors = require("cors");

const app = express();

mongoose
	.connect(config.mongo.url, { retryWrites: true, w: "majority" })
	.then(() => {
		console.log("database launched!");
        LaunchServer();
	})
	.catch((err) => {
		console.error(err);
	});

const LaunchServer = () => {
	/** Log the request */
	app.use((req, res, next) => {
		console.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		res.on("finish", () => {
			console.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
		});

		next();
	});

    app.use(cors());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use('/footballers', fooballersRouter);

    app.listen(config.server.port, () => {
		console.log(`Serveur listening on ${config.server.port}...`);
	});
}