
const Comentario = require("../models/comentarios");

exports.crear = async (req, res, next) => {
    try {
        const comentarioCreado = await Comentario.create({
            titulo: req.body.titulo,
            detalle: req.body.detalle,
            usuario: req.body.usuario
        });
        res.status(201).json({ message: 'creado con exito', data: comentarioCreado });
    } catch (error) {
        res.status(500).json({ message: 'No se logro crear el comentario', data: error });
    }
};

exports.obtener = async (req, res, next) => {
    try {
        const comentarios = await Comentario.findAll();
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ message: 'No se lograron obtener los comentarios', data: error });
    }
};

exports.actualizar = async (req, res, next) => {
    try {

        const comentarioPorActualizar = await Comentario.findByPk(req.body.id);
        if (comentarioPorActualizar) {

            const comentarioActualizado = await Comentario.update({
                titulo: req.body.titulo,
                detalle: req.body.detalle,
                usuario: req.body.usuario
            }, {
                where: {
                    usuario: req.body.usuario,
                    id: req.body.id
                }
            });
            res.status(200).json({ message: 'actualizado  con exito', data: comentarioActualizado });
        } else {
            res.status(200).json({ message: 'el comentario no existe por favor cree uno ' });
        }
    } catch (error) {
        res.status(500).json({ message: 'No se logro actualizar el comentario', data: error });

    }
};

exports.eliminar = async (req, res, next) => {
    try {
        const comentarioPorEliminar = await Comentario.findByPk(req.params.id);
        if (comentarioPorEliminar) {
            const comentarioEliminado = await comentarioPorEliminar.destroy();
            res.status(200).json({ message: 'eliminado  con exito', data: comentarioEliminado });

        } else {
            res.status(200).json({ message: 'el comentario no existe por favor cree uno ' });
        }
    } catch (error) {
        res.status(500).json({ message: 'No se logro eliminar el comentario', data: error });
    }
};