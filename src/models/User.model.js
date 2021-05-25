const { Schema, model } = require("mongoose");

// El Schema es el model de la informacion que se guarda en la BD

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Se exporta para poder utilizarlo en otros archivos
module.exports = model("User", UserSchema);
