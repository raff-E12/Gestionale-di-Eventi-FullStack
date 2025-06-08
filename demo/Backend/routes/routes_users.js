
const express = require("express");
const app = express();
const routes = express.Router();
const {  Reg_Users, Access_Users, Cancel_Users, Statistic_Admins } = require("../controllers/users_controllers.js");
const { Request_message } = require("../middlewares/general_middlewares.js");

// Rotte di Gestione Account
routes.post("/login", Access_Users);
routes.post("/register", Reg_Users);
routes.delete("/cancel", Request_message, Cancel_Users);

// Gestione Statistiche
routes.post("/static", Request_message, Statistic_Admins)

module.exports = routes;