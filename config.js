require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  database: process.env.DATABASE,
  secretJwt: process.env.SECRET_JWT,
  secretMailer: process.env.SECRET_MAILER,
};
