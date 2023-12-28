// Assuming you have Sequelize models for User and Proposal
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
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  milestoneCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalProposalValue: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', 
  },
  downPaymentPercentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  delayWithheldPercentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  warrantyWithheldPercentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  renoHomeownerCommissionPercentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  renoContractorCommissionPercentage: {
    type: DataTypes.FLOAT,
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
    defaultValue: 0,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
});


const Budget = sequelize.define('Budget', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

// Define associations
Proposal.hasMany(Milestone);
Milestone.belongsTo(Proposal);

Milestone.hasMany(Budget);
Budget.belongsTo(Milestone);

module.exports = { Proposal, Milestone, Budget };
