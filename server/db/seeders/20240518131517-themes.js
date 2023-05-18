const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        title: faker.commerce.department(),
      });
    }
    await queryInterface.bulkInsert('Themes', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Themes', null, {});
  },
};
