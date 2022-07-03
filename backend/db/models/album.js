'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, { foreignKey: 'userId' })
    Album.hasMany(models.Image, { foreignKey: 'albumId', onDelete:"cascade", hooks: true})
  };
  return Album;
};
