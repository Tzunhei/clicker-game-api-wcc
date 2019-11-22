const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const charactersRoutes = require("./api/routes/store/characters");
const skinsRoutes = require("./api/routes/store/skins");
const villainsRoutes = require("./api/routes/villains");

mongoose.connect(process.env.MONGODB_URL, { // se connecter à mongoDB 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: false })); //bodyParser pour que le serveur utilise les infos envoyées par le client
app.use(bodyParser.json()); // .json() pour convertir les données en json 

// CORS pour permettre l'accès à tout le monde / définir les droits d'accès au serveur
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Accept-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// fin CORS

app.use("/store/characters", charactersRoutes); // Routes dans le jeu 
app.use("/store/skins", skinsRoutes);
app.use("/villains", villainsRoutes);

// traitement des erreur pour avoir une page 404 personnalisée (page qui n'existe pas)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => { // pareil pour erreur 500 (problème de serveur)
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app; // on exporte 
