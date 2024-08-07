// src/migrations/[timestamp]-enforce-userId-constraint-on-posts.ts
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('Blogs', 'userId', {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('Blogs', 'userId', {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    });
  }
};
