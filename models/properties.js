'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Admins, {foreignKey: "admin_id"});
    }

    toJSON() {
      return {...this.get(),id:undefined}
    }
  }
  properties.init({
    prop_id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    admin_id: {
      type: DataTypes.UUID,
    } 
  }, {
    sequelize,
    tableName:'properties',
    modelName: 'properties',
  });
  return properties;
};