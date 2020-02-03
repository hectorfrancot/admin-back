const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");

const UsersRoutes = require("./routes/autenticacion/usuarios");
const ComentariosRoutes = require("./routes/comentarios");
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use("/archivos", express.static(path.join("archivos")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/auth", UsersRoutes);
app.use("/api/comentarios", ComentariosRoutes);

app.use(errorHandler);


module.exports = app;