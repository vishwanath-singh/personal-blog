import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

type DbConnection = {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
	dbLogging: boolean;
    dialect: Dialect
};

const getEnvVar = (key: string, defaultValue?: string): string => {
	const value = process.env[key];
	if (value === undefined) {
		if (defaultValue !== undefined) {
			return defaultValue;
		} else {
			throw new Error(`Environment variable ${key} is required but was not provided.`);
		}
	}
	return value;
};

const connection: DbConnection = {
	host: getEnvVar('DB_HOST'),
	port: Number(getEnvVar('DB_PORT')),
	user: getEnvVar('DB_USER'),
	password: getEnvVar('DB_PASSWORD'),
	database: getEnvVar('DB_NAME'),
	dbLogging: process.env.NODE_ENV === 'development' || process.env.LOG === 'true',
    dialect: 'postgres'
};

export default connection;