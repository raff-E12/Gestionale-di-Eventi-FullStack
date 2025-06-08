import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({path:"./assets/env/.env"});
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Rotte Principali e Middlware (404 - Prevents)
app.get("/", (req, res) =>{
    return res.status(200).send({msg: "Benvenuto nella Planify-Api", code: 200});
})

app.listen(port, () =>{return console.log(`>> Iniziazione del host locale http://localhost:${port}`)})