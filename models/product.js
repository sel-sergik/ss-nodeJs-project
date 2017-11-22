'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Product.hasMany(models.Review);
      }
    }
  });
  return Product;
};