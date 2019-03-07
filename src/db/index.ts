import { Sequelize } from 'sequelize-typescript';
import { Congregation } from './models';
export { Congregation } from './models';

// ensure that sequelize get's loaded
require('sequelize');

export const DEFAULT_LIMIT = 50;

export const sequelize = new Sequelize({
   operatorsAliases: false,
   dialect: process.env.DB_DIALECT,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   /* eslint-disable-next-line no-empty-function */
   logging: () => {},

   dialectOptions: {
      decimalNumbers: true,
   },

   define: {
      timestamps: false,
      paranoid: false,
   },
});

sequelize.addModels([ Congregation ]);
