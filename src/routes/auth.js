/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  createNewUser,
  loginUser,
  renewToken,
} = require("../controllers/auth.controller"); // Controller con la logica
const { checkValidFields } = require("../middlewares/field-validator");

// Los middleware se mandan como una colección de segundo argumento
router.post(
  "/new",
  [
    // middlewares
    check("name", "Name is a required field").not().isEmpty(),
    check("email", "Must be a valid email").isEmail(),
    check("password", "Password field must be more than 5 characters").isLength(
      {
        min: 5,
      }
    ),
    checkValidFields,
  ],
  createNewUser
);

router.post(
  "/",
  [
    check(
      "email",
      "Email field is required and should be a valid email"
    ).isEmail(),
    check("password", "Password field must be more than 5 characters").isLength(
      { min: 5 }
    ),
    checkValidFields,
  ],
  loginUser
);

router.get("/renew", renewToken);

module.exports = router;
