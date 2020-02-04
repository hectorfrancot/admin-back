const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { constantesUsuarios } = require("../../config/constants");

const User = require("../../models/autenticacion/usuarios");


const randtoken = require('rand-token');
const refreshTokens = {};

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = {
            email: req.body.email,
            nombre: req.body.fullName,
            password: hash
        };

        User.create(user)
            .then(result => {
                res.status(201).json({
                    data: {
                        token: generateToken(result)
                    }
                });
            })
            .catch(err => {
                next(err);
            });
    });
};

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
        res.status(200).json({
            data: {
                token: generateToken(fetchedUser)
            }
        });
    }).catch(err => {
        next(err);
    });
};

exports.refreshToken = (req, res, next) => {
    const username = req.body.payload.email;
    const refreshToken = req.body.payload.refreshToken;

    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {

        User.findOne({
            where: { email: username }
        }).then(user => {
            if (!user) {
                throw new Error(constantesUsuarios.NO_PERMISOS_MESSAGE);
            }
            res.status(200).json({
                data: {
                    token: generateToken(user)
                }
            });
        }).catch(err => {
            next(err);
        });
    }
    else {
        res.status(401).json({ message: constantesUsuarios.USUARIO_INVALIDO });
    }
};

exports.logout = (req, res, next) => {
    res.status(200).json({
        data: {
            message: "loged out"
        }
    });
};

generateToken = (user) => {
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = user.email;

    return jwt.sign({
        email: user.email,
        userId: user.id,
        name: user.nombre,
        refreshToken: refreshToken, 
        role: 'moderator'
    },
        constantesUsuarios.SECRET_KEY, { expiresIn: constantesUsuarios.TIEMPO_EXPIRACION_TOKEN }
    );
};

