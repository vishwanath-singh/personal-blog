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
exports.assertDatabaseConnection = exports.sequelizeConnection = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const { database, user, password, host, dialect, dbLogging } = config_1.default;
exports.sequelizeConnection = new sequelize_1.Sequelize(database, user, password, {
    host,
    logging: dbLogging,
    dialect
});
const assertDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelizeConnection.authenticate();
        yield exports.sequelizeConnection.sync();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.log('Unable to connect to the database:', error);
        //process.exit(1); // Exit the process with an error code
    }
});
exports.assertDatabaseConnection = assertDatabaseConnection;
