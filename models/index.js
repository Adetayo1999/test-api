require("dotenv").config();
const Sequelize = require("sequelize");
const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
  DATABASE_HOST,
} = process.env;
const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection Made To The Database"))
  .catch((err) => console.error(err.message));

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("./users.model")(Sequelize, sequelize);

module.exports = db;
