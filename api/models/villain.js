const mongoose = require("mongoose");

const Villain = mongoose.model("Villain", {
  idLevel: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true // trim permet de supprimer les espaces au début et à la fin des chaines de caractère
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  damages: {
    type: Number,
    required: true
  },
  healthDivisor: {
    type: Number,
    required: true
  },
  coinAward: {
    type: Number,
    required: true
  },
  bgSrc: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = Villain;

//cf tableau de modélisation SQL (quête 4)