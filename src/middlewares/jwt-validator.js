const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  // EL token esta en x-token en los headers
  const token = req.header("x-token");

  // revisamos que enserio envie el token
  if (!token) {
    return res.status(401).json({
      ok: false,
      error: `User is not authenticated, please send a valid JWT.`,
    });
  }
  try {
    // Es necesario usar trycatch porque si el token no es valido la funcion falla
    // primero obtenemos el payload
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEDD);

    // aqui se modifica el obj del request con la informacion nueva del token

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error: `User is not authenticated, please send a valid JWT.`,
    });
  }
};

module.exports = {
  checkJWT,
};
