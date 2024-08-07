"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/migrations/[timestamp]-assign-userId-to-existing-posts.ts
const sequelize_1 = require("sequelize");
exports.default = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const [defaultUser] = yield queryInterface.sequelize.query(`SELECT id FROM "Users" WHERE email = 'default@example.com';`);
        if (defaultUser && defaultUser.length > 0) {
            yield queryInterface.bulkUpdate('Blogs', { userId: defaultUser[0].id }, { userId: null });
        }
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkUpdate('Posts', { userId: null }, { userId: { [sequelize_1.Op.ne]: null } });
    })
};
