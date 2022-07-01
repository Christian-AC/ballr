'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Albums', [
      {
        title: "2022 NBA Finals",
        userId: 1,
        imageUrl: 'https://nypost.com/wp-content/uploads/sites/2/2022/06/1403377703.jpg?quality=75&strip=all',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Outdoor Basketball",
        userId: 2,
        imageUrl: 'https://www.sportcourtnortherncalifornia.com/wp-content/uploads/slider-basket-ball-court-putting-green.jpg',
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
