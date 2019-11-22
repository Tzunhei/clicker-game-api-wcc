const mongoose = require("mongoose");

const Character = mongoose.model("Character", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  imgSrc: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    default: 100
  },
  isBought: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: false
  }
});

module.exports = Character;

// le modèle permet de décrire les propriétés d'un character 