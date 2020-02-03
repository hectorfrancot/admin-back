const Sequelize = require('sequelize');
const sequelize = require('../../config/database/database');

const userSchema = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(50),
        required: true,
        unique: true
    },
    nombre: {
        type: Sequelize.STRING(50),
        required: true
    },
    password: {
        type: Sequelize.STRING(500),
        required: true
    }
}, {
    freezeTableName: true,
    tableName: 'usuarios',
});

module.exports = userSchema;