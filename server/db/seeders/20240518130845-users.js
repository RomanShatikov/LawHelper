const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashpass = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          hashpass,
          isAdmin: true,
          confirmed: true,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
