"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const footballers_1 = require("./routes/footballers");
var cors = require("cors");
const app = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
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
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use('/footballers', footballers_1.fooballersRouter);
    app.listen(config_1.config.server.port, () => {
        console.log(`Serveur listening on ${config_1.config.server.port}...`);
    });
};
