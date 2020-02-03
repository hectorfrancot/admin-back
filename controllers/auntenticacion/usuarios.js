const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { constantesUsuarios } = require("../../config/constants");

const User = require("../../models/autenticacion/usuarios");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.pass, 10).then(hash => {
        const user = {
            email: req.body.email,
            nombre: req.body.nombre,
            password: hash
        };

        User.create(user)
            .then(result => {
                res.status(201).json({
                    message: constantesUsuarios.USUARIO_CREADO_MESSAGE,
                    result: result
                });
            })
            .catch(err => {
                next(err);
            });
    });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        if (!user) {
            throw new Error(constantesUsuarios.NO_PERMISOS_MESSAGE);
        }

        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {

        if (!result) {
            throw new Error(constantesUsuarios.USUARIO_INVALIDO);
        }

        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser.id },
            constantesUsuarios.SECRET_KEY, { expiresIn: "20000ms" }
        );

        res.status(200).json({
            payload:{
                token: token,
                expiresIn: 20000,
                userId: fetchedUser.id,
                userName: fetchedUser.email,
                name: fetchedUser.nombre
            },
            token: token,
            expiresIn: 20000,
            userId: fetchedUser.id,
            userName: fetchedUser.email,
            name: fetchedUser.nombre
        });
    }).catch(err => {
        next(err);
    });
}