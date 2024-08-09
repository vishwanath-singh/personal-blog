// src/migrations/[timestamp]-assign-userId-to-existing-posts.ts
import { QueryInterface, Op } from 'sequelize';


export default {
  up: async (queryInterface: QueryInterface) => {
    const [defaultUser]: [any[], unknown] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'default@example.com';`
    );

    if (defaultUser && defaultUser.length > 0) {
      await queryInterface.bulkUpdate('Blogs', 
        { userId: defaultUser[0].id },
        { userId: null }
      );
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkUpdate('Blogs', 
      { userId: null },
      { userId: { [Op.ne]: null } }
    );
  }
};
