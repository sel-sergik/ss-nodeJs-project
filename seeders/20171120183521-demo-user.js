'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstname: 'Siarhei',
        lastname: 'Seliukou',
        email: 'Siarhei_Seliukou@sdgsg.com',
        password: '1234',
        isActive: true,
        accountId: '7gEmIJWpWWRvNyjHBPkzsjiQCXFDjY9n',
        token: 'TOKEN-56l1-4baf-b942-54p8d9cd0635'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};