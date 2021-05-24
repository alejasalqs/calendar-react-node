const mongoose = require("mongoose");

// Esta funcion se tiene que ejecutar desde el index.js
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar Base de Datos " + error);
  }
};

module.exports = {
  dbConnection,
};
