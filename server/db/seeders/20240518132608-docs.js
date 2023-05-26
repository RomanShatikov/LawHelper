/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Documents',
      [
        {
          questionId: 1,
          urlDoc: 'https://www.nalog.gov.ru/html/sites/www.new.nalog.ru/docs/forms/3ndfl22.pdf',
          title: 'Заявление',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Documents', null, {});
  },
};
