const jwt = require("jsonwebtoken");

// Esta funcion recibe lo que se quiere guardar en el payload del jwt
const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    // Asi se crear el payload del token
    const payload = { uid, name };

    // Se firma el token
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEDD,
      {
        expiresIn: "2h", // Expiran en
      },
      (err, token) => {
        // esto se ejecuta si falla
        if (err) {
          console.log(err);
          reject("No se pudo generar el jwt");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
