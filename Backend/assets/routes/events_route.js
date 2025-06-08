import connection_database from "../../config.js";
import { Events_list } from "../controller/events_controllers.js";
import express from "express"

const users_routes = express.Router();

users_routes.get("/all", Events_list);

export default users_routes