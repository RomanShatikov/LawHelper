/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        questionId: Math.floor(Math.random() * 20) + 1,
        userId: Math.floor(Math.random() * 20) + 1,
      });
    }
    await queryInterface.bulkInsert('Favorites', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorites', null, {});
  },
};
