'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.properties, {foreignKey: "admin_id"});
    }
  }
  Admins.init({
    uuid: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    contact: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'admins',
    modelName: 'Admins',
  });
  return Admins;
};