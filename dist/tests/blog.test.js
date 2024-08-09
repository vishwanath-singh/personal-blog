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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const database_1 = require("../src/database");
const blog_1 = __importDefault(require("../src/models/blog"));
const user_1 = __importDefault(require("../src/models/user"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelizeConnection.sync({ force: true });
    yield user_1.default.create({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
    });
    yield blog_1.default.create({
        title: 'First Post',
        content: 'This is the content of the first post',
        userId: 1,
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelizeConnection.close();
}));
describe('blog api', () => {
    it('should return a list of blogs with user details', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/blog/');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('title', 'First Post');
        expect(response.body[0].user).toHaveProperty('firstName', 'John');
    }));
});
