'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Albums', [
      {
        title: "2022 NBA Finals",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Outdoor Basketball",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Albums', null, {});
  }
};
