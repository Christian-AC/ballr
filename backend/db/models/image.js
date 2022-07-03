'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.STRING,
    albumId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.User, {foreignKey: 'userId'})
    Image.belongsTo(models.Album, {foreignKey: 'albumId', hooks:true})
  };
  return Image;
};
