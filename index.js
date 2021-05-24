const express = require("express"); // Importacion de express
require("dotenv").config();
const { dbConnection } = require("./src/database/config");

// Crear servidor de express
const app = express();
// Lectura y parseo del body
app.use(express.json());

// Conecatar al DB
dbConnection();

// Directorio publico
app.use(express.static("public"));

// Rutas
app.use("/api/auth", require("./src/routes/auth"));

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo el el puerto ${process.env.PORT}`);
});
