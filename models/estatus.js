const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');

const estatusSchema = sequelize.define('estatus', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  descripcion: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  valor: {
    type: Sequelize.INTEGER(1),
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'estatus'
});

module.exports = estatusSchema;