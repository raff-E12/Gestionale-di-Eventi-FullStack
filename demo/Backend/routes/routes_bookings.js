
const express = require("express");
const app = express();
const routes = express.Router();
const {  Booking_List, Add_Booking, Verify_Event } = require("../controllers/booking_controllers.js")
const { Request_message } = require("../middlewares/general_middlewares.js");

routes.post("/users", Request_message, Booking_List);
routes.post("/add", Request_message, Add_Booking);
routes.post("/verify", Request_message, Verify_Event);

module.exports = routes;