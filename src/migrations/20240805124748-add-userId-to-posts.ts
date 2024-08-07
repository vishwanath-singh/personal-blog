// src/migrations/[timestamp]-add-userId-to-posts.ts
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('Blogs', 'userId', {
      type: DataTypes.INTEGER,
      allowNull: true, // Initially nullable
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Blogs', 'userId');
  },
};
