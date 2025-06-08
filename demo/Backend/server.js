
// Configurazione server

const express = require("express");
require("dotenv").config();
const routes_users = require("./routes/routes_users.js");
const routes_events = require("./routes/routes_events.js");
const routes_booking = require("./routes/routes_booking.js");
const { routes_Prevents } = require("./middlewares/general_middlewares.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Generale
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Rotte Principali e Middlware (404 - Prevents)
app.get("/", (req, res) =>{
    return res.status(200).send({msg: "Benvenuto nella Calendar-API", code: 200});
})

app.use("/api/users", routes_users);
app.use("/api/event", routes_events);
app.use("/api/booking", routes_booking);
app.use(routes_Prevents);

app.listen(port, () =>{return console.log(`>> Iniziazione del host locale http://localhost:${port}`)})