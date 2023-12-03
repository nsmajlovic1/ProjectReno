const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
});

// Function to create initial user data
/*const createInitialUsers = async () => {
  try {
    await User.sync({ force: true }); // This will drop the existing table and recreate it
    await User.bulkCreate([
      { 
        name: 'Nordin',
        email: 'nsmajlovic1@etf.unsa.ba',
        username: 'admin', 
        password: '$2b$10$pNWphhkvaKh5eZ2Obg30.Od7hStEH8HTghB1SZfmpdorcM6qiFF2O', 
        role: 'admin' 
    },
      { 
        name: 'Neko',
        email: 'nordinsmajlovic111@gmail.com',
        username: 'superadmin', 
        password: '$2b$10$gJaI/.a9MT6mU9LJ9NwyCOZ1f0qkxT7CXNAui9Pup0zR/bs1VL7vq', 
        role: 'superadmin' 
    },
    ]);
    console.log('Initial user data created');
  } catch (error) {
    console.error('Error creating initial user data:', error);
  }
};
*/
module.exports = { User, /*createInitialUsers*/ };