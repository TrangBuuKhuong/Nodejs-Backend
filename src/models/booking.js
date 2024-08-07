'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {// Definte relationship table
      // define association here
    }
  }
  Booking.init({
    statusId: DataTypes.STRING,      
    docterid: DataTypes.INTEGER,   
    patientId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    timeType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Booking;
};