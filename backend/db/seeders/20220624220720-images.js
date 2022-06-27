'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        albumId: 1,
        imageUrl: '/images/NBA-Finals-1.jpg',
        content: 'Warriors holding up the trophy',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Images', null, {});
  }
};
