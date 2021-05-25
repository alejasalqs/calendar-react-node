const { Schema, model } = require("mongoose");

// El Schema es el model de la informacion que se guarda en la BD

const EventsSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// reescribir como se devuelven las propiedades en el modelo
EventsSchema.method("toJSON", function () {
  // Aqui se tiene acceso a cada una de las propiedades
  const { _v, _id, ...object } = this.toObject();
  // renombramos la propiedad y eliminamos _v
  object.id = _id;
  return object;
});

module.exports = model("Events", EventsSchema);
