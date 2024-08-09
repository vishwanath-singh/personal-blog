"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv_1.default.config({ path: envFile });
const getEnvVar = (key, defaultValue) => {
    const value = process.env[key];
    if (value === undefined) {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        else {
            throw new Error(`Environment variable ${key} is required but was not provided.`);
        }
    }
    return value;
};
const connection = {
    host: getEnvVar('DB_HOST'),
    port: Number(getEnvVar('DB_PORT')),
    user: getEnvVar('DB_USER'),
    password: getEnvVar('DB_PASSWORD'),
    database: getEnvVar('DB_NAME'),
    dbLogging: process.env.NODE_ENV === 'development' || process.env.LOG === 'true',
    dialect: 'postgres'
};
exports.default = connection;
