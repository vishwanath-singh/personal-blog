import { Dialect, Sequelize } from 'sequelize';
import connection from './config';

const { database, user, password, host, dialect, dbLogging } = connection;

export const sequelizeConnection = new Sequelize(database, user, password, {
	host,
	logging: dbLogging,
	dialect
});


export const assertDatabaseConnection = async (): Promise<void> => {
    try {
      await sequelizeConnection.authenticate();
      await sequelizeConnection.sync();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.log('Unable to connect to the database:', error);
      process.exit(1); // Exit the process with an error code
    }
  };

