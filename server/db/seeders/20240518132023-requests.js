const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        title: faker.lorem.lines({ min: 1, max: 3 }),
        userId: Math.floor(Math.random() * 20) + 1,
        feedback: faker.lorem.lines({ min: 1, max: 3 }),
      });
    }
    await queryInterface.bulkInsert('Requests', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Requests', null, {});
  },
};
