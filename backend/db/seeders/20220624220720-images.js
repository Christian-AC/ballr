'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        albumId: 1,
        imageUrl: 'https://nypost.com/wp-content/uploads/sites/2/2022/06/1403377703.jpg?quality=75&strip=all',
        content: 'Warriors holding up the trophy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        albumId: 1,
        imageUrl: 'https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy,pg_1/utgfcacoxl6hwd2bj2ay/10-most-influential-nba-players-2022-original-nonw?fimg-ssr-default',
        content: 'Top 5 most infulential players in the NBA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Images', null, {});
  }
};
