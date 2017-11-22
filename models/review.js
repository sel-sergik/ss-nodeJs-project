'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    description: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Review.belongsTo(models.Product);
      }
    }
  });
  return Review;
};