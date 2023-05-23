const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        questionId: Math.floor(Math.random() * 20) + 1,
        urlDoc: faker.image.url(),
        title: faker.lorem.lines({ min: 1, max: 1 }),
      });
    }
    await queryInterface.bulkInsert('Documents', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Documents', null, {});
  },
};
