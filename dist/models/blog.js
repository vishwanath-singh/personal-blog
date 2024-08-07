"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
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
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.sequelizeConnection,
    tableName: 'Blogs'
});
exports.default = Blog;
