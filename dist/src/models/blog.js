"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const user_1 = __importDefault(require("./user"));
class Blog extends sequelize_1.Model {
}
Blog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING,
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.sequelizeConnection,
    tableName: 'Blogs'
});
Blog.belongsTo(user_1.default, { foreignKey: 'userId' });
user_1.default.hasMany(Blog, { foreignKey: 'userId' });
exports.default = Blog;
