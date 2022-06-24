'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkInsert('Images', [{
      imageUrl: '/images/NBA-Finals-1.jpg',
      userId: 1,
      albumId: 1,
      content: 'Warriors holding up the trophy',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
