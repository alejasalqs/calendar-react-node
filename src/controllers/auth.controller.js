const express = require("express");

const createNewUser = async (req, res = express.response) => {
  const { name, email, password } = req.body; // Extrae la informacion que se envia en el body

  res.status(201).json({
    ok: true,
    msg: "registro",
  });
}; //mongodb+srv://asalguero:..perrito1@cluster0.ssgw8.gcp.mongodb.net

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "Login",
  });
};

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: "token",
  });
};

// Exportaciones del archivo
module.exports = {
  createNewUser,
  loginUser,
  renewToken,
};
