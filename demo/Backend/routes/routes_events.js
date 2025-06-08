
const express = require("express");
const app = express();
const routes = express.Router();
const { Event_List, Add_Events, Event_ID, Delete_Event, Drag_DropMod, Update_Events } = require("../controllers/event_controllers.js");
const { Request_message } = require("../middlewares/general_middlewares.js");

routes.get("/all", Event_List);
routes.post("/users", Request_message, Event_ID);
routes.post("/add", Request_message, Add_Events);
routes.delete("/delete/:id", Request_message, Delete_Event);
routes.patch("/update/:idEvent", Request_message, Drag_DropMod);
routes.patch("/update", Request_message, Update_Events)

module.exports = routes;