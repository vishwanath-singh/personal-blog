// src/seeders/[timestamp]-add-default-user.ts
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'tom',
      lastName: 'harris',
      email: 'default@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('Users', { email: 'default@example.com' }, {});
  }
};
