const { validationResult } = require("express-validator");

const checkValidFields = async (req, res, next) => {
  // manejo de errores
  const errors = validationResult();

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  checkValidFields,
};
