const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('freedb_Amininabaza', 'freedb_amina_kurtovic', 'y#3$?9S4b!JJEUP', {
  host: 'sql.freedb.tech',
  dialect: 'mysql',
});

module.exports = sequelize;