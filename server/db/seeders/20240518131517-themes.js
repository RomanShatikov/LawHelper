/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Themes', [
      {
        id: 1,
        title: 'Налоговое право',
      },
      {
        id: 2,
        title: 'Гражданское право',
      },
      {
        id: 3,
        title: 'Административное право',
      },
      {
        id: 4,
        title: 'Семейное право',
      },
      {
        id: 5,
        title: 'Трудовое право',
      },
    ]);
  },
};
