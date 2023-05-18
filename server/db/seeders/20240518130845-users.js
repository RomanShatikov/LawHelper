const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        hashpass: faker.internet.password(),
        isAdmin: false,
      });
    }
    await queryInterface.bulkInsert('Users', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
