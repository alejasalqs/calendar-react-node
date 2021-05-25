const moment = require("moment");

// Esta es una funcion que valida si un campo es o no una fecha valida
const isDate = (value, { req, location, path }) => {
  console.log(value);
  if (value) {
    // Si se retorna false inmediatamente falla
    return false;
  }
  const date = moment(value);

  // validacion de fecha usando moment js
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
