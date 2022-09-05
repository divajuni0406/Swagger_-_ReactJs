const express = require("express");
const Routes = express.Router();

const gameProccess = require("../controller/game");
const middleware = require("../controller/middleware");

Routes.get("/gamesuit", gameProccess.gameGet);
Routes.get("/gamesuit-player", gameProccess.gamePlayer);
Routes.get("/history", gameProccess.history);
Routes.get("/history/:id", middleware.authApiGeneral, gameProccess.getHistoryUser);
Routes.post("/save", middleware.authApiGeneral, gameProccess.saveScore);

module.exports = Routes;
