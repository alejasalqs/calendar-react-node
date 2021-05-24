const { Schema, model } = require("mongoose");

// El Schema es el model de la informacion que se guarda en la BD

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// Se exporta para poder utilizarlo en otros archivos
module.exports = model("User", UserSchema);
