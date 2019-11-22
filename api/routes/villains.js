const express = require("express");
const router = express.Router();

const Villain = require("../models/villain");

router.get("/", async (req, res) => {
  try {
    const villains = await Villain.find(); // on récupère tous les villains avec .find()
    res.status(201).send(villains); // si on a trouvé les villains on envoie les données des villains vers le jeu 
  } catch (error) {
    res.status(500).send(error); // on renvoie une erreur dans le cas contraire
  }
});

router.get("/:id", async (req, res) => { // même chose pour un seul villain grâce à son id
  try {
    const villain = await Villain.findById(req.params.id);
    if (!villain) {
      res.status(404).send();
    }
    res.status(201).send(villain);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => { // post permet de créer/définir un nouveau villain et de l'envoyer sur le serveur
  const villain = new Villain(req.body); //req.body pour récupérer les données du villain qu'on a écrit
  try {
    await villain.save(); // .save() sauvegarde le villain dans la base de données
    res.status(201).send(villain);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => { // .patch pour mettre à jours un villain déjà existant
  const updates = Object.keys(req.body);
  const allowedUpdates = [ //définir quelles propriétés peuvent être mises à jour
    "idLevel",
    "name",
    "image",
    "damages",
    "healthDivisor",
    "coinAward",
    "bgSrc"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(404).send({
      error: "Invalid updates!"
    });
  }
  try {
    const villain = await Villain.findByIdAndUpdate(req.params.id, req.body, { // met à jour par l'id du villain
      new: true,
      runValidators: true
    });
    if (!villain) {
      res.status(404).send();
    }
    res.status(201).send(villain);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/:id", async (req, res) => { // supprimer un villain 
  try {
    const villain = await Villain.findByIdAndDelete(req.params.id);
    console.log(villain);
    if (!villain) {
      res.status(404).send();
    }
    res.send(villain);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
