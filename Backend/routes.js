import express from "express"
import connection_database from "./config.js"
import events from "./assets/routes/events_route.js"

const routes = express.Router();

routes.use("/events", events);


export default routes