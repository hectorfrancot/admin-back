const Sequelize = require('sequelize');


//Creamos una instancia de pool de conexiones con Sequelize.
const sequelize = new Sequelize(
    'db_testing_stuff',
    'root',
    '123456', {
    dialect: 'mysql',
    logging: true,
    host: 'localhost',
    port: 3306,
    define: {
        timestamps: false,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_spanish_ci'
        }
    },
    pool: {
        max: 100,
        min: 0,
        idle: 200000,
        acquire: 1000000,
    }
});

module.exports = sequelize;