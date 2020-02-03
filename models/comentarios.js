const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');

const comentariosSchema = sequelize.define('comentarios', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  detalle: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  fecha_creacion: {
    type: Sequelize.DATE,
    allowNull: false, 
    defaultValue: Sequelize.NOW
  },
  fecha_modficacion: {
    type: Sequelize.DATE,
    allowNull: false,    
    defaultValue: Sequelize.NOW
  },
  usuario: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  estatus: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'estatus',
      key: 'id'
    }, 
    defaultValue: 1
  }
}, {
  freezeTableName: true,
  tableName: 'comentarios'
});


module.exports = comentariosSchema;
