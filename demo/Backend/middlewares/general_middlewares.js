// Middleware Generali

const database = require("../database/database.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

function Request_message(req, res, next) {
   try {
    const cookie_list = req.headers.cookie;
    // console.log(cookie_list);
    const key = process.env.JWT_SECRET;
    // Costruzione dello oggetto su del array fornito
    const cookies = cookie_list.split('; ').reduce((acc, cookies) => {
      const [key, value] = cookies.split('=');
      acc[key] = value; // suddivisione del oggetto ottenuto su chiave e valore in costruzione
      return acc;
    }, {});

    // console.log(cookies)

    const token = cookies.Authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token non fornito.', code: 401});
    }

    jwt.verify(token, key, (error) =>{
        if(error) return res.status(403).json({ msg: 'Token non valido.', code: 403});
    })

   } catch (error) {
    //  console.log(error.message);
     if (error.name !== "TypeError" && error.message !== "Cannot read properties of undefined (reading 'split')") {
      return res.status(404).json({msg: "Token inesistente", code: 404});
     }
   }

  next();
}

function routes_Prevents(req, res, next) {
   res.status(404).json({msg: "Link Inesistente, cambia rotta", code: 404});
   next();
}

module.exports = { Request_message, routes_Prevents }