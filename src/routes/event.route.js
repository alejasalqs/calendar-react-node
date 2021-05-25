/*
    Rutas de Eventos / events
    host + /api/events
*/

const express = require("express");
const { check } = require("express-validator");
const {
  getAllEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events.controller");
const { isDate } = require("../helpers/isDate.helper");
const router = express.Router();
const { checkValidFields } = require("../middlewares/field-validator");
const { checkJWT } = require("../middlewares/jwt-validator");

// Todas las rutas tienen que pasar por esta validacion
// Cualquier peticion que se encuetre por debajo de esta linea debe de ser validada con el token
router.use(checkJWT);

router.get("/", getAllEvents);

router.post(
  "/",
  [
    check("title", "Title field is required").not().isEmpty(),
    //check("start", "Start field must be a valid date").custom(isDate),
    //check("end", "End field must be a valid date").isDate(),
    checkValidFields,
  ],
  createNewEvent
);

router.put(
  "/:id",
  [
    check("title", "Title field is required").not().isEmpty(),
    //check("start", "Start field must be a valid date").custom(isDate),
    //check("end", "End field must be a valid date").isDate(),
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
