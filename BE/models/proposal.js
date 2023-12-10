const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Proposal = sequelize.define('Proposal', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  milestoneCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

// Define the Milestone model
const Milestone = sequelize.define('Milestone', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Define associations
Proposal.hasMany(Milestone);
Milestone.belongsTo(Proposal);

module.exports = { Proposal, Milestone };
