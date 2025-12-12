'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // no relation needed for simple system
    }
  }

  Role.init(
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      rolePermissions: {
        type: DataTypes.JSON, // Array of strings stored as JSON
        allowNull: false,
        defaultValue: []
      }
    },
    {
      sequelize,
      modelName: "Role"
    }
  );

  return Role;
};
