import {  Sequelize } from 'sequelize';
import  mongoose  from 'mongoose';
require('dotenv').config();


const { 
    SQL_DB_USER,
    SQL_DB_PASS, 
    SQL_DB_HOST, 
    SQL_DB_PORT, 
    SQL_DB_NAME, 
    NOSQL_DB_USER, 
    NOSQL_DB_PASS, 
    NOSQL_DB_HOST,
    NOSQL_DB_PORT,
    NOSQL_DB_NAME,

    } = process.env

// mongoose.connect(`mongodb://${ SQL_DB_NAME}:${SQL_DB_HOST}/${ SQL_DB_PORT}`)
 mongoose.connect(`mongodb://${NOSQL_DB_USER}:${NOSQL_DB_PASS}@${NOSQL_DB_HOST}:${NOSQL_DB_PORT}/${NOSQL_DB_NAME}?retryWrites=true&w=majority`);
const mongooseDb = mongoose.connection;

// const sequelizeDb = new Sequelize(`mysql://${SQL_DB_USER}:${SQL_DB_PASS}@${SQL_DB_HOST}:${SQL_DB_PORT}/${SQL_DB_NAME}`,{
//     dialect: 'mysql'
// });

const sequelizeDb =  new Sequelize(
    "database",
    'root',
    '',
    {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
      // Data is stored in the file `database.sqlite` in the folder `db`.
      // Note that if you leave your app public, this database file will be copied if
      // someone forks your app. So don't use it to store sensitive information.
    storage: "/sqlite/database.sqlite"
    }
);


export {
    sequelizeDb,
    mongooseDb
}