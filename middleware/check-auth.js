const jwt = require("jsonwebtoken");
const { constantesUsuarios } = require("../config/constants");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, constantesUsuarios.SECRET_KEY);
        req.userData = { userId: decodedToken.userId, name: decodedToken.email };
        console.log(req.userData)
        next();
    } catch (error) {
        res.status(401).json({ message: "Usted no esta autenticado en el sistema." });
    }
};