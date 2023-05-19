const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        title: faker.lorem.lines({ min: 1, max: 2 }),
        answer: faker.lorem.lines({ min: 1, max: 2 }),
        themeId: Math.floor(Math.random() * 20) + 1,
        views: Math.floor(Math.random() * 10000) + 1,
      });
    }
    await queryInterface.bulkInsert('Questions', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
