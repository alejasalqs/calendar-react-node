const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User.model");
const { generateJWT } = require("../helpers/jwt.helper");

const createNewUser = async (req, res = express.response) => {
  try {
    const { email, password } = req.body; // Extrae la informacion que se envia en el body

    // Es una promesa que nos devuelve un usuario en base al filtro de busqueda
    let findUser = await UserModel.findOne({ email });

    if (findUser) {
      // Valida que no exista el usuario con el correo ingresado
      return res.status(400).json({
        ok: false,
        error: `Already exists an user with the email: ${email}.`,
      });
    }

    const user = new UserModel(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync(); // Por defecta da 10 vueltas
    user.password = bcrypt.hashSync(password, salt);

    // Guarda el usuario
    // regresa el documento guardado o un error
    await user.save();

    // Generar web token
    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: "registro",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Es una promesa que nos devuelve un usuario en base al filtro de busqueda
    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      // Valida que no exista el usuario con el correo ingresado
      return res.status(400).json({
        ok: false,
        error: `There is no user with the email: ${email}.`,
      });
    }

    // Hacer match de los passwords
    // Esta funcion devuelve true o false
    const validPassword = bcrypt.compareSync(password, findUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        error: `Invalid password.`,
      });
    }

    // Generar web token
    const token = await generateJWT(findUser.id, findUser.name);

    res.json({
      ok: true,
      user: findUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: "registro",
    });
  }
};

const renewToken = async (req, res) => {
  // Comom ya paso por el middleware de verificar el token aqui ya tenemos la info del usuario

  // Generar web token
  const token = await generateJWT(req.user.uid, req.user.name);
  res.json({
    ok: true,
    token,
    uid: req.user.uid,
    name: req.user.name,
  });
};

// Exportaciones del archivo
module.exports = {
  createNewUser,
  loginUser,
  renewToken,
};
