'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, { foreignKey: 'userId' })
    Album.hasMany(models.Images, { foreignKey: 'albumId' })
  };
  return Album;
};
